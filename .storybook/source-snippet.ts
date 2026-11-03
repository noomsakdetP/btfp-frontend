
/**
 * ทำให้ปุ่ม "Show code" ในหน้า Docs แสดง HTML ที่ Dev copy ไปวางในหน้าได้เลย
 *
 * - เอา template ของ story มาแสดง (ไม่ใช่โค้ดของ story object)
 * - ตัด style="..." และ <div> ที่ไม่มี attribute (ใช้จัดตัวอย่างใน Storybook เท่านั้น)
 * - หนึ่งแท็กต่อบรรทัด ย่อหน้าตามความลึก แท็กที่มีแต่ข้อความอยู่บรรทัดเดียว
 */
const VOID_TAGS = new Set(['input', 'img', 'br', 'hr', 'meta', 'link']);

type Token = { kind: 'open' | 'close' | 'self' | 'text' | 'inline'; text: string; tag?: string };

function tokenize(html: string): Token[] {
  const out: Token[] = [];
  const re = /<\/?([a-zA-Z][\w-]*)[^>]*?>|[^<]+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const t = m[0].trim();
    if (!t) continue;
    if (!t.startsWith('<')) out.push({ kind: 'text', text: t });
    else if (t.startsWith('</')) out.push({ kind: 'close', text: t, tag: m[1] });
    else if (t.endsWith('/>') || VOID_TAGS.has(m[1].toLowerCase())) out.push({ kind: 'self', text: t, tag: m[1] });
    else out.push({ kind: 'open', text: t, tag: m[1] });
  }
  return out;
}

/** ตัด <div> ที่ไม่มี attribute (ใช้จัดตัวอย่างใน Storybook) พร้อมแท็กปิดที่คู่กัน */
function dropLayoutDivs(tokens: Token[]): Token[] {
  const out: Token[] = [];
  const stack: boolean[] = []; // true = div ที่ตัดทิ้ง
  for (const t of tokens) {
    if (t.kind === 'open' && t.tag === 'div') {
      const bare = t.text === '<div>';
      stack.push(bare);
      if (!bare) out.push(t);
    } else if (t.kind === 'close' && t.tag === 'div') {
      if (!stack.pop()) out.push(t);
    } else out.push(t);
  }
  return out;
}

/** รวม <tag>ข้อความ</tag> และ <tag></tag> เป็นบรรทัดเดียว */
function mergeInline(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const a = tokens[i];
    const b = tokens[i + 1];
    const c = tokens[i + 2];
    if (a.kind === 'open' && b?.kind === 'text' && c?.kind === 'close' && c.tag === a.tag) {
      out.push({ kind: 'inline', text: a.text + b.text + c.text });
      i += 2;
    } else if (a.kind === 'open' && b?.kind === 'close' && b.tag === a.tag) {
      out.push({ kind: 'inline', text: a.text + b.text });
      i += 1;
    } else out.push(a);
  }
  return out;
}

export function cleanSnippet(template: string): string {
  const html = template
    .replace(/\s+style="[^"]*"/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const lines: string[] = [];
  let depth = 0;
  for (const t of mergeInline(dropLayoutDivs(tokenize(html)))) {
    if (t.kind === 'close') depth = Math.max(0, depth - 1);
    lines.push('  '.repeat(depth) + t.text);
    if (t.kind === 'open') depth++;
  }
  return lines.join('\n');
}

/**
 * แทน [prop]="ชื่อ arg" ด้วยค่าจริงของ arg ตอนนั้น (เช่น [status]="status" เป็น status="review")
 * และตัด (event)="log(...)" ที่ใช้เฉพาะใน Storybook
 */
function fillArgs(template: string, args: Record<string, unknown>, argTypes: Record<string, unknown> = {}): string {
  return template
    .replace(/\s*\(\w+\)="log\([^"]*\)"/g, '')
    .replace(/\s*\[(\w+)\]="(\w+)"/g, (all, prop: string, name: string) => {
      if (!(name in args)) return name in argTypes ? '' : all; // arg ที่ไม่ได้ตั้งค่า ไม่ต้องแสดง ตัวแปรอื่นคงไว้
      const v = args[name];
      if (v === undefined || v === null || v === false || v === '') return '';
      if (v === true) return ` ${prop}`;
      if (typeof v === 'string' || typeof v === 'number') return ` ${prop}="${v}"`;
      return all;
    });
}

/**
 * ใช้เป็น parameters.docs.source.transform: แทนโค้ดของ story object ด้วย HTML ของ template
 * ถ้า story ไม่มี template (render ด้วย component ตรง ๆ) ใช้โค้ดเดิม
 */
export function htmlSnippetTransform(code: string, context: { originalStoryFn?: unknown; args?: unknown; argTypes?: unknown }): string {
  try {
    const fn = context.originalStoryFn as ((args: unknown, ctx: unknown) => { template?: string }) | undefined;
    const template = fn?.(context.args, context)?.template;
    return template ? cleanSnippet(fillArgs(template, (context.args ?? {}) as Record<string, unknown>, (context.argTypes ?? {}) as Record<string, unknown>)) : code;
  } catch {
    return code;
  }
}
