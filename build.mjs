import { cp, mkdir, readFile, writeFile,rm,lstat,realpath } from 'node:fs/promises';
import { resolve,dirname } from 'node:path';
import {fileURLToPath} from 'node:url';
import { createHash } from 'node:crypto';
import {verifyPortfolio,verifyPortfolioOutput,verifyStylesheetOutput} from './portfolio-integrity.mjs';
// Fail on missing source assets, even if a previous site-dist still contains them.
await verifyPortfolio();
const output=resolve('site-dist');
const expected=resolve(dirname(fileURLToPath(import.meta.url)),'../site-dist');
if(output!==expected)throw new Error('Run the build from the project root');
// Only this exact generated directory may be removed; never follow a junction.
try{
 const stat=await lstat(output);
 if(stat.isSymbolicLink()||!stat.isDirectory()||(await realpath(output)).toLowerCase()!==expected.toLowerCase())throw new Error('Unsafe site-dist cleanup target');
 await rm(output,{recursive:true,force:true});
}catch(error){if(error.code!=='ENOENT')throw error;}
// HTML and local assets are rebuilt together, never copied from stale output.
await import('./render-pages.mjs');
await mkdir(output,{recursive:true});
const pages=['index.html','work.html','pricing.html','process.html','contact.html','privacy.html','404.html'];
for (const file of pages) {
 const html=await readFile(file,'utf8');
 if ((html.match(/<h1[ >]/g)||[]).length!==1) throw new Error(`${file}: expected one h1`);
 if (html.includes('data:image') || html.includes('/src/main')) throw new Error(`${file}: wrong production source`);
 await cp(file,resolve(output,file));
}
for(const dir of ['brand','images','styles','scripts']) await cp(`public/${dir}`,resolve(output,dir),{recursive:true});
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
const stylesheets=await verifyStylesheetOutput();
await writeFile(resolve(output,'portfolio-build.json'),JSON.stringify(portfolioIntegrity,null,2));
await writeFile('review/build-result.json',JSON.stringify({pages,output:'site-dist',backendUnchanged:true,portfolioIntegrity,stylesheets,builtAt:new Date().toISOString()},null,2));
console.log('Build passed: 6 public pages + 404, explicit routes, local assets, unchanged backend and migration.');
