import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';
import { PRIMEICONS_NAMES } from './primeicons-names';
import { moduleMetadata } from '@storybook/angular-vite';
import { BtfpIcon } from '../../app/shared/ui/icon/icon';
import { BTFP_CENTRAL_ICONS } from '../../app/theme/central-icons';
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

const iconCell = (icon: string, label: string, sub = '') =>
  `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 8px;border:1px solid var(--p-border-default);border-radius:var(--p-radius-inner);color:var(--p-icon-default)">${icon}<code class="btfp-text-caption" style="color:var(--p-text-secondary);text-align:center;overflow-wrap:anywhere">${label}</code>${sub}</div>`;

/** Icon กลาง: ไอคอนที่ PrimeIcons ไม่มี วาดให้เข้ากับ PrimeIcons (src/app/theme/central-icons.ts) */
export const CENTRAL_ICONS = Object.keys(BTFP_CENTRAL_ICONS);

/** ไอคอนเดิม (Lucide) ที่ยังใช้อยู่ในโค้ด และชื่อ PrimeIcons ที่จะย้ายไป */
export const LEGACY_TO_PRIME: Record<string, string> = {
  ban: 'ban', banknote: 'money-bill', bell: 'bell', 'building-complex': 'building', calendar: 'calendar',
  'calendar-clock': 'calendar-clock', 'calendar-days': 'calendar', 'chart-column': 'chart-bar', 'chevron-down': 'chevron-down',
  'chevron-left': 'chevron-left', 'chevron-right': 'chevron-right', 'circle-alert': 'exclamation-circle',
  'circle-check': 'check-circle', 'circle-question-mark': 'question-circle', 'circle-x': 'times-circle', download: 'download',
  eye: 'eye', files: 'clone', 'folder-open': 'folder-open', funnel: 'filter', 'graduation-cap': 'graduation-cap',
  hourglass: 'hourglass', info: 'info-circle', landmark: 'building-columns', 'layout-grid': 'th-large', 'list-checks': 'list-check',
  'map-pin': 'map-marker', menu: 'bars', minus: 'minus', pencil: 'pencil', phone: 'phone', plus: 'plus', 'rotate-ccw': 'replay',
  search: 'search', send: 'send', trash: 'trash', 'triangle-alert': 'exclamation-triangle', 'user-plus': 'user-plus',
  users: 'users', wallet: 'wallet', x: 'times', tv: 'desktop', 'shield-check': 'shield', 'list-filter': 'filter',
  signpost: 'directions',
};

export const primeIconsTpl = () =>
  grid(120, PRIMEICONS_NAMES.map((n) => iconCell(`<i class="pi pi-${n} text-2xl"></i>`, `pi-${n}`)).join(''));

export const iconsTpl = () =>
  grid(
    120,
    [...CENTRAL_ICONS]
      .sort()
      .map((n) => iconCell(`<btfp-icon name="${n}" size="24" />`, n))
      .join(''),
  );

export const legacyIconsTpl = () =>
  grid(
    150,
    Object.keys(LEGACY_TO_PRIME)
      .filter((n) => n in BTFP_ICONS)
      .sort()
      .map((n) =>
        iconCell(
          `<span style="display:flex;align-items:center;gap:12px"><btfp-icon name="${n}" size="24" /><span style="color:var(--p-text-secondary)">&gt;</span><i class="pi pi-${LEGACY_TO_PRIME[n]} text-2xl"></i></span>`,
          `${n} &gt; pi-${LEGACY_TO_PRIME[n]}`,
        ),
      )
      .join(''),
  );

export const iconSizesTpl = () =>
  `<div style="display:flex;align-items:end;gap:24px;color:var(--p-icon-default)">${[
    ['text-base', 16],
    ['text-xl', 20],
    ['text-2xl', 24],
  ]
    .map(([c, s]) => `<div style="display:flex;flex-direction:column;align-items:center;gap:8px"><i class="pi pi-file ${c}"></i><span class="btfp-text-caption">${s}px <code>${c}</code></span></div>`)
    .join('')}</div>`;

export const ICON_COUNT = PRIMEICONS_NAMES.length;
