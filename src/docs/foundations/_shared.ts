import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular-vite';
import { BtfpIcon } from '../../app/shared/ui/icon/icon';
import { BTFP_ICONS } from '../../app/theme/icons';

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
  ['--btfp-bg-default', 'white'], ['--btfp-bg-subtle', 'gray/50'], ['--btfp-bg-inverse', 'navy/900'], ['--btfp-surface-raised', 'white'],
  ['--btfp-text-primary', 'gray/800'], ['--btfp-text-secondary', 'gray/600'], ['--btfp-text-disabled', 'gray/400'], ['--btfp-text-heading', 'navy/900'], ['--btfp-text-inverse', 'white'],
  ['--btfp-border-default', 'gray/200'], ['--btfp-border-strong', 'gray/400'],
  ['--btfp-action-primary', 'blue/600'], ['--btfp-action-primary-hover', 'blue/700'], ['--btfp-action-primary-pressed', 'blue/800'], ['--btfp-action-primary-disabled', 'gray/300'],
  ['--btfp-action-secondary', 'navy/700'], ['--btfp-action-link', 'blue/700'], ['--btfp-focus-ring', 'blue/600'],
  ['--btfp-icon-default', 'gray/600'], ['--btfp-icon-subtle', 'gray/400'], ['--btfp-icon-strong', 'navy/900'], ['--btfp-icon-brand', 'blue/500'], ['--btfp-icon-action', 'blue/600'], ['--btfp-icon-disabled', 'gray/300'],
];
export const FEEDBACK = ['success', 'warning', 'danger', 'info'];

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
      grid(110, STEPS.map((s) => `<sb-token name="--btfp-${p}-${s}" />`).join('')),
  ).join('');

export const semanticTpl = () => grid(170, SEMANTIC.map(([n, a]) => `<sb-token name="${n}" alias="${a}" />`).join(''));

export const feedbackTpl = () =>
  grid(
    220,
    FEEDBACK.map(
      (f) =>
        `<div style="display:flex;flex-direction:column;gap:8px">
           <div style="padding:12px 16px;border:1px solid var(--btfp-${f}-border);border-radius:var(--btfp-radius-inner);background:var(--btfp-${f}-bg);color:var(--btfp-${f}-text)" class="btfp-text-body-s-medium">${f}</div>
           <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
             <sb-token name="--btfp-${f}-bg" /><sb-token name="--btfp-${f}-text" /><sb-token name="--btfp-${f}-border" />
           </div>
         </div>`,
    ).join(''),
  );

export const typeTpl = (rows: [string, string, string][]) =>
  `<div style="display:flex;flex-direction:column">${rows
    .map(
      ([c, n, d]) =>
        `<div style="display:grid;grid-template-columns:220px 1fr;gap:24px;align-items:baseline;padding:16px 0;border-bottom:1px solid var(--btfp-border-default)">
           <div class="btfp-text-caption" style="color:var(--btfp-text-secondary)"><div class="btfp-text-body-s-medium" style="color:var(--btfp-text-primary)">${n}</div>${d}<br /><code>.${c}</code></div>
           <div class="${c}" style="color:var(--btfp-text-heading)">ทุน กทปส. เพื่อประโยชน์สาธารณะ 2569</div>
         </div>`,
    )
    .join('')}</div>`;

export const spacingTpl = () =>
  `<div style="display:flex;flex-direction:column;gap:8px">${(
    [['xs', 4], ['sm', 8], ['md', 16], ['lg', 24], ['xl', 32], ['2xl', 48], ['3xl', 64]] as [string, number][]
  )
    .map(
      ([n, v]) =>
        `<div style="display:flex;align-items:center;gap:16px"><code style="width:160px" class="btfp-text-caption">--btfp-space-${n}</code><span class="btfp-text-caption" style="width:40px;color:var(--btfp-text-secondary)">${v}px</span><span style="height:16px;width:var(--btfp-space-${n});background:var(--btfp-blue-300);border-radius:2px"></span></div>`,
    )
    .join('')}</div>`;

export const radiusTpl = () =>
  `<div style="display:flex;flex-wrap:wrap;gap:24px">${['input', 'tag', 'button', 'inner', 'card', 'modal', 'card-lg', 'full']
    .map(
      (n) =>
        `<div style="display:flex;flex-direction:column;gap:8px;width:140px"><div style="height:56px;border:2px solid var(--btfp-blue-600);border-radius:var(--btfp-radius-${n});background:var(--btfp-blue-50)"></div><sb-token name="--btfp-radius-${n}" swatch="false" /></div>`,
    )
    .join('')}</div>`;

export const shadowTpl = () =>
  `<div style="display:flex;flex-wrap:wrap;gap:32px;padding:16px;background:var(--btfp-bg-subtle);border-radius:var(--btfp-radius-card)">${[1, 2, 3]
    .map(
      (n) =>
        `<div style="width:200px;height:120px;display:grid;place-items:center;background:var(--btfp-surface-raised);border-radius:var(--btfp-radius-card);box-shadow:var(--btfp-shadow-${n})"><code class="btfp-text-caption">--btfp-shadow-${n}</code></div>`,
    )
    .join('')}</div>`;

export const iconsTpl = () =>
  grid(
    120,
    Object.keys(BTFP_ICONS)
      .sort()
      .map(
        (n) =>
          `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 8px;border:1px solid var(--btfp-border-default);border-radius:var(--btfp-radius-inner);color:var(--btfp-icon-default)"><btfp-icon name="${n}" size="24" /><code class="btfp-text-caption" style="color:var(--btfp-text-secondary);text-align:center;overflow-wrap:anywhere">${n}</code></div>`,
      )
      .join(''),
  );

export const iconSizesTpl = () =>
  `<div style="display:flex;align-items:end;gap:24px;color:var(--btfp-icon-default)">${[14, 16, 20, 24, 32]
    .map((s) => `<div style="display:flex;flex-direction:column;align-items:center;gap:8px"><btfp-icon name="file-text" size="${s}" /><span class="btfp-text-caption">${s}</span></div>`)
    .join('')}</div>`;

export const ICON_COUNT = Object.keys(BTFP_ICONS).length;
