/**
 * ตรวจว่า token ของเรา (--p-* ใน src/styles/_tokens.scss) ชื่อชนกับตัวแปรของ PrimeNG (ธีม Aura) ตัวไหนบ้าง
 *
 * ทำไมต้องตรวจ: token ของเราอยู่นอก CSS layer จึงชนะค่าของ PrimeNG เสมอ
 * ถ้าชื่อบังเอิญตรงกับตัวแปรที่ PrimeNG ใช้ภายใน ค่าของเราจะไปทับ PrimeNG โดยไม่มี error
 *
 * ชุดสีพื้นฐาน (blue, red, gray ...) ตั้งใจให้ทับ เพื่อให้ component ของ PrimeNG ใช้สีของเรา จึงอยู่ใน ALLOWED
 * ถ้าเจอชื่อชนนอกเหนือจากนั้น สคริปต์จะหยุดพร้อมรายชื่อ ให้เปลี่ยนชื่อ token ของเราหรือเพิ่มใน ALLOWED ถ้าตั้งใจ
 *
 * รันทุกครั้งที่อัปเกรด PrimeNG หรือเพิ่ม token: npm run check:tokens
 */
import { readFileSync } from 'node:fs';
import Aura from '@primeuix/themes/aura';

/** ชุดสีพื้นฐานที่ตั้งใจทับของ PrimeNG */
const ALLOWED = /^--p-(blue|red|green|yellow|orange|teal|gray)-\d+$/;

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const primeVars = new Set();
function walk(node, path) {
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k === 'colorScheme') { for (const mode of Object.values(v)) walk(mode, path); continue; }
      if (k === 'css' || k === 'extend') continue;
      walk(v, [...path, k]);
    }
  } else {
    primeVars.add(('--p-' + path.map(kebab).join('-')).replace(/-root(?=-|$)/g, '').replace(/-default$/, ''));
  }
}
walk(Aura.primitive, []);
walk(Aura.semantic, []);
for (const [name, def] of Object.entries(Aura.components ?? {})) walk(def, [name]);

const scss = readFileSync(new URL('../src/styles/_tokens.scss', import.meta.url), 'utf8');
const ours = [...new Set([...scss.matchAll(/^\s*(--p-[a-z0-9-]+)\s*:/gm)].map((m) => m[1]))];

const clash = ours.filter((t) => primeVars.has(t));
const unexpected = clash.filter((t) => !ALLOWED.test(t));

console.log(`token ของเรา ${ours.length} ตัว ชื่อตรงกับ PrimeNG ${clash.length} ตัว (ตั้งใจทับ ${clash.length - unexpected.length} ตัว)`);
if (unexpected.length) {
  console.error('\nชื่อชนกับ PrimeNG โดยไม่ได้ตั้งใจ ค่าของเราจะไปทับ PrimeNG:\n' + unexpected.map((t) => '  ' + t).join('\n'));
  process.exit(1);
}
console.log('ไม่มีชื่อชนที่ไม่ได้ตั้งใจ');
