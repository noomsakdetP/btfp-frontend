import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular-vite';
import { BtfpIcon } from '../../app/shared/ui/icon/icon';
import { BTFP_CENTRAL_ICONS } from '../../app/theme/central-icons';

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
    .swatch { height: 48px; border: 1px solid var(--p-border-default); border-radius: var(--p-radius-inner); }
    code { overflow-wrap: anywhere; color: var(--p-text-primary); }
    .alias { color: var(--p-action-link); }
    .value { color: var(--p-text-secondary); text-transform: uppercase; }
  `,
})
export class SbToken {
  readonly name = input.required<string>();
  readonly alias = input('');
  readonly swatch = input(true, { transform: (v: unknown) => v !== 'false' && v !== false });
  protected readonly value = signal('');
  private readonly el = inject(ElementRef<HTMLElement>);
  constructor() {
    afterNextRender(() => this.value.set(getComputedStyle(this.el.nativeElement).getPropertyValue(this.name()).trim()));
  }
}

export const PALETTES = ['blue', 'navy', 'teal', 'gray', 'red', 'orange', 'green', 'yellow'];
export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export const SEMANTIC: [string, string][] = [
  ['--p-bg-default', 'white'], ['--p-bg-subtle', 'gray/50'], ['--p-bg-inverse', 'navy/900'], ['--p-surface-raised', 'white'],
  ['--p-text-primary', 'gray/800'], ['--p-text-secondary', 'gray/600'], ['--p-text-disabled', 'gray/400'], ['--p-text-heading', 'navy/900'], ['--p-text-inverse', 'white'],
  ['--p-border-default', 'gray/200'], ['--p-border-strong', 'gray/400'],
  ['--p-action-primary', 'blue/600'], ['--p-action-primary-hover', 'blue/700'], ['--p-action-primary-pressed', 'blue/800'], ['--p-action-primary-disabled', 'gray/300'],
  ['--p-action-secondary', 'navy/700'], ['--p-action-link', 'blue/700'], ['--p-focus-ring', 'blue/600'],
  ['--p-icon-default', 'gray/600'], ['--p-icon-subtle', 'gray/400'], ['--p-icon-strong', 'navy/900'], ['--p-icon-brand', 'blue/500'], ['--p-icon-action', 'blue/600'], ['--p-icon-disabled', 'gray/300'],
];
export const FEEDBACK = ['success', 'warning', 'danger', 'info'];
/** สีของตัวโหลด (btfp-route-progress / ngx-ui-loader) */
export const LOADING: [string, string][] = [
  ['--p-loading-spinner', 'action/primary'],
  ['--p-loading-overlay', 'bg/inverse 80%'],
  ['--p-loading-text', 'text/inverse'],
];

export const TYPE: [string, string, string][] = [
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

/** imports + พื้นหลังขาว ที่ทุกหน้าใน Foundations ใช้ */
export const foundationImports = moduleMetadata({ imports: [SbToken, BtfpIcon] });

const grid = (min: number, body: string) => `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(${min}px,1fr));gap:12px">${body}</div>`;

export const primitivesTpl = () =>
  PALETTES.map(
    (p) =>
      `<p class="btfp-text-body-s-medium" style="margin:16px 0 8px">${p}</p>` +
      grid(110, STEPS.map((s) => `<sb-token name="--p-${p}-${s}" />`).join('')),
  ).join('');

export const semanticTpl = () => grid(170, SEMANTIC.map(([n, a]) => `<sb-token name="${n}" alias="${a}" />`).join(''));

export const loadingTpl = () =>
  `<div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:24px;align-items:start">` +
  grid(150, LOADING.map(([n, a]) => `<sb-token name="${n}" alias="${a}" />`).join('')) +
  `<div style="position:relative;height:220px;overflow:hidden;border-radius:var(--p-radius-card);border:1px solid var(--p-border-default);background:var(--p-bg-subtle)">
     <div style="padding:24px;filter:blur(3px)"><p class="btfp-text-h4" style="margin:0">ข้อเสนอโครงการ</p><p class="btfp-text-body-s" style="margin:4px 0 0">เนื้อหาหน้าเดิม</p></div>
     <div style="position:absolute;inset:0 0 auto;height:3px;width:40%;background:var(--p-loading-spinner)"></div>
     <div style="position:absolute;inset:0;display:grid;place-items:center;background:var(--p-loading-overlay)">
       <div style="display:flex;gap:6px;height:56px;align-items:center">${[1, 0.6, 1, 0.6, 1].map((h) => `<i style="display:block;width:8px;height:${h * 100}%;background:var(--p-loading-spinner)"></i>`).join('')}</div>
     </div>
   </div></div>`;

export const feedbackTpl = () =>
  grid(
    220,
    FEEDBACK.map(
      (f) =>
        `<div style="display:flex;flex-direction:column;gap:8px">
           <div style="padding:12px 16px;border:1px solid var(--p-${f}-border);border-radius:var(--p-radius-inner);background:var(--p-${f}-bg);color:var(--p-${f}-text)" class="btfp-text-body-s-medium">${f}</div>
           <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
             <sb-token name="--p-${f}-bg" /><sb-token name="--p-${f}-text" /><sb-token name="--p-${f}-border" />
           </div>
         </div>`,
    ).join(''),
  );

export const typeTpl = (rows: [string, string, string][]) =>
  `<div style="display:flex;flex-direction:column">${rows
    .map(
      ([c, n, d]) =>
        `<div style="display:grid;grid-template-columns:220px 1fr;gap:24px;align-items:baseline;padding:16px 0;border-bottom:1px solid var(--p-border-default)">
           <div class="btfp-text-caption" style="color:var(--p-text-secondary)"><div class="btfp-text-body-s-medium" style="color:var(--p-text-primary)">${n}</div>${d}<br /><code>.${c}</code></div>
           <div class="${c}" style="color:var(--p-text-heading)">ทุน กทปส. เพื่อประโยชน์สาธารณะ 2569</div>
         </div>`,
    )
    .join('')}</div>`;

export const spacingTpl = () =>
  `<div style="display:flex;flex-direction:column;gap:8px">${(
    [['xs', 4], ['sm', 8], ['md', 16], ['lg', 24], ['xl', 32], ['2xl', 48], ['3xl', 64]] as [string, number][]
  )
    .map(
      ([n, v]) =>
        `<div style="display:flex;align-items:center;gap:16px"><code style="width:160px" class="btfp-text-caption">--p-space-${n}</code><span class="btfp-text-caption" style="width:40px;color:var(--p-text-secondary)">${v}px</span><span style="height:16px;width:var(--p-space-${n});background:var(--p-blue-300);border-radius:2px"></span></div>`,
    )
    .join('')}</div>`;

export const radiusTpl = () =>
  `<div style="display:flex;flex-wrap:wrap;gap:24px">${['input', 'tag', 'button', 'inner', 'card', 'modal', 'card-lg', 'full']
    .map(
      (n) =>
        `<div style="display:flex;flex-direction:column;gap:8px;width:140px"><div style="height:56px;border:2px solid var(--p-blue-600);border-radius:var(--p-radius-${n});background:var(--p-blue-50)"></div><sb-token name="--p-radius-${n}" swatch="false" /></div>`,
    )
    .join('')}</div>`;

export const shadowTpl = () =>
  `<div style="display:flex;flex-wrap:wrap;gap:32px;padding:16px;background:var(--p-bg-subtle);border-radius:var(--p-radius-card)">${[1, 2, 3]
    .map(
      (n) =>
        `<div style="width:200px;height:120px;display:grid;place-items:center;background:var(--p-surface-raised);border-radius:var(--p-radius-card);box-shadow:var(--p-shadow-${n})"><code class="btfp-text-caption">--p-shadow-${n}</code></div>`,
    )
    .join('')}</div>`;

/** Icon กลาง: ไอคอนที่ PrimeIcons ไม่มี วาดให้เข้ากับ PrimeIcons (src/app/theme/central-icons.ts) */
export const CENTRAL_ICONS = Object.keys(BTFP_CENTRAL_ICONS);

