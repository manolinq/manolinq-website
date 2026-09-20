import {readFile,readdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
import JSZip from 'jszip';
import {digest,verifyPortfolioOutput,verifyStylesheetOutput} from './portfolio-integrity.mjs';
const integrity=await verifyPortfolioOutput();
assert.equal(integrity.stylesheet.url,'/styles/site.css');
assert.equal((await verifyStylesheetOutput()).length,7);
for(const file of ['review/css-deploy-fix/output-results.json','review/css-deploy-fix/browser-results.json'])assert.equal(JSON.parse(await readFile(file,'utf8')).passed,true);
const zip=new JSZip();
const exclude=new Set(['node_modules','.git','.netlify','.tools','netlify-bundle']);
async function walk(dir=''){
 for(const entry of await readdir(dir||'.',{withFileTypes:true})){
  if(exclude.has(entry.name)||entry.name.startsWith('.env'))continue;
  const file=(dir?dir+'/':'')+entry.name;
  if(entry.isDirectory())await walk(file);else zip.file('Manolinq-2.0/'+file,await readFile(file));
 }
}
await walk();
const data=await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE',compressionOptions:{level:6}});
const check=await JSZip.loadAsync(data);
const required=['scripts/build.mjs','scripts/render-pages.mjs','scripts/portfolio-integrity.mjs','tests/css-deploy.mjs','tests/build-integrity.mjs','netlify.toml','site-dist/styles/site.css',...integrity.assets.flatMap(asset=>['public'+asset.url,'site-dist'+asset.url])];
for(const file of required)assert.equal(digest(await check.file('Manolinq-2.0/'+file).async('nodebuffer')),digest(await readFile(file)),file);
for(const page of await verifyStylesheetOutput()){
 const html=await check.file('Manolinq-2.0/site-dist/'+page.file).async('string');
 assert.ok(html.includes('href="/styles/site.css"'));assert.ok(!/href="\/styles\/site-[a-f0-9]+\.css"/.test(html));
}
assert.ok(!Object.keys(check.files).some(file=>/^Manolinq-2.0\/site-dist\/styles\/site-.*\.css$/.test(file)));
const output=resolve('../Manolinq-CSS-DEPLOY-FIX.zip');await writeFile(output,data);
console.log(JSON.stringify({output,bytes:data.length,sha256:digest(data),verified:true,pages:7,images:4}));
