import {readFile,writeFile,readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {verifyStylesheetOutput,digest} from '../scripts/portfolio-integrity.mjs';
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4182';
async function snapshot(){
 const files={};
 async function walk(dir=''){for(const entry of await readdir('site-dist/'+dir,{withFileTypes:true})){const path=dir+entry.name;if(entry.isDirectory())await walk(path+'/');else files[path]=digest(await readFile('site-dist/'+path));}}
 await walk();return files;
}
const before=await snapshot();
const result=spawnSync(process.execPath,['scripts/build.mjs'],{encoding:'utf8'});
assert.equal(result.status,0,result.stderr);
assert.deepEqual(await snapshot(),before,'Production output must be deterministic');
const pages=await verifyStylesheetOutput();
assert.equal(pages.length,7);
const responses=[];
for(const page of pages){
 for(const css of page.styles){
  const response=await fetch(base+css.url),data=Buffer.from(await response.arrayBuffer());
  assert.equal(response.status,200);assert.ok(response.headers.get('content-type').includes('text/css'));assert.equal(digest(data),css.sha256);
  responses.push({page:page.file,url:css.url,status:response.status,mime:response.headers.get('content-type'),bytes:data.length,hashMatches:true});
 }
}
await writeFile('review/css-deploy-fix/output-results.json',JSON.stringify({deterministic:true,pages,stylesheetHTTP:responses,passed:true},null,2));
console.log(JSON.stringify({deterministic:true,pages:pages.length,stylesheetChecks:responses.length,passed:true}));
