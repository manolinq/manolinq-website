import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root=resolve('site-dist');
const routes={'/':'index.html','/work':'work.html','/pricing':'pricing.html','/process':'process.html','/contact':'contact.html','/privacy':'privacy.html'};
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.xml':'application/xml','.txt':'text/plain'};
const port=Number(process.env.PORT||4174);
http.createServer(async(req,res)=>{
 const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(path.startsWith('/.netlify/functions/')) {
   res.writeHead(503,{'Content-Type':'application/json'});
   return res.end(JSON.stringify({error:'Local preview does not invoke production integrations'}));
 }
 const file=resolve(root,routes[path]||path.replace(/^\//,''));
 if(!file.startsWith(root+sep)){res.writeHead(403);return res.end();}
 try{const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'});res.end(data);}
 catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,'404.html')));}
}).listen(port,'127.0.0.1',()=>console.log(`Review preview: http://127.0.0.1:${port}`));
