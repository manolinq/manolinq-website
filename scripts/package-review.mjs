import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import JSZip from 'jszip';
import { createHash } from 'node:crypto';
const original=await JSZip.loadAsync(await readFile('review/Manolinq-original-2026-09-16.zip'));
const changed=[],added=[],unchanged=[];
const archive=new JSZip();
const excluded=new Set(['node_modules','.git','.netlify','.tools','netlify-bundle']);
async function walk(path=''){
 for(const entry of await readdir(path||'.',{withFileTypes:true})){
  if(excluded.has(entry.name)||entry.name.startsWith('.env'))continue;
  const file=(path?path+'/':'')+entry.name;
  if(entry.isDirectory()){await walk(file);continue;}
  if(file==='review/changed-files.json')continue;
  const data=await readFile(file);
  archive.file('Manolinq-2.0/'+file,data);
  const old=original.file(file);
  if(!old)added.push(file);
  else if(Buffer.compare(data,await old.async('nodebuffer'))!==0)changed.push(file);
  else unchanged.push(file);
 }
}
await walk();
const result={changed,added,unchanged,removed:Object.keys(original.files).filter(f=>!original.files[f].dir&&!archive.file('Manolinq-2.0/'+f))};
const json=JSON.stringify(result,null,2);
await writeFile('review/changed-files.json',json);
archive.file('Manolinq-2.0/review/changed-files.json',json);
const output=resolve('../Manolinq-2.0-review.zip');
const data=await archive.generateAsync({type:'nodebuffer',compression:'DEFLATE',compressionOptions:{level:6}});
await writeFile(output,data);
console.log(JSON.stringify({archive:output,bytes:data.length,sha256:createHash('sha256').update(data).digest('hex'),changed:changed.length,added:added.length,removed:result.removed},null,2));
