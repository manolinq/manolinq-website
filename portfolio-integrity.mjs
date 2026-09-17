import {readFile,readdir} from 'node:fs/promises';
import {resolve,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {projects} from './portfolio-data.mjs';
export const digest=data=>createHash('sha256').update(data).digest('hex');
export const portfolioImages=projects.flatMap(project=>[project.image,project.mobileImage].filter(Boolean));

// Windows resolves filenames case-insensitively; Netlify's Linux build does not.
export async function exactFile(root,relative){
 if(relative.startsWith('/')||relative.split('/').some(part=>!part||part==='.'||part==='..'))throw new Error('Unsafe asset path: '+relative);
 let directory=resolve(root);
 for(const part of relative.split('/')){
  const entries=await readdir(directory);
  if(!entries.includes(part))throw new Error(`Missing asset or filename case mismatch: ${relative} (${part})`);
  directory=resolve(directory,part);
 }
 if(!directory.startsWith(resolve(root)+sep))throw new Error('Asset outside root');
 return readFile(directory);
}

export async function stylesheet(){
 const data=await exactFile('public','styles/site.css');
 const sha256=digest(data);
 return {data,sha256,url:`/styles/site-${sha256.slice(0,16)}.css`};
}

export async function verifyPortfolio(root='public'){
 const assets=[];
 for(const image of portfolioImages){
  if(!/^\/images\/portfolio\/[a-z0-9-]+\.webp$/.test(image.src))throw new Error('Invalid portfolio image URL: '+image.src);
  const data=await exactFile(root,image.src.slice(1));
  if(data.length<=12||data.toString('ascii',0,4)!=='RIFF'||data.toString('ascii',8,12)!=='WEBP')throw new Error('Not a nonempty WebP: '+image.src);
  assets.push({url:image.src,bytes:data.length,sha256:digest(data),width:image.width,height:image.height});
 }
 return assets;
}

export async function verifyPortfolioOutput(){
 const source=await verifyPortfolio();
 const built=await verifyPortfolio('site-dist');
 if(JSON.stringify(source)!==JSON.stringify(built))throw new Error('Published portfolio assets differ from source');
 const css=await stylesheet();
 if(digest(await exactFile('site-dist',css.url.slice(1)))!==css.sha256)throw new Error('Published stylesheet differs from source');
 const pages=[];
 for(const file of ['index.html','work.html']){
  const html=await readFile('site-dist/'+file,'utf8');
  if(!html.includes(`rel="stylesheet" href="${css.url}"`))throw new Error(file+': missing current fingerprinted stylesheet');
  const references=[...html.matchAll(/<img\b[^>]*\bsrc="(\/images\/portfolio\/[^"?]+)"/g)].map(match=>match[1]);
  if(references.length!==projects.length)throw new Error(file+': incorrect portfolio image count');
  for(const url of references){if(!source.some(asset=>asset.url===url))throw new Error('Unverified HTML image reference: '+url);await exactFile('site-dist',url.slice(1));}
  pages.push({file,images:references});
 }
 return {stylesheet:{url:css.url,sha256:css.sha256,bytes:css.data.length},assets:built,pages};
}
