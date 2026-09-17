import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import {verifyPortfolio,verifyPortfolioOutput,stylesheet} from './portfolio-integrity.mjs';
// Fail on missing source assets, even if a previous site-dist still contains them.
await verifyPortfolio();
// Netlify runs build alone: always regenerate the authoritative shared templates.
await import('./render-pages.mjs');
// No recursive deletion: legacy dist and source remain untouched.
const output=resolve('site-dist');
await mkdir(output,{recursive:true});
const pages=['index.html','work.html','pricing.html','process.html','contact.html','privacy.html','404.html'];
for (const file of pages) {
 const html=await readFile(file,'utf8');
 if ((html.match(/<h1[ >]/g)||[]).length!==1) throw new Error(`${file}: expected one h1`);
 if (html.includes('data:image') || html.includes('/src/main')) throw new Error(`${file}: wrong production source`);
 await cp(file,resolve(output,file));
}
for(const dir of ['brand','images','styles','scripts']) await cp(`public/${dir}`,resolve(output,dir),{recursive:true});
const portfolioCss=await stylesheet();
await writeFile(resolve(output,portfolioCss.url.slice(1)),portfolioCss.data);
for(const file of ['manolinq-icon.svg','manolinq-logo-transparent.svg','manolinq-logo.png.png','manolinq-logo-transparent.png.png']) {
 await cp(`public/${file}`,resolve(output,file));
 await mkdir(resolve(output,'public'),{recursive:true});
 await cp(`public/${file}`,resolve(output,'public',file));
}
for(const file of ['robots.txt','sitemap.xml']) await cp(file,resolve(output,file));
await cp('public/_redirects',resolve(output,'_redirects'));
await cp('public/_headers',resolve(output,'_headers'));
const protectedHashes=JSON.parse(await readFile('review/protected-hashes.json','utf8'));
for(const [file,expected] of Object.entries(protectedHashes)) {
 const hash=createHash('sha256').update(await readFile(file)).digest('hex');
 if(hash!==expected) throw new Error(`Protected original changed: ${file}`);
}
const portfolioIntegrity=await verifyPortfolioOutput();
await writeFile(resolve(output,'portfolio-build.json'),JSON.stringify(portfolioIntegrity,null,2));
await writeFile('review/build-result.json',JSON.stringify({pages,output:'site-dist',backendUnchanged:true,portfolioIntegrity,builtAt:new Date().toISOString()},null,2));
console.log('Build passed: 6 public pages + 404, explicit routes, local assets, unchanged backend and migration.');
