import { spawn } from 'node:child_process';
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4175';
const server=process.env.PREVIEW_URL?null:spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,PORT:'4175'},stdio:'ignore'});
const run=file=>new Promise((resolve,reject)=>{
 const child=spawn(process.execPath,[file],{env:{...process.env,PREVIEW_URL:base},stdio:'inherit'});
 child.on('error',reject);
 child.on('exit',code=>code===0?resolve():reject(new Error(`${file}: exit ${code}`)));
});
try {
 let ready=false;
 for(let i=0;i<50;i++){
  try {ready=(await fetch(base)).ok;}catch{ /* server is starting */ }
  if(ready)break;
  await new Promise(resolve=>setTimeout(resolve,100));
 }
 if(!ready)throw new Error('Local review server did not start');
 await run('tests/verify.mjs');
 await run('tests/accessibility.mjs');
 await run('tests/portfolio-repair.mjs');
 await run('tests/build-integrity.mjs');
}finally{server?.kill();}
