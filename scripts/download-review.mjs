import http from 'node:http';
import {createReadStream,statSync} from 'node:fs';
const file=new URL('../../Manolinq-2.0-review.zip',import.meta.url);
http.createServer((req,res)=>{
 if(req.url!=='/Manolinq-2.0.zip'||!['GET','HEAD'].includes(req.method)){
  res.writeHead(404);res.end();return;
 }
 const size=statSync(file).size;
 res.writeHead(200,{'Content-Type':'application/zip','Content-Disposition':'attachment; filename="Manolinq-2.0-final-polish.zip"','Content-Length':size,'Cache-Control':'no-store'});
 if(req.method==='HEAD'){res.end();return;}
 createReadStream(file).pipe(res);
}).listen(4176,'127.0.0.1',()=>console.log('Local download: http://127.0.0.1:4176/Manolinq-2.0.zip'));
