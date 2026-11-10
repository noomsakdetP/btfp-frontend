import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { UiIcon } from '../../app/shared/ui/icon/icon';
import { CENTRAL_ICONS } from './_shared';
import { PRIMEICONS_NAMES } from './primeicons-names';

/**
 * หน้ารวมไอคอนใน Storybook (ใช้เฉพาะในเอกสาร)
 * แบ่งเป็นหัวข้อหุบได้: Icon กลาง, PrimeIcons (ค้นหาได้), ขนาด
 * กดที่ไอคอนเพื่อคัดลอกโค้ด
 */
@Component({
  selector: 'sb-icon-gallery',
  imports: [UiIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <details open>
      <summary>
        <span class="title">Icon กลาง</span>
        <span class="count">{{ central.length }} ตัว</span>
        <span class="hint">ไอคอนที่ PrimeIcons ไม่มี วาดให้เข้ากับ PrimeIcons ใช้ <code>p-ui-icon</code></span>
      </summary>
      <div class="grid">
        @for (n of central; track n) {
          <button type="button" class="cell" [class.copied]="copied() === 'c:' + n" (click)="copy('c:' + n, centralCode(n))" [title]="centralCode(n)">
            <p-ui-icon [name]="n" size="24" />
            <code>{{ copied() === 'c:' + n ? 'คัดลอกแล้ว' : n }}</code>
          </button>
        }
      </div>
    </details>

    <details open>
      <summary>
        <span class="title">PrimeIcons 7.0.0</span>
        <span class="count">{{ primeAll.length }} ตัว</span>
        <span class="hint">ไอคอนหลัก ใช้ก่อนเสมอ <code>&lt;i class="pi pi-ชื่อ"&gt;&lt;/i&gt;</code></span>
      </summary>
      <div class="search">
        <i class="pi pi-search"></i>
        <input
          type="search"
          placeholder="ค้นหาไอคอน เช่น file, user, calendar"
          aria-label="ค้นหาไอคอน PrimeIcons"
          [value]="query()"
          (input)="query.set($any($event.target).value)"
        />
        <span class="result">{{ prime().length }} ตัว</span>
      </div>
      @if (prime().length) {
        <div class="grid">
          @for (n of prime(); track n) {
            <button type="button" class="cell" [class.copied]="copied() === 'p:' + n" (click)="copy('p:' + n, primeCode(n))" [title]="primeCode(n)">
              <i [class]="'pi pi-' + n"></i>
              <code>{{ copied() === 'p:' + n ? 'คัดลอกแล้ว' : 'pi-' + n }}</code>
            </button>
          }
        </div>
      } @else {
        <p class="empty">ไม่พบไอคอน "{{ query() }}" ลองคำอื่น หรือดูใน Icon กลาง ถ้า PrimeIcons ไม่มีจริงให้วาดเพิ่มใน Icon กลาง</p>
      }
    </details>

    <details>
      <summary>
        <span class="title">ขนาด</span>
        <span class="hint">16 ในตาราง ปุ่ม S ข้อความ ไอคอนในช่องกรอก และลูกศรลง (chevron-down) ทุกที่, 20 ในเมนูและปุ่ม M L, 24 หัวข้อ ขนาดอื่นตาม Figma ใช้ <code>&lt;p-ui-icon name="pi-ชื่อ" size="18" /&gt;</code></span>
      </summary>
      <div class="sizes">
        @for (s of sizes; track s.px) {
          <div class="size">
            <i [class]="'pi pi-file ' + s.cls"></i>
            <p-ui-icon name="file-text" [size]="s.px" />
            <code>{{ s.px }}px</code>
            <code>{{ s.cls }} / size="{{ s.px }}"</code>
          </div>
        }
      </div>
    </details>
  `,
  styles: `
    :host { display: flex; flex-direction: column; gap: 16px; font-family: var(--p-font-body); color: var(--p-text-primary); }
    details { border: 1px solid var(--p-border-default); border-radius: var(--p-radius-card); background: var(--p-surface-raised); }
    summary { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px 12px; padding: 16px 20px; cursor: pointer; list-style: none; }
    summary::-webkit-details-marker { display: none; }
    summary::before { content: '›'; display: inline-block; width: 12px; font-size: 20px; line-height: 1; color: var(--p-text-secondary); transition: transform 0.15s; }
    details[open] > summary::before { transform: rotate(90deg); }
    details[open] > summary { border-bottom: 1px solid var(--p-border-default); }
    .title { font-family: var(--p-font-heading); font-size: 18px; font-weight: 600; color: var(--p-text-heading); }
    .count { font-size: 14px; color: var(--p-action-link); font-weight: 500; }
    .hint { font-size: 14px; color: var(--p-text-secondary); }
    .empty { margin: 16px 20px 0; font-size: 14px; color: var(--p-text-secondary); line-height: 1.6; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; padding: 16px 20px 20px; }
    .cell { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px 8px; border: 1px solid var(--p-border-default); border-radius: var(--p-radius-inner); background: var(--p-surface-raised); color: var(--p-icon-default); cursor: pointer; font: inherit; }
    .cell:hover { border-color: var(--p-action-primary); color: var(--p-action-primary); }
    .cell:focus-visible { outline: 2px solid var(--p-focus-ring); outline-offset: 2px; }
    .cell.copied { border-color: var(--p-success-border); background: var(--p-success-bg); }
    .cell i { font-size: 24px; }
    .cell code { font-size: 12px; color: var(--p-text-secondary); text-align: center; overflow-wrap: anywhere; }
    .search { display: flex; align-items: center; gap: 8px; margin: 16px 20px 0; padding: 0 12px; height: 40px; max-width: 480px; border: 1px solid var(--p-border-strong); border-radius: var(--p-radius-input); background: var(--p-surface-raised); }
    .search:focus-within { border-color: var(--p-action-primary); }
    .search i { color: var(--p-text-secondary); }
    .search input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; font: inherit; font-size: 16px; color: var(--p-text-primary); }
    .result { font-size: 14px; color: var(--p-text-secondary); white-space: nowrap; }
    .sizes { display: flex; flex-wrap: wrap; gap: 32px; padding: 16px 20px 20px; color: var(--p-icon-default); }
    .size { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .size code { font-size: 12px; color: var(--p-text-secondary); }
  `,
})
export class SbIconGallery {
  protected readonly central = [...CENTRAL_ICONS].sort();
  protected readonly primeAll = PRIMEICONS_NAMES;
  protected readonly sizes = [
    { px: 16, cls: 'text-base' },
    { px: 20, cls: 'text-xl' },
    { px: 24, cls: 'text-2xl' },
  ];

  protected readonly query = signal('');
  protected readonly copied = signal('');

  /** ค้นหาแบบเว็บ PrimeNG: ไม่สนตัวพิมพ์ ช่องว่างหรือขีดถือเป็นคำเดียวกัน */
  protected readonly prime = computed(() => {
    const q = this.query().trim().toLowerCase().replace(/^pi[- ]/, '').replace(/\s+/g, '-');
    return q ? this.primeAll.filter((n) => n.includes(q)) : this.primeAll;
  });

  protected primeCode(n: string): string {
    return `<i class="pi pi-${n}"></i>`;
  }

  protected centralCode(n: string): string {
    return `<p-ui-icon name="${n}" size="16" />`;
  }

  protected copy(key: string, text: string): void {
    navigator.clipboard?.writeText(text).catch(() => undefined);
    this.copied.set(key);
    setTimeout(() => this.copied() === key && this.copied.set(''), 1500);
  }
}
