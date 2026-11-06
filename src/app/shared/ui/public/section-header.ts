import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * btfp-section-header : หัวข้อของแต่ละส่วนในเว็บไซต์สาธารณะ (Figma: Public/Section Header)
 *
 * ปุ่มหรือลิงก์ด้านขวาใส่เป็น content ระหว่างแท็ก
 * ขึ้นบรรทัดใหม่ในหัวข้อใช้ &#10; ใน attribute title
 *
 * @example
 * <btfp-section-header eyebrow="ประกาศทุนที่เปิดรับ" heading="โอกาสทุนสำหรับโครงการ" description="...">
 *   <a routerLink="/grants">ดูประกาศทั้งหมด</a>
 * </btfp-section-header>
 */
@Component({
  selector: 'btfp-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-dark]': "theme() === 'dark'" },
  template: `
    <div class="min-w-0">
      @if (eyebrow()) {
        <p class="eyebrow">{{ eyebrow() }}</p>
      }
      <h2 class="title">{{ heading() }}</h2>
      @if (description()) {
        <p class="desc">{{ description() }}</p>
      }
    </div>
    <div class="action"><ng-content /></div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    @media (min-width: 768px) {
      :host {
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        gap: 24px;
      }
    }
    .eyebrow {
      margin: 0 0 8px;
      font-size: var(--p-typography-body-s-medium-size);
      font-weight: var(--p-typography-body-s-medium-weight);
      color: var(--p-action-link);
    }
    .title {
      font-size: clamp(28px, 3.2vw, 40px);
      font-weight: 700;
      line-height: 1.35;
      white-space: pre-line;
      color: var(--p-text-heading);
    }
    .desc {
      margin: 8px 0 0;
      font-size: var(--p-typography-body-size);
      color: var(--p-text-secondary);
    }
    .action {
      flex-shrink: 0;
    }
    .action:empty {
      display: none;
    }
    :host(.is-dark) .eyebrow {
      color: var(--p-blue-200);
    }
    :host(.is-dark) .title {
      color: var(--p-text-inverse);
    }
    :host(.is-dark) .desc {
      color: var(--p-text-on-dark);
    }
  `,
})
export class BtfpSectionHeader {
  readonly eyebrow = input<string>();
  readonly heading = input.required<string>();
  readonly description = input<string>();
  /** light = พื้นขาว, dark = พื้นน้ำเงินเข้ม */
  readonly theme = input<'light' | 'dark'>('light');
}
