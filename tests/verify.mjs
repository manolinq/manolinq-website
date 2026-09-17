import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_PATH || 'playwright');
const base=process.env.PREVIEW_URL || 'http://127.0.0.1:4174';
const report={viewports:[],routes:[],form:[],backend:[],errors:[],screenshots:[]};
const routes=['/','/work','/pricing','/process','/contact','/privacy'];
const widths=[320,360,375,390,430,768,820,1024,1440];
const protectedHashes=JSON.parse(await readFile('review/protected-hashes.json','utf8'));
for(const [file,hash] of Object.entries(protectedHashes)) assert.equal(createHash('sha256').update(await readFile(file)).digest('hex'),hash,`Protected ${file}`);
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'chrome'});
const context=await browser.newContext({deviceScaleFactor:1});
// No production POST can ever leave this browser context.
await context.route('**/.netlify/functions/**',r=>r.fulfill({status:503,contentType:'application/json',body:'{"error":"Tests must mock the endpoint"}'}));
const page=await context.newPage();
page.on('pageerror',e=>report.errors.push(e.message));
const consoleErrors=[];
page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
async function settleImages(){
 await page.evaluate(async()=>{
   document.querySelectorAll('img[loading="lazy"]').forEach(img=>img.loading='eager');
   await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));
   await document.fonts.ready;
 });
}
try {
for(const route of routes){
 await page.setViewportSize({width:1440,height:1000});
 const response=await page.goto(base+route,{waitUntil:'networkidle'});
 assert.equal(response.status(),200,route);
 await settleImages();
 assert.equal(await page.locator('h1').count(),1,route+' h1');
 assert.equal(await page.locator('html').getAttribute('lang'),'nl-BE');
 assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://manolinq.com'+route);
 assert.ok((await page.locator('meta[name=description]').getAttribute('content')).length>50);
 assert.ok((await page.locator('meta[property="og:image"]').getAttribute('content')).endsWith('/brand/social-preview.png'));
 const images=await page.locator('img').evaluateAll(imgs=>imgs.map(img=>({src:img.getAttribute('src'),ok:img.complete&&img.naturalWidth>0,alt:img.hasAttribute('alt')})));
 assert.ok(images.every(i=>i.ok&&i.alt),JSON.stringify(images));
 const links=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
 for(const href of new Set(links.filter(h=>h.startsWith('/')||h.startsWith('#')))){
   const url=new URL(href,base+route);
   const res=await context.request.get(url.href);
   assert.equal(res.status(),200,`${route}: ${href}`);
   if(url.hash){const body=await res.text();assert.ok(body.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`Missing fragment ${href}`);}
 }
 report.routes.push({route,status:200,seo:true,images:true,links:true});
 for(const width of widths){
  await page.setViewportSize({width,height:900});
  const layout=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth,overflow:[...document.querySelectorAll('h1,h2,h3,.button,input,select,textarea,img,.browser')].filter(el=>{const r=el.getBoundingClientRect();return r.width&& (r.right>innerWidth+1||r.left< -1);}).map(el=>el.tagName+'.'+el.className)}));
  assert.ok(layout.document<=width&&layout.body<=width&&layout.overflow.length===0,`${route}@${width}: ${JSON.stringify(layout)}`);
  report.viewports.push({route,width,overflow:false});
 }
 const name=route==='/'?'home':route.slice(1);
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:width===1440?1000:844});
  await settleImages();
  const file=`review/${name}-${width===1440?'desktop':'mobile'}.png`;
  await page.screenshot({path:file,fullPage:true});report.screenshots.push(file);
  if(route==='/')await page.screenshot({path:`review/home-${width}-viewport.png`});
 }
}
// Unknown routes return a real 404, never a successful homepage fallback.
for(const route of ['/does-not-exist','/services','/services/websites','/about']) assert.equal((await context.request.get(base+route)).status(),404);
await page.goto(base+'/');await page.setViewportSize({width:320,height:800});
assert.equal(await page.locator('#mainNav').isVisible(),false);
await page.locator('#navToggle').click();assert.equal(await page.locator('#mainNav').isVisible(),true);
assert.equal(await page.locator('#navToggle').getAttribute('aria-expanded'),'true');
await page.keyboard.press('Escape');assert.equal(await page.locator('#mainNav').isVisible(),false);
assert.equal(await page.evaluate(()=>document.activeElement.id),'navToggle');
await page.locator('#navToggle').click();await page.locator('#mainNav a[href="/pricing"]').click();await page.waitForURL(base+'/pricing');
assert.equal(await page.locator('#mainNav').isVisible(),false);
report.mobileNavigation=true;
await page.emulateMedia({reducedMotion:'reduce'});
assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
report.reducedMotion=true;

await page.goto(base+'/contact?service=Website%20%2B%20AI%20System');
assert.equal(await page.locator('#serviceSelect').inputValue(),'Website + AI System');
assert.equal(await page.locator('#company_website').getAttribute('tabindex'),'-1');
const associations=await page.locator('input,select,textarea').evaluateAll(fields=>fields.every(field=>field.labels.length>0));
assert.ok(associations,'All fields have labels');
await page.locator('button[type=submit]').click();
assert.equal(await page.locator('#formStatus').getAttribute('data-state'),'error');
assert.equal(await page.evaluate(()=>document.activeElement.id),'name');
report.form.push('Dutch validation, labels, service preselection, honeypot, first invalid focus');
await page.locator('#name').fill('Lokale test');await page.locator('#business').fill('Testbedrijf');
await page.locator('#email').fill('local-test@example.invalid');await page.locator('#whatsapp').fill('+32 400 00 00 00');
await page.locator('#budget').selectOption('€750–€1,250');await page.locator('#message').fill('Alleen een onderschepte lokale test.');
let requests=[];let mode='failure';let release;
await page.route('**/.netlify/functions/submit-lead',async route=>{
 requests.push(route.request().postDataJSON());
 assert.equal(route.request().method(),'POST');
 assert.equal(route.request().headers()['content-type'],'application/json');
 if(mode==='pending')await new Promise(resolve=>{release=resolve;});
 if(mode==='network')return route.abort('failed');
 await route.fulfill({status:mode==='failure'?500:200,contentType:'application/json',body:mode==='failure'?' {"error":"Failed to save lead"}':mode==='malformed'?'not json':mode==='false'?' {"success":false}':'{"success":true}'});
});
await page.locator('button[type=submit]').click();
await page.waitForFunction(()=>document.querySelector('#formStatus').dataset.state==='error');
assert.equal(await page.locator('#name').inputValue(),'Lokale test');assert.equal(await page.locator('button[type=submit]').isEnabled(),true);
const payload=requests[0];
assert.deepEqual(Object.keys(payload).sort(),['name','business_name','email','whatsapp_number','service_needed','budget_range','message','source','page_url','user_agent','company_website','form_started_at'].sort());
assert.equal(payload.service_needed,'Website + AI System');assert.equal(payload.budget_range,'€750–€1,250');assert.equal(payload.source,'manolinq_website');assert.equal(payload.company_website,'');assert.ok(Number.isFinite(payload.form_started_at));
report.form.push('Original JSON contract, endpoint, method, values and metadata unchanged; 500 retains input');
for(mode of ['malformed','false','network']){
 await page.locator('button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('#formStatus').dataset.state==='error');assert.equal(await page.locator('#name').inputValue(),'Lokale test');
}
report.form.push('Malformed JSON, success:false and network failure never show success and retain input');
mode='pending';const before=requests.length;await page.locator('button[type=submit]').click();
await page.waitForFunction(()=>document.querySelector('#auditForm').getAttribute('aria-busy')==='true');
assert.equal(await page.locator('button[type=submit]').isDisabled(),true);
await page.locator('#auditForm').evaluate(f=>f.dispatchEvent(new Event('submit',{cancelable:true,bubbles:true})));
assert.equal(requests.length,before+1);assert.equal(await page.locator('#formStatus').getAttribute('data-state'),'loading');
mode='success';release();await page.waitForFunction(()=>document.querySelector('#formStatus').dataset.state==='success');
assert.equal(await page.locator('#name').inputValue(),'');assert.equal(await page.locator('button[type=submit]').isEnabled(),true);
report.form.push('Loading and busy state; duplicate prevention; reset only after confirmed success');
// Confirm original option VALUES directly from archived standalone HTML.
const JSZip=require(process.env.JSZIP_PATH||'jszip');
const zip=await JSZip.loadAsync(await readFile('review/Manolinq-original-2026-09-16.zip'));
const originalContact=await zip.file('contact.html').async('string');
const options=await page.evaluate(original=>{
 const doc=new DOMParser().parseFromString(original,'text/html');
 return ['service','budget'].map(name=>({name,original:[...doc.querySelector(`[name=${name}]`).options].map(o=>o.value),current:[...document.querySelector(`[name=${name}]`).options].map(o=>o.value)}));
},originalContact);
options.forEach(o=>assert.deepEqual(o.current,o.original,o.name));
report.form.push('All dropdown submitted values match original ZIP exactly');

// Execute the unchanged backend in a VM with fake Supabase/Telegram, never with network or production secrets.
const code=await readFile('netlify/functions/submit-lead.js','utf8');
const saved=[];const notifications=[];let dbFailure=false,tgFailure=false;
const sandbox={exports:{},process:{env:{SUPABASE_URL:'https://local.invalid',SUPABASE_SERVICE_ROLE_KEY:'fake-test-key',TELEGRAM_BOT_TOKEN:'fake-token',TELEGRAM_CHAT_ID:'fake-chat'}},console:{warn(){},error(){}},require(name){assert.equal(name,'@supabase/supabase-js');return {createClient(){return {from(table){assert.equal(table,'leads');return {async insert(lead){saved.push(lead);return {error:dbFailure?{message:'test'}:null};}};}};}};},async fetch(url,opts){notifications.push({url,body:JSON.parse(opts.body)});return {ok:!tgFailure,status:tgFailure?500:200,text:async()=>''};}};
vm.runInNewContext(code,sandbox,{filename:'unchanged-submit-lead.js'});
const valid={...payload,form_started_at:Date.now()-10000};
const invoke=(body=valid,origin='https://manolinq.com',method='POST')=>sandbox.exports.handler({httpMethod:method,headers:{origin},body:JSON.stringify(body)});
assert.equal((await invoke()).statusCode,200);assert.equal(saved.length,1);assert.equal(notifications.length,1);assert.equal(saved[0].status,'new');
report.backend.push('Successful Supabase insert precedes Telegram notification (mocks)');
for(const body of [{...valid,company_website:'spam'},{...valid,form_started_at:Date.now()},{...valid,message:'https://spam.invalid '.repeat(5)}])assert.equal((await invoke(body)).statusCode,200);
assert.equal(saved.length,1);assert.equal(notifications.length,1);report.backend.push('Honeypot, timing and link spam protections discard leads');
assert.equal((await invoke(valid,'https://other.invalid')).statusCode,403);
assert.equal((await invoke(valid,'https://manolinq.com','GET')).statusCode,405);
assert.equal((await invoke({...valid,name:''})).statusCode,400);
assert.equal((await invoke({...valid,email:'invalid'})).statusCode,400);
assert.equal((await invoke({...valid,message:'x'.repeat(21000)})).statusCode,413);
report.backend.push('Origin, method, required field, email and request-size validation');
dbFailure=true;assert.equal((await invoke()).statusCode,500);assert.equal(notifications.length,1);
dbFailure=false;tgFailure=true;assert.equal((await invoke()).statusCode,200);assert.equal(notifications.length,2);
report.backend.push('Database failure prevents success; Telegram failure retains existing success behavior');
assert.equal(report.errors.length,0,'Browser uncaught exceptions');
report.consoleErrors=consoleErrors;
report.note='Console errors from intentionally mocked HTTP/network failures and tested 404s are expected. No live leads sent.';
report.passed=true;
console.log(JSON.stringify({routes:report.routes.length,viewportChecks:report.viewports.length,formChecks:report.form.length,backendChecks:report.backend.length,uncaughtErrors:report.errors.length,passed:true},null,2));
}catch(error){report.passed=false;report.failure=error.stack;throw error;}
finally{await writeFile('review/test-results.json',JSON.stringify(report,null,2));await browser.close();}
