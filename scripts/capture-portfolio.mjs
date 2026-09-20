import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {projects} from './portfolio-data.mjs';
const sharp=createRequire(import.meta.url)(process.env.SHARP_PATH||'sharp');
await mkdir('public/images/portfolio',{recursive:true});
await mkdir('review/portfolio',{recursive:true});
const report={capturedAt:new Date().toISOString(),captures:[],failures:[]};
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});
try {
 for(const project of projects){
  for(const [device,width,height] of [['desktop',1440,900],['mobile',390,844]]){
   const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:device==='mobile',hasTouch:device==='mobile'});
   // Read-only captures: never allow forms or other mutations to reach either demo.
   await context.route('**/*',route=>['GET','HEAD','OPTIONS'].includes(route.request().method())?route.continue():route.abort());
   const page=await context.newPage();
   try{
    const response=await page.goto(project.url,{waitUntil:'networkidle',timeout:60000});
    if(!response?.ok())throw new Error(`HTTP ${response?.status()}`);
    await page.locator('h1').first().waitFor({state:'visible'});
    await page.evaluate(async()=>{
     await document.fonts.ready;
     await Promise.all([...document.images].filter(img=>{const r=img.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;}).map(img=>img.decode()));
    });
    // Give entry transitions time to reach their real resting state without hiding UI.
    await page.waitForTimeout(1500);
    const png=await page.screenshot({fullPage:false});
    const asset=`public/images/portfolio/${project.id}-${device}.webp`;
    const info=await sharp(png).webp({quality:90,effort:6,smartSubsample:true}).toFile(asset);
    await writeFile(`review/portfolio/${project.id}-${device}.png`,png);
    const details=await page.evaluate(()=>({title:document.title,headings:[...document.querySelectorAll('h1')].map(el=>el.innerText),fonts:document.fonts.status,visibleImages:[...document.images].filter(img=>{const r=img.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;}).map(img=>({src:img.currentSrc,loaded:img.complete&&img.naturalWidth>0}))}));
    report.captures.push({id:project.id,device,requestedUrl:project.url,finalUrl:page.url(),status:response.status(),width,height,asset,bytes:info.size,...details});
    console.log(`${project.id} ${device}: HTTP ${response.status()}, ${info.width} × ${info.height}, ${info.size} bytes`);
   }catch(error){report.failures.push({id:project.id,device,error:error.message});console.error(error.message);}
   finally{await context.close();}
  }
 }
}finally{
 await browser.close();
 await writeFile('review/portfolio/capture-report.json',JSON.stringify(report,null,2));
}
if(report.failures.length)process.exitCode=1;
