import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {digest,verifyPortfolioOutput,portfolioImages,stylesheet} from '../scripts/portfolio-integrity.mjs';
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4182';
const kind=process.env.REPAIR_SERVER_KIND||'static';
await mkdir('review/repair',{recursive:true});
const report={base,kind,output:await verifyPortfolioOutput(),http:[],viewports:[],faultChecks:[],protected:[],networkFailures:[]};
const input=JSON.parse(await readFile('review/repair/input-audit.json','utf8'));
for(const file of ['index.html','work.html']){
 const html=(await readFile(file,'utf8')).replace(/href="\/styles\/site-[a-f0-9]+\.css"/,'href="/styles/site.css"');
 assert.equal(digest(html),input.hashes[file],file+': only the stylesheet URL may change');
}
for(const file of ['netlify.toml','public/_redirects','public/_headers','netlify/functions/submit-lead.js','supabase/migrations/20260529150024_create_leads_table.sql','public/scripts/contact.js','pricing.html','contact.html','process.html','privacy.html','404.html','public/brand/logo-primary.svg','public/brand/logo-light.svg','public/brand/logo-dark.svg','public/brand/icon.svg','public/brand/favicon.svg','public/images/manolito-original.jpg','public/images/manolito.webp','public/images/manolito-small.webp']){
 assert.equal(digest(await readFile(file)),input.hashes[file],file+' changed');report.protected.push(file);
}
const css=await stylesheet();
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});
const context=await browser.newContext({reducedMotion:'reduce'});
await context.route('**/*',r=>['GET','HEAD','OPTIONS'].includes(r.request().method())?r.continue():r.abort());
const page=await context.newPage();
page.on('requestfailed',r=>{if(/\/images\/portfolio\/|\/styles\//.test(r.url()))report.networkFailures.push({url:r.url(),failure:r.failure()});});
page.on('response',r=>{if(/\/images\/portfolio\/|\/styles\//.test(r.url())&&r.status()>=400)report.networkFailures.push({url:r.url(),status:r.status()});});
const widths=[320,360,375,390,430,768,820,1024,1440,1920];
const dimensions=()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyOverflow:getComputedStyle(document.body).overflowX,grid:getComputedStyle(document.querySelector('.project-grid')).gridTemplateColumns,offenders:[...document.querySelectorAll('.project-grid,.project-card,.project-visual,.demo-screenshot,.demo-screenshot img')].map(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return {tag:el.tagName,class:el.className,left:r.left,right:r.right,width:r.width,minWidth:s.minWidth,overflowX:s.overflowX};}).filter(r=>r.left< -1||r.right>innerWidth+1)});
try{
 for(const asset of [...report.output.assets,{url:css.url,sha256:css.sha256,bytes:css.data.length}]){
  const response=await page.request.get(base+asset.url);
  const data=await response.body(),mime=response.headers()['content-type']||'';
  assert.equal(response.status(),200,asset.url);assert.equal(data.length,asset.bytes);assert.equal(digest(data),asset.sha256);
  assert.ok(mime.includes(asset.url.endsWith('.css')?'text/css':'image/webp'),mime);
  const check={url:asset.url,status:response.status(),mime,bytes:data.length,hashMatches:true};
  if(asset.url.endsWith('.webp')){
   await page.setContent(`<img src="${base+asset.url}" alt="Verified local portfolio asset">`);
   Object.assign(check,await page.locator('img').evaluate(async img=>{await img.decode();return {complete:img.complete,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight};}));
   assert.equal(check.complete,true);assert.equal(check.naturalWidth,asset.width);assert.equal(check.naturalHeight,asset.height);
  }
  report.http.push(check);
 }
 for(const route of ['/','/work'])for(const width of widths){
  await page.setViewportSize({width,height:900});
  const response=await page.goto(base+route);assert.equal(response.status(),200);
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(img=>{img.loading='eager';return img.decode();}));});
  const state=await page.evaluate(dimensions);
  report.viewports.push({route,...state});
  assert.ok(state.scrollWidth<=width+1,JSON.stringify(state));assert.deepEqual(state.offenders,[]);
  assert.ok(!['hidden','clip'].includes(state.bodyOverflow),'Do not conceal page overflow');
  assert.equal(await page.locator(`link[rel="stylesheet"][href="${css.url}"]`).count(),1);
  for(const image of await page.locator('.demo-screenshot img').evaluateAll(images=>images.map(img=>{const r=img.getBoundingClientRect();return {complete:img.complete,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,width:r.width,height:r.height};}))){
   assert.equal(image.complete,true);assert.ok(image.naturalWidth>0);assert.ok(Math.abs(image.width/image.height-image.naturalWidth/image.naturalHeight)<0.01);
  }
  if((route==='/'&&[390,1440].includes(width))||(route==='/work'&&[320,390,1440].includes(width))){
   const name=route==='/'?'home':'work';await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
   await page.screenshot({path:`review/repair/${kind}-${name}-${width}-full.png`,fullPage:true});
   await page.setViewportSize({width,height:2200});
   await page.locator('.project-grid').locator('..').screenshot({path:`review/repair/${kind}-${name}-${width}-portfolio.png`});
  }
 }
 assert.deepEqual(report.networkFailures,[]);
 // Failed images must not force grid tracks to their HTML width attributes.
 // CSS integrity is enforced for every generated page by the build gate.
 const fault=await browser.newContext();
 await fault.route('**/images/portfolio/*.webp',r=>r.fulfill({status:404,contentType:'text/html',body:'Simulated unavailable image'}));
 const faultPage=await fault.newPage();
 for(const route of ['/','/work'])for(const width of widths){
  await faultPage.setViewportSize({width,height:900});await faultPage.goto(base+route);
  await faultPage.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('.demo-screenshot img')].map(img=>{img.loading='eager';return img.decode().catch(()=>{});}));});
  const state=await faultPage.evaluate(dimensions);report.faultChecks.push({route,...state});
  assert.ok(state.scrollWidth<=width+1,JSON.stringify(state));assert.deepEqual(state.offenders,[]);
 }
 await fault.close();
 assert.equal(portfolioImages.length,4);
 report.passed=true;
 console.log(JSON.stringify({kind,images:4,stylesheet:true,viewportChecks:report.viewports.length,faultChecks:report.faultChecks.length,protected:report.protected.length,passed:true}));
}finally{await browser.close();await writeFile(`review/repair/${kind}-results.json`,JSON.stringify(report,null,2));}
