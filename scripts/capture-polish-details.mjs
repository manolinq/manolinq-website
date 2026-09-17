import {chromium} from 'playwright';
import {createRequire} from 'node:module';
const sharp=createRequire(import.meta.url)(process.env.SHARP_PATH||'sharp');
const browser=await chromium.launch({headless:true,channel:'chrome'});
const page=await browser.newPage({viewport:{width:320,height:900}});
try {
 for(const name of ['home','work','pricing','process','contact','privacy']){
  const widths=[320,360,390,430];
  await sharp({create:{width:1500,height:900,channels:3,background:'#fff'}}).composite(widths.map((width,i)=>({input:`review/polish-${name}-${width}.png`,left:[0,320,680,1070][i],top:0}))).png().toFile(`review/polish-sheet-${name}.png`);
 }
 await page.goto('http://127.0.0.1:4174/contact');
 await page.locator('.form-card').screenshot({path:'review/polish-form-320.png'});
 await page.locator('.site-footer').screenshot({path:'review/polish-footer-320.png'});
 await page.goto('http://127.0.0.1:4174/work');
 await page.locator('.project-card').nth(1).screenshot({path:'review/polish-project-320.png'});
}finally{await browser.close();}
