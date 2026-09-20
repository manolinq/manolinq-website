import {readFile,readdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
import JSZip from 'jszip';
import {digest,verifyPortfolioOutput,portfolioImages} from './portfolio-integrity.mjs';
const integrity=await verifyPortfolioOutput();
for(const name of ['static-results','netlify-local-results','build-integrity-results','clean-checkout'])assert.equal(JSON.parse(await readFile(`review/repair/${name}.json`,'utf8')).passed,true,name);
const baseline=JSON.parse(await readFile('review/repair/input-audit.json','utf8'));
const zip=new JSZip(),changed=[],added=[];
const excluded=new Set(['node_modules','.git','.netlify','.tools','netlify-bundle']);
async function walk(directory=''){
 for(const entry of await readdir(directory||'.',{withFileTypes:true})){
  if(excluded.has(entry.name)||entry.name.startsWith('.env'))continue;
  const file=(directory?directory+'/':'')+entry.name;
  if(entry.isDirectory()){await walk(file);continue;}
  if(file==='review/repair/changed-files.json')continue;
  const data=await readFile(file);zip.file('Manolinq-2.0/'+file,data);
  if(!file.startsWith('review/')){
   if(!baseline.hashes[file])added.push(file);
   else if(digest(data)!==baseline.hashes[file])changed.push(file);
  }
 }
}
await walk();
const changes=JSON.stringify({comparedWith:'Manolinq-2.0-portfolio (3).zip',changed,added},null,2);
await writeFile('review/repair/changed-files.json',changes);zip.file('Manolinq-2.0/review/repair/changed-files.json',changes);
const required=['scripts/render-pages.mjs','scripts/portfolio-data.mjs','scripts/portfolio-integrity.mjs','scripts/build.mjs','scripts/test.mjs','public/styles/site.css','netlify.toml','tests/portfolio-repair.mjs','tests/build-integrity.mjs','index.html','work.html','site-dist/index.html','site-dist/work.html','site-dist'+integrity.stylesheet.url,'site-dist/portfolio-build.json',...portfolioImages.flatMap(image=>['public'+image.src,'site-dist'+image.src])];
const data=await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE',compressionOptions:{level:6}});
const check=await JSZip.loadAsync(data);
for(const file of required){assert.ok(check.file('Manolinq-2.0/'+file),file);assert.equal(digest(await check.file('Manolinq-2.0/'+file).async('nodebuffer')),digest(await readFile(file)),file);}
for(const image of portfolioImages)assert.equal(digest(await check.file('Manolinq-2.0/public'+image.src).async('nodebuffer')),baseline.hashes['public'+image.src],'Original image changed');
for(const file of ['netlify.toml','netlify/functions/submit-lead.js','supabase/migrations/20260529150024_create_leads_table.sql','public/scripts/contact.js'])assert.equal(digest(await check.file('Manolinq-2.0/'+file).async('nodebuffer')),baseline.hashes[file],file);
const output=resolve('../Manolinq-2.0-portfolio-FIXED.zip');
await writeFile(output,data);
console.log(JSON.stringify({output,bytes:data.length,sha256:digest(data),verifiedRequiredFiles:required.length,changed,added},null,2));
