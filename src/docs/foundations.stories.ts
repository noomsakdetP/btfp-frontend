import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { BtfpIcon } from '../app/shared/ui/icon/icon';
import { BTFP_ICONS } from '../app/theme/icons';

/** แสดงค่าจริงของ CSS variable ที่ browser คำนวณได้ (ใช้เฉพาะใน Storybook) */
@Component({
  selector: 'sb-token',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (swatch()) {
      <div class="swatch" [style.background]="'var(' + name() + ')'"></div>
    }
    <code>{{ name() }}</code>
    @if (alias()) {
      <span class="alias">{{ alias() }}</span>
    }
    <span class="value">{{ value() }}</span>
  `,
  styles: `
    :host { display: flex; flex-direction: column; gap: 4px; min-width: 0; font-size: 12px; line-height: 1.4; }
    .swatch { height: 48px; border: 1px solid var(--btfp-border-default); border-radius: var(--btfp-radius-inner); }
    code { overflow-wrap: anywhere; color: var(--btfp-text-primary); }
    .alias { color: var(--btfp-action-link); }
    .value { color: var(--btfp-text-secondary); text-transform: uppercase; }
  `,
})
class SbToken {
  readonly name = input.required<string>();
  readonly alias = input('');
  readonly swatch = input(true, { transform: (v: unknown) => v !== 'false' && v !== false });
  protected readonly value = signal('');
  private readonly el = inject(ElementRef<HTMLElement>);
  constructor() {
    afterNextRender(() => this.value.set(getComputedStyle(this.el.nativeElement).getPropertyValue(this.name()).trim()));
  }
}

const PALETTES = ['blue', 'navy', 'teal', 'gray', 'red', 'orange', 'green', 'yellow'];
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const SEMANTIC: [string, string][] = [
  ['--btfp-bg-default', 'white'], ['--btfp-bg-subtle', 'gray/50'], ['--btfp-bg-inverse', 'navy/900'], ['--btfp-surface-raised', 'white'],
  ['--btfp-text-primary', 'gray/800'], ['--btfp-text-secondary', 'gray/600'], ['--btfp-text-disabled', 'gray/400'], ['--btfp-text-heading', 'navy/900'], ['--btfp-text-inverse', 'white'],
  ['--btfp-border-default', 'gray/200'], ['--btfp-border-strong', 'gray/400'],
  ['--btfp-action-primary', 'blue/600'], ['--btfp-action-primary-hover', 'blue/700'], ['--btfp-action-primary-pressed', 'blue/800'], ['--btfp-action-primary-disabled', 'gray/300'],
  ['--btfp-action-secondary', 'navy/700'], ['--btfp-action-link', 'blue/700'], ['--btfp-focus-ring', 'blue/600'],
  ['--btfp-icon-default', 'gray/600'], ['--btfp-icon-subtle', 'gray/400'], ['--btfp-icon-strong', 'navy/900'], ['--btfp-icon-brand', 'blue/500'], ['--btfp-icon-action', 'blue/600'], ['--btfp-icon-disabled', 'gray/300'],
];
const FEEDBACK = ['success', 'warning', 'danger', 'info'];

const TYPE: [string, string, string][] = [
  ['btfp-text-display-xl', 'Display/XL', 'IBM Plex Sans Thai Bold 60/120%'],
  ['btfp-text-display', 'Display', 'IBM Plex Sans Thai Bold 40/135%'],
  ['btfp-text-h1', 'H1', 'IBM Plex Sans Thai Bold 32/135%'],
  ['btfp-text-h2', 'H2', 'IBM Plex Sans Thai SemiBold 24/135%'],
  ['btfp-text-h3', 'H3', 'IBM Plex Sans Thai SemiBold 20/135%'],
  ['btfp-text-h4', 'H4', 'IBM Plex Sans Thai SemiBold 18/135%'],
  ['btfp-text-body-l', 'Body/L', 'Sarabun Regular 18/160%'],
  ['btfp-text-body', 'Body', 'Sarabun Regular 16/160%'],
  ['btfp-text-body-medium', 'Body/Medium', 'Sarabun Medium 16/160%'],
  ['btfp-text-body-s', 'Body/S', 'Sarabun Regular 14/160%'],
  ['btfp-text-body-s-medium', 'Body/S Medium', 'Sarabun Medium 14/160%'],
  ['btfp-text-table', 'Table', 'Sarabun Regular 14/150%'],
  ['btfp-text-caption', 'Caption', 'Sarabun Regular 12/150%'],
];

const meta: Meta = {
  title: 'Foundations/Design Tokens',
  id: 'foundations',
  decorators: [moduleMetadata({ imports: [SbToken, BtfpIcon] })],
  parameters: {
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'ค่าพื้นฐานจาก Figma Variables (collection primitives / semantic / component) และ Text / Effect Styles ใช้เป็น CSS variable `--btfp-*` จาก `src/styles/_tokens.scss` ห้ามใส่รหัสสีตรงในโค้ด ในโค้ด cool-gray ของ Figma ใช้ชื่อ `gray`',
      },
    },
  },
};
export default meta;

const h = (t: string, d = '') =>
  `<h3 class="btfp-text-h3" style="margin:32px 0 4px">${t}</h3>${d ? `<p class="btfp-text-body-s" style="margin:0 0 16px;color:var(--btfp-text-secondary)">${d}</p>` : ''}`;

export const Colors: StoryObj = {
  name: 'สี',
  render: () => ({
    template:
      h('Primitives', 'ชุดสีพื้นฐาน 8 ชุด ชุดละ 10 ระดับ ใช้ผ่าน semantic token เป็นหลัก') +
      PALETTES.map(
        (p) =>
          `<p class="btfp-text-body-s-medium" style="margin:16px 0 8px">${p}</p>
           <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:12px">
             ${STEPS.map((s) => `<sb-token name="--btfp-${p}-${s}" />`).join('')}
           </div>`,
      ).join('') +
      h('Semantic', 'ความหมายของสี ใช้ token กลุ่มนี้ในหน้าจอและ component') +
      `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:16px">
        ${SEMANTIC.map(([n, a]) => `<sb-token name="${n}" alias="${a}" />`).join('')}
      </div>` +
      h('Feedback', 'สถานะสำเร็จ เตือน ผิดพลาด ข้อมูล แต่ละแบบมีพื้น ข้อความ เส้นขอบ') +
      `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">
        ${FEEDBACK.map(
          (f) =>
            `<div style="display:flex;flex-direction:column;gap:8px">
               <div style="padding:12px 16px;border:1px solid var(--btfp-${f}-border);border-radius:var(--btfp-radius-inner);background:var(--btfp-${f}-bg);color:var(--btfp-${f}-text)" class="btfp-text-body-s-medium">${f}</div>
               <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
                 <sb-token name="--btfp-${f}-bg" /><sb-token name="--btfp-${f}-text" /><sb-token name="--btfp-${f}-border" />
               </div>
             </div>`,
        ).join('')}
      </div>`,
  }),
};

export const Typography: StoryObj = {
  name: 'ตัวอักษร',
  render: () => ({
    template:
      h('Text Styles', 'หัวข้อใช้ IBM Plex Sans Thai เนื้อหาใช้ Sarabun ใส่ class ตามชื่อด้านซ้ายได้เลย') +
      `<div style="display:flex;flex-direction:column">
        ${TYPE.map(
          ([c, n, d]) =>
            `<div style="display:grid;grid-template-columns:220px 1fr;gap:24px;align-items:baseline;padding:16px 0;border-bottom:1px solid var(--btfp-border-default)">
               <div class="btfp-text-caption" style="color:var(--btfp-text-secondary)"><div class="btfp-text-body-s-medium" style="color:var(--btfp-text-primary)">${n}</div>${d}<br /><code>.${c}</code></div>
               <div class="${c}" style="color:var(--btfp-text-heading)">ทุน กทปส. เพื่อประโยชน์สาธารณะ 2569</div>
             </div>`,
        ).join('')}
      </div>`,
  }),
};

export const SpacingRadiusShadow: StoryObj = {
  name: 'ระยะ มุมโค้ง เงา',
  render: () => ({
    template:
      h('Spacing', 'ระยะห่างใช้ค่าในชุดนี้เท่านั้น (Tailwind: 1 = 4px)') +
      `<div style="display:flex;flex-direction:column;gap:8px">
        ${[['xs', 4], ['sm', 8], ['md', 16], ['lg', 24], ['xl', 32], ['2xl', 48], ['3xl', 64]]
          .map(
            ([n, v]) =>
              `<div style="display:flex;align-items:center;gap:16px"><code style="width:160px" class="btfp-text-caption">--btfp-space-${n}</code><span class="btfp-text-caption" style="width:40px;color:var(--btfp-text-secondary)">${v}px</span><span style="height:16px;width:var(--btfp-space-${n});background:var(--btfp-blue-300);border-radius:2px"></span></div>`,
          )
          .join('')}
      </div>` +
      h('Radius') +
      `<div style="display:flex;flex-wrap:wrap;gap:24px">
        ${['input', 'tag', 'button', 'inner', 'card', 'modal', 'card-lg', 'full']
          .map(
            (n) =>
              `<div style="display:flex;flex-direction:column;gap:8px;width:140px"><div style="height:56px;border:2px solid var(--btfp-blue-600);border-radius:var(--btfp-radius-${n});background:var(--btfp-blue-50)"></div><sb-token name="--btfp-radius-${n}" swatch="false" /></div>`,
          )
          .join('')}
      </div>` +
      h('Elevation', 'เงา 3 ระดับ (Figma: Elevation/01 ถึง 03)') +
      `<div style="display:flex;flex-wrap:wrap;gap:32px;padding:16px;background:var(--btfp-bg-subtle);border-radius:var(--btfp-radius-card)">
        ${[1, 2, 3]
          .map(
            (n) =>
              `<div style="width:200px;height:120px;display:grid;place-items:center;background:var(--btfp-surface-raised);border-radius:var(--btfp-radius-card);box-shadow:var(--btfp-shadow-${n})"><code class="btfp-text-caption">--btfp-shadow-${n}</code></div>`,
          )
          .join('')}
      </div>`,
  }),
};

export const Icons: StoryObj = {
  name: 'ไอคอน',
  parameters: {
    docs: {
      description: {
        story:
          'ไอคอน Lucide ที่ลงทะเบียนใน `src/app/theme/icons.ts` ใช้ `<btfp-icon name="eye" size="16" />` เส้นหนา 1.5 (16px ลงมา 1.25) ตาม Figma ไอคอนใหม่ต้องเพิ่มในไฟล์ icons.ts ก่อน',
      },
    },
  },
  render: () => ({
    template:
      h(`ไอคอนในระบบ (${Object.keys(BTFP_ICONS).length} ตัว)`) +
      `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px">
        ${Object.keys(BTFP_ICONS)
          .sort()
          .map(
            (n) =>
              `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 8px;border:1px solid var(--btfp-border-default);border-radius:var(--btfp-radius-inner);color:var(--btfp-icon-default)"><btfp-icon name="${n}" size="24" /><code class="btfp-text-caption" style="color:var(--btfp-text-secondary);text-align:center;overflow-wrap:anywhere">${n}</code></div>`,
          )
          .join('')}
      </div>` +
      h('ขนาด', '16 สำหรับในตาราง ปุ่ม และข้อความ 20 สำหรับเมนู 24 สำหรับหัวข้อและปุ่มใหญ่') +
      `<div style="display:flex;align-items:end;gap:24px;color:var(--btfp-icon-default)">
        ${[14, 16, 20, 24, 32].map((s) => `<div style="display:flex;flex-direction:column;align-items:center;gap:8px"><btfp-icon name="file-text" size="${s}" /><span class="btfp-text-caption">${s}</span></div>`).join('')}
      </div>`,
  }),
};
