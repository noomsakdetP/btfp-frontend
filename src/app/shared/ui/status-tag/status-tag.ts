import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Tag } from 'primeng/tag';
import { BtfpIcon } from '../icon/icon';

export type BtfpStatusSeverity = 'info' | 'success' | 'warn' | 'danger' | 'secondary';

/**
 * btfp-status-tag : ป้ายสถานะ (Figma: DataDisplay/Tag แบบมีไอคอน)
 *
 * สร้างบน p-tag ของ PrimeNG ใช้ชื่อ input แบบเดียวกับ PrimeNG (severity)
 * ข้อความสถานะใส่เป็น content ระหว่างแท็กได้เลย
 *
 * @example
 * <btfp-status-tag severity="info" icon="hourglass">รอการพิจารณา</btfp-status-tag>
 */
@Component({
  selector: 'btfp-status-tag',
  imports: [Tag, BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-tag [severity]="severity()" [rounded]="true" [styleClass]="tagClass()">
      @if (icon()) {
        <btfp-icon [name]="icon()!" size="14" />
      }
      <span class="btfp-status-tag__label"><ng-content /></span>
    </p-tag>
  `,
  styles: `
    :host {
      display: inline-flex;
      max-width: 100%;
    }
    :host ::ng-deep .p-tag {
      border: 1px solid transparent;
      white-space: nowrap;
      max-width: 100%;
    }
    :host ::ng-deep .btfp-status-tag--info { border-color: var(--btfp-info-border); }
    :host ::ng-deep .btfp-status-tag--success { border-color: var(--btfp-success-border); }
    :host ::ng-deep .btfp-status-tag--warn { border-color: var(--btfp-warning-border); }
    :host ::ng-deep .btfp-status-tag--danger { border-color: var(--btfp-danger-border); }
    :host ::ng-deep .btfp-status-tag--secondary { border-color: var(--btfp-border-default); }
    .btfp-status-tag__label {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
})
export class BtfpStatusTag {
  /** สีของป้าย: info ฟ้า, success เขียว, warn เหลือง, danger แดง, secondary เทา */
  readonly severity = input<BtfpStatusSeverity>('info');
  /** ชื่อไอคอน Lucide (kebab-case) ไม่ใส่ก็ได้ */
  readonly icon = input<string>();

  protected readonly tagClass = computed(() => `btfp-status-tag--${this.severity()}`);
}
