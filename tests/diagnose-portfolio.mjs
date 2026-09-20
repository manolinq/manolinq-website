import {chromium} from 'playwright';
import {readFile,writeFile} from 'node:fs/promises';
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4182';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const results=[];
const staleCss=await readFile('review/pre-polish/site.css','utf8');
const originalCss=await readFile('review/repair/baseline/site.css','utf8');
const originalPages={'/':await readFile('review/repair/baseline/index.html','utf8'),'/work':await readFile('review/repair/baseline/work.html','utf8')};
try{
 for(const scenario of ['supplied-build','missing-images','stale-css','stale-css-and-missing-images']){
  const context=await browser.newContext();
  await context.route('**/*',r=>{const path=new URL(r.request().url()).pathname;return originalPages[path]?r.fulfill({contentType:'text/html',body:originalPages[path]}):r.continue();});
  await context.route('**/styles/site.css',r=>r.fulfill({contentType:'text/css',body:scenario.includes('stale-css')?staleCss:originalCss}));
  if(scenario.includes('missing-images'))await context.route('**/images/portfolio/*.webp',r=>r.fulfill({status:404,contentType:'text/html',body:'Not found'}));
  const page=await context.newPage();
  for(const route of ['/','/work'])for(const width of [320,360,375,390,430,768,820,1024,1440,1920]){
   await page.setViewportSize({width,height:900});await page.goto(base+route);
   await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('.demo-screenshot img')].map(img=>{img.loading='eager';return img.decode().catch(()=>{});}));});
   const state=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,grid:getComputedStyle(document.querySelector('.project-grid')).gridTemplateColumns,elements:[...document.querySelectorAll('.project-grid,.project-card,.project-visual,.demo-screenshot,.demo-screenshot img')].map(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return {tag:el.tagName,class:el.className,width:r.width,left:r.left,right:r.right,minWidth:s.minWidth,maxWidth:s.maxWidth,overflowX:s.overflowX,naturalWidth:el.naturalWidth,complete:el.complete};})}));
   results.push({scenario,route,...state});
   if(route==='/work'&&width===390&&scenario!=='missing-images')await page.screenshot({path:`review/repair/before-${scenario}-390.png`,fullPage:true});
  }
  await context.close();
 }
}finally{await browser.close();await writeFile('review/repair/diagnosis.json',JSON.stringify(results,null,2));}
console.log(JSON.stringify(results.filter(r=>r.overflow).map(r=>({scenario:r.scenario,route:r.route,width:r.viewport,scrollWidth:r.scrollWidth,grid:r.grid})),null,2));
