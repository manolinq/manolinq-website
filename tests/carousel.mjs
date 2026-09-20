import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {projects} from '../scripts/portfolio-data.mjs';
import {digest,verifyPortfolioOutput} from '../scripts/portfolio-integrity.mjs';
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4192';
await mkdir('review/carousel',{recursive:true});
const report={output:await verifyPortfolioOutput(),assets:[],viewports:[],external:[],protected:[],errors:[]};
const original=JSON.parse(await readFile('review/repair/input-audit.json','utf8'));
for(const file of ['netlify.toml','public/_redirects','public/_headers','netlify/functions/submit-lead.js','supabase/migrations/20260529150024_create_leads_table.sql','public/scripts/contact.js','pricing.html','contact.html','process.html','privacy.html','404.html','public/brand/logo-primary.svg','public/brand/logo-light.svg','public/images/manolito-original.jpg']){
 assert.equal(digest(await readFile(file)),original.hashes[file],file);report.protected.push(file);
}
const old=await readFile('review/repair/baseline/index.html','utf8'),home=await readFile('index.html','utf8');
for(const pattern of [/<section class="hero">[\s\S]*?<\/section>/,/<section class="section founder">[\s\S]*?<\/section>/,/<header\b[\s\S]*?<\/header>/])assert.equal(home.match(pattern)[0],old.match(pattern)[0]);
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext({reducedMotion:'reduce'});
await context.route('**/*',r=>['GET','HEAD','OPTIONS'].includes(r.request().method())?r.continue():r.abort());
const page=await context.newPage();
page.on('pageerror',e=>report.errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
const check=async index=>{
 assert.equal(await page.locator('[data-carousel-slide]:visible').count(),1);
 assert.equal(await page.locator('[data-carousel-image]:visible').count(),1);
 const active=page.locator(`[data-carousel-slide="${index}"]`);
 assert.equal(await active.locator('h3').innerText(),projects[index].title);
 assert.equal(await page.locator(`[data-carousel-to="${index}"]`).getAttribute('aria-current'),'true');
 const image=page.locator(`[data-carousel-image="${index}"] img`);
 const data=await image.evaluate(async img=>{await img.decode();const r=img.getBoundingClientRect();return {complete:img.complete,naturalWidth:img.naturalWidth,width:r.width,height:r.height,right:r.right};});
 assert.ok(data.complete&&data.naturalWidth===1440);assert.ok(Math.abs(data.width/data.height-1.6)<0.01);
 assert.ok(data.width<=720);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 for(const link of [active.locator('.carousel-cta'),page.locator(`[data-carousel-image="${index}"]`)]){
  assert.equal(await link.getAttribute('href'),projects[index].url);assert.equal(await link.getAttribute('target'),'_blank');assert.equal(await link.getAttribute('rel'),'noopener noreferrer');
 }
 return data;
};
try{
 for(const asset of [...report.output.assets,{url:'/styles/site.css'},{url:'/scripts/portfolio-carousel.js'}]){
  const response=await page.request.get(base+asset.url);assert.equal(response.status(),200);const body=await response.body();
  assert.equal(digest(body),digest(await readFile('site-dist'+asset.url)));
  assert.ok(response.headers()['content-type'].includes(asset.url.endsWith('.webp')?'image/webp':asset.url.endsWith('.css')?'text/css':'javascript'));
  if(asset.url.endsWith('.webp')){await page.setContent(`<img src="${base+asset.url}">`);const dimensions=await page.locator('img').evaluate(async img=>{await img.decode();return [img.naturalWidth,img.naturalHeight];});assert.deepEqual(dimensions,[asset.width,asset.height]);}
  report.assets.push({url:asset.url,status:200,bytes:body.length});
 }
 for(const route of ['/','/work'])for(const width of [320,360,390,430,768,1024,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(base+route);await page.locator('[data-carousel][data-ready=true]').waitFor();await page.evaluate(()=>document.fonts.ready);
  const first=await check(0);
  await page.locator('[data-carousel-next]').click();await check(1);
  await page.locator('[data-carousel-next]').click();await check(0);
  await page.locator('[data-carousel-prev]').click();await check(1);
  await page.locator('[data-carousel-to="0"]').click();await check(0);
  await page.locator('[data-carousel-to="1"]').click();await check(1);
  await page.locator('[data-carousel-prev]').focus();await page.keyboard.press('ArrowRight');await check(0);
  assert.notEqual(await page.locator('[data-carousel-prev]').evaluate(el=>getComputedStyle(el).outlineStyle),'none');
  await page.keyboard.press('Enter');await check(1);await page.keyboard.press('ArrowLeft');await check(0);
  const overlap=await page.locator('[data-carousel]').evaluate(el=>{const nodes=['.carousel-media','.carousel-controls','.carousel-details'].map(s=>el.querySelector(s).getBoundingClientRect());return nodes.some((r,i)=>i&&r.top<nodes[i-1].bottom-1);});assert.equal(overlap,false);
  report.viewports.push({route,width,first,controls:true,overflow:false});
  if([320,390,1440].includes(width)){
   await page.setViewportSize({width,height:1600});await page.locator('[data-carousel]').screenshot({path:`review/carousel/${route==='/'?'home':'work'}-${width}.png`});
   await page.setViewportSize({width,height:1000});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`review/carousel/${route==='/'?'home':'work'}-${width}-full.png`,fullPage:true});
  }
 }
 assert.deepEqual(report.errors,[]);
 for(let i=0;i<projects.length;i++){
  await page.locator(`[data-carousel-to="${i}"]`).click();
  for(const selector of [`[data-carousel-slide="${i}"] .carousel-cta`,`[data-carousel-image="${i}"]`]){
   const [popup]=await Promise.all([context.waitForEvent('page'),page.locator(selector).click()]);await popup.waitForLoadState('domcontentloaded');await popup.locator('h1').first().waitFor();assert.equal(popup.url(),projects[i].url);assert.equal(await popup.evaluate(()=>window.opener),null);report.external.push({url:popup.url(),selector,passed:true});await popup.close();
  }
 }
 const noJS=await browser.newContext({javaScriptEnabled:false});const fallback=await noJS.newPage();await fallback.goto(base+'/work');assert.equal(await fallback.locator('[data-carousel-slide]:visible').count(),1);assert.equal(await fallback.locator('[data-carousel-controls]:visible').count(),0);assert.equal(await fallback.locator('noscript a').count(),2);await noJS.close();
 report.noJavaScriptFallback=true;report.passed=true;console.log(JSON.stringify({viewports:report.viewports.length,assets:report.assets.length,external:report.external.length,protected:report.protected.length,passed:true}));
}finally{await browser.close();await writeFile('review/carousel/test-results.json',JSON.stringify(report,null,2));}
