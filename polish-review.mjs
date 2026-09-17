import {chromium} from 'playwright';
import {writeFile,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4174';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});
const context=await browser.newContext();
const page=await context.newPage();
const report={mobile:[],privacyContrast:[],brand:[]};
const previous=JSON.parse(await readFile('review/pre-polish/mobile-metrics.json','utf8'));
const luminance=color=>{
 const parts=color.match(/[\d.]+/g).slice(0,3).map(Number).map(c=>c/255).map(c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4);
 return parts[0]*0.2126+parts[1]*0.7152+parts[2]*0.0722;
};
try {
 for(const route of ['/','/work','/pricing','/process','/contact','/privacy']){
  for(const width of [320,360,390,430]){
   await page.setViewportSize({width,height:900});
   await page.goto(base+route);
   await page.evaluate(()=>document.fonts.ready);
   const metrics=await page.evaluate(()=>({
    width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,
    heroHeight:document.querySelector('.hero')?.getBoundingClientRect().height,
    ctaTop:document.querySelector('.hero-actions')?.getBoundingClientRect().top,
    previewHeight:document.querySelector('.hero-showcase')?.getBoundingClientRect().height,
    heroButtons:[...document.querySelectorAll('.hero-actions .button')].map(el=>({text:el.textContent.trim(),height:el.getBoundingClientRect().height,width:el.getBoundingClientRect().width})),
    prices:[...document.querySelectorAll('.price strong')].map(el=>el.textContent),
    conceptLabels:[...document.querySelectorAll('.concept-badge')].map(el=>el.textContent)
   }));
   assert.equal(metrics.overflow,false,`${route}@${width}`);
   if(route==='/'){
    metrics.previousHeroHeight=previous.find(m=>m.width===width).heroHeight;
    metrics.heroReductionPercent=Math.round((1-metrics.heroHeight/metrics.previousHeroHeight)*100);
    assert.ok(metrics.heroHeight<metrics.previousHeroHeight);
    assert.ok(metrics.heroButtons.every(b=>b.height>=48));
   }
   if(route==='/pricing')assert.deepEqual(metrics.prices,['€500','€750','€1.250']);
   if(route==='/'||route==='/work')assert.deepEqual(metrics.conceptLabels,['Interactieve demo','Interactieve demo']);
   report.mobile.push({route,...metrics});
   const name=route==='/'?'home':route.slice(1);
   await page.screenshot({path:`review/polish-${name}-${width}.png`});
  }
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(base+'/');await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:'review/polish-home-desktop.png'});
 await page.setViewportSize({width:390,height:900});await page.goto(base+'/privacy');
 const samples=await page.locator('.legal-doc p,.legal-doc li,.legal-doc th,.legal-doc td,.legal-doc dt,.legal-doc dd,.legal-doc h2,.legal-doc h3,.toc a').evaluateAll(elements=>elements.map(el=>{
  const style=getComputedStyle(el);
  let parent=el,background='rgb(11, 16, 27)';
  while(parent){
   const value=getComputedStyle(parent).backgroundColor;
   if(value!=='rgba(0, 0, 0, 0)'&&value!=='transparent'){background=value;break;}
   parent=parent.parentElement;
  }
  return {element:el.tagName,text:el.textContent.trim().slice(0,100),foreground:style.color,background,fontSize:style.fontSize};
 }));
 for(const sample of samples){
  const l1=luminance(sample.foreground),l2=luminance(sample.background);
  sample.contrastRatio=Number(((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)).toFixed(2));
  assert.ok(sample.contrastRatio>=4.5,JSON.stringify(sample));
 }
 report.privacyContrast=samples;
 report.privacyContrastMinimum=Math.min(...samples.map(s=>s.contrastRatio));
 for(let i=0;i<await page.locator('.table-scroll').count();i++){
  const table=page.locator('.table-scroll').nth(i);
  await table.scrollIntoViewIfNeeded();
  await table.evaluate(el=>{el.scrollLeft=0;});
  await table.screenshot({path:`review/polish-privacy-table-${i+1}-left.png`});
  await table.evaluate(el=>{el.scrollLeft=el.scrollWidth;});
  await table.screenshot({path:`review/polish-privacy-table-${i+1}-right.png`});
 }
 for(const file of ['logo-primary.svg','logo-light.svg','logo-dark.svg','icon.svg','favicon.svg']){
  const svg=await readFile('public/brand/'+file,'utf8');
  assert.ok(!/<text\b|font-family/.test(svg),file+' must be path-only');
  if(file.startsWith('logo-'))assert.ok(svg.includes('viewBox="0 0 224 40"'));
  report.brand.push({file,pathsOnly:true});
 }
 await page.setViewportSize({width:800,height:450});
 await page.setContent(`<body style="margin:0;font:14px Arial"><div style="padding:40px;background:#0b101b;color:white"><p>Manolinq · vectorlogo op donker</p><img src="${base}/brand/logo-light.svg" width="336"><div style="display:flex;gap:24px;margin-top:26px;align-items:center">${[16,24,32,48].map(s=>`<img src="${base}/brand/favicon.svg" width="${s}" height="${s}">`).join('')}</div></div><div style="padding:30px 40px;background:#f5f7fb;color:#0b101b"><p>Op licht · dezelfde contouren</p><img src="${base}/brand/logo-dark.svg" width="336"></div></body>`);
 await page.locator('img').evaluateAll(async imgs=>Promise.all(imgs.map(i=>i.decode())));
 await page.screenshot({path:'review/polish-brand.png'});
 report.passed=true;
 console.log(JSON.stringify({mobileChecks:report.mobile.length,hero:report.mobile.filter(m=>m.route==='/').map(({width,heroHeight,previewHeight,heroReductionPercent})=>({width,heroHeight,previewHeight,heroReductionPercent})),minimumPrivacyContrast:report.privacyContrastMinimum,brandChecks:report.brand.length},null,2));
}finally{
 await writeFile('review/polish-review.json',JSON.stringify(report,null,2));
 await browser.close();
}
