// Optional local packaging check, no deployment and no secrets.
// npm install --prefix review/.tools --no-save --ignore-scripts @netlify/zip-it-and-ship-it yargs
import {zipFunctions} from '../review/.tools/node_modules/@netlify/zip-it-and-ship-it/dist/main.js';
import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import Module from 'node:module';
import assert from 'node:assert/strict';
const result=await zipFunctions('netlify/functions','review/netlify-bundle',{archiveFormat:'none',config:{'*':{nodeBundler:'esbuild',nodeVersion:'22'}}});
await writeFile('review/netlify-bundle-result.json',JSON.stringify(result,null,2));
// Netlify's generated bundle has no package.json and is a CommonJS Lambda artifact.
const module=new Module('local-bundle.cjs');
module.filename=resolve('review/netlify-bundle/submit-lead/local-bundle.cjs');
module.paths=Module._nodeModulePaths(resolve('.'));
module._compile(await readFile('review/netlify-bundle/submit-lead/submit-lead.js','utf8'),module.filename);
assert.equal(typeof module.exports.handler,'function');
const method=await module.exports.handler({httpMethod:'GET',headers:{},body:''});
const origin=await module.exports.handler({httpMethod:'POST',headers:{origin:'https://blocked.invalid'},body:'{}'});
assert.equal(method.statusCode,405);assert.equal(origin.statusCode,403);
await writeFile('review/bundle-smoke-test.json',JSON.stringify({exportedHandler:'function',methodCheck:405,originCheck:403,noNetwork:true},null,2));
console.log('Netlify bundling and CommonJS handler smoke test passed. No live integration requests.');
