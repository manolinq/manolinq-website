import {chromium} from 'playwright';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {projects} from '../scripts/portfolio-data.mjs';
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4174';
const report={viewports:[],liveLinks:[],assets:[],preserved:[],errors:[]};
const baseline=JSON.parse(await readFile('review/portfolio/baseline.json','utf8'));
for(const file of ['pricing.html','process.html','contact.html','privacy.html','404.html','public/scripts/contact.js','netlify.toml','public/_redirects','public/_headers','netlify/functions/submit-lead.js','package.json','package-lock.json']){
 assert.equal(createHash('sha256').update(await readFile(file)).digest('hex'),baseline.hashes[file],file+' must remain unchanged');
 report.preserved.push(file);
}
for(const file of ['index.html','work.html']){
 const current=await readFile(file,'utf8');
 assert.equal(current.match(/<head>[\s\S]*?<\/head>/)[0],baseline.markup[file].head,file+' metadata');
 if(file==='index.html')assert.equal(current.match(/<section class="hero">[\s\S]*?<\/section>/)[0],baseline.markup[file].hero,'Homepage hero unchanged');
 assert.equal(current,await readFile('site-dist/'+file,'utf8'),'Built page matches source');
}
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});
const context=await browser.newContext({reducedMotion:'reduce'});
await context.route('**/*',route=>['GET','HEAD','OPTIONS'].includes(route.request().method())?route.continue():route.abort());
const page=await context.newPage();
page.on('pageerror',error=>report.errors.push(error.message));
try{
 for(const route of ['/','/work']){
  for(const width of [320,390,430,768,1440]){
   await page.setViewportSize({width,height:900});
   await page.goto(base+route);
   await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('.demo-screenshot img')].map(img=>{img.loading='eager';return img.decode();}));});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' '+width+' overflow');
   assert.equal(await page.locator('.demo-card').count(),2);
   const cards=[];
   for(const project of projects){
    const card=page.locator('#'+project.id);
    assert.equal(await card.locator('h3').innerText(),project.title);
    assert.equal(await card.locator(':scope > p').innerText(),project.description);
    assert.equal(await card.locator('.concept-badge').innerText(),'Interactieve demo');
    assert.ok((await card.locator('.demo-meta').innerText()).includes('Websiteconcept'));
    assert.equal((await card.locator('.demo-button').innerText()).replace(/\s+/g,' ').trim(),'Bekijk live demo ↗');
    for(const selector of ['.demo-button','.demo-screenshot']){
     const link=card.locator(selector);
     assert.equal(await link.getAttribute('href'),project.url);
     assert.equal(await link.getAttribute('target'),'_blank');
     assert.equal(await link.getAttribute('rel'),'noopener noreferrer');
    }
    const metrics=await card.evaluate(el=>{
     const image=el.querySelector('img'),rect=image.getBoundingClientRect(),button=el.querySelector('.demo-button').getBoundingClientRect();
     const blocks=[...el.children].map(child=>child.getBoundingClientRect());
     return {naturalWidth:image.naturalWidth,naturalHeight:image.naturalHeight,width:rect.width,height:rect.height,buttonHeight:button.height,fontSize:getComputedStyle(el.querySelector(':scope > p')).fontSize,overlap:blocks.some((block,i)=>i>0&&block.top<blocks[i-1].bottom-1)};
    });
    assert.equal(metrics.naturalWidth,1440);assert.equal(metrics.naturalHeight,900);
    assert.ok(Math.abs(metrics.width/metrics.height-1.6)<0.01,'Screenshot must not distort');
    assert.ok(metrics.buttonHeight>=48);assert.ok(parseFloat(metrics.fontSize)>=15);assert.equal(metrics.overlap,false);
    cards.push({id:project.id,...metrics});
   }
   const name=route==='/'?'home':'work';
   // Fit the selected section while capturing: Chromium can mispaint off-screen
   // fixed layers when an element screenshot is taller than its viewport.
   await page.setViewportSize({width,height:2000});
   await page.locator('.project-grid').locator('..').screenshot({path:`review/portfolio/manolinq-${name}-portfolio-${width}.png`});
   await page.setViewportSize({width,height:900});
   if([390,1440].includes(width)){
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.screenshot({path:`review/portfolio/manolinq-${name}-${width}.png`,fullPage:true});
   }
   report.viewports.push({route,width,cards,overflow:false});
  }
  if(route==='/')assert.ok(await page.locator('a[href="/work"]').count()>0);
  // Exercise every card button and screenshot link from each page against the real URLs.
  // Start from a fresh navigation after the variable-height screenshot captures.
  await page.setViewportSize({width:1440,height:900});
  await page.goto(base+route);
  await page.evaluate(()=>document.fonts.ready);
  for(const project of projects){
   for(const selector of ['.demo-button','.demo-screenshot']){
    const [popup]=await Promise.all([context.waitForEvent('page'),page.locator('#'+project.id+' '+selector).click()]);
    await popup.waitForLoadState('domcontentloaded');
    assert.equal(popup.url(),project.url);
    await popup.locator('h1').first().waitFor({state:'visible'});
    assert.equal(await popup.evaluate(()=>window.opener),null);
    report.liveLinks.push({route,id:project.id,selector,url:popup.url(),opened:true,opener:null});
    await popup.close();
   }
  }
 }
 for(const project of projects){
  for(const image of [project.image,project.mobileImage]){
   const response=await page.request.get(base+image.src);
   assert.equal(response.status(),200);
   assert.ok(response.headers()['content-type'].includes('image/webp'));
   await page.setContent(`<img src="${base+image.src}" alt="Preview">`);
   const size=await page.locator('img').evaluate(async img=>{await img.decode();return {width:img.naturalWidth,height:img.naturalHeight};});
   assert.equal(size.width,image.width);assert.equal(size.height,image.height);
   report.assets.push({src:image.src,status:200,...size});
  }
 }
 assert.deepEqual(report.errors,[]);
 report.passed=true;
 console.log(JSON.stringify({viewportChecks:report.viewports.length,liveLinks:report.liveLinks.length,assets:report.assets.length,preservedFiles:report.preserved.length,passed:true}));
}finally{
 await writeFile('review/portfolio/test-results.json',JSON.stringify(report,null,2));
 await browser.close();
}
