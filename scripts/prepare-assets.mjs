import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_PATH || 'sharp');
const original = await readFile('index.html', 'utf8');
const match = original.match(/data:image\/jpeg;base64,([A-Za-z0-9+/=\s]+?)["']/);
if (!match) throw new Error('Original embedded portrait not found; do not run extraction twice.');
const portrait = Buffer.from(match[1], 'base64');
await writeFile('public/images/manolito-original.jpg', portrait);
const meta = await sharp(portrait).metadata();
await sharp(portrait).rotate().resize({width: 760, withoutEnlargement: true}).webp({quality: 88}).toFile('public/images/manolito.webp');
await sharp(portrait).rotate().resize({width: 420, withoutEnlargement: true}).webp({quality: 86}).toFile('public/images/manolito-small.webp');
const mark = '<path d="M5 34V6l15 17L35 6v28" fill="none" stroke="#248BFF" stroke-width="5" stroke-linejoin="miter"/><path d="M13 34V25l7 8 7-8v9" fill="none" stroke="#248BFF" stroke-width="3"/>';
for (const [name,color] of [['logo-light','#FFFFFF'],['logo-dark','#0B101B'],['logo-primary','#FFFFFF']]) {
 await writeFile(`public/brand/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="224" height="40" viewBox="0 0 224 40" role="img" aria-label="Manolinq">${mark}<text x="51" y="29" fill="${color}" font-family="Arial, sans-serif" font-size="29" font-weight="600" letter-spacing="-1">Manolinq</text></svg>`);
}
await writeFile('public/brand/icon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">${mark}</svg>`);
await writeFile('public/brand/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#0B101B"/><g transform="translate(4 4)">${mark}</g></svg>`);
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0B101B"/><g transform="translate(80 70) scale(1.5)">${mark}<text x="52" y="30" fill="white" font-family="Arial" font-size="30">Manolinq</text></g><text x="80" y="290" fill="white" font-family="Arial" font-size="70" font-weight="bold">Sterk design.</text><text x="80" y="375" fill="#248BFF" font-family="Arial" font-size="70" font-weight="bold">Persoonlijk ontwikkeld.</text><path d="M80 480H1120" stroke="#334155"/><text x="80" y="542" fill="#A9B9CC" font-family="Arial" font-size="26">Websites &amp; AI-oplossingen</text><text x="902" y="542" fill="#A9B9CC" font-family="Arial" font-size="26">manolinq.com</text></svg>`;
await sharp(Buffer.from(og)).png().toFile('public/brand/social-preview.png');
const files=['netlify/functions/submit-lead.js','supabase/migrations/20260529150024_create_leads_table.sql','review/Manolinq-original-2026-09-16.zip'];
const hashes={};
for (const path of files) hashes[path]=createHash('sha256').update(await readFile(path)).digest('hex');
await writeFile('review/protected-hashes.json',JSON.stringify(hashes,null,2));
console.log(JSON.stringify({portrait: {width:meta.width,height:meta.height,originalBytes:portrait.length},protected:hashes},null,2));
