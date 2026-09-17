import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});
const context=await browser.newContext();
const page=await context.newPage();
const results=[];
try {
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/work','/pricing','/process','/contact','/privacy']){
   await page.goto((process.env.PREVIEW_URL||'http://127.0.0.1:4174')+route);
   const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   results.push({route,width,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({html:n.html,summary:n.failureSummary}))})),incomplete:result.incomplete.map(v=>v.id)});
  }
 }
 await writeFile('review/accessibility-results.json',JSON.stringify(results,null,2));
 assert.equal(results.flatMap(r=>r.violations).length,0,JSON.stringify(results.filter(r=>r.violations.length),null,2));
 console.log('Axe WCAG 2.1 AA: 12 page/viewport scans, zero detected violations. Manual checks still required.');
} finally {await browser.close();}
