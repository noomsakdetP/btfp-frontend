import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';
import { BtfpIcon } from '../icon/icon';

/**
 * btfp-kpi-card : การ์ดตัวเลขสรุป (Figma: Domain/KPI Stat Card)
 *
 * ใช้เป็นตัวกรองขั้นตอนได้ด้วย ถ้า active จะมีเส้นขอบสีหลัก
 *
 * @example
 * <btfp-kpi-card label="2. ตรวจสอบคุณสมบัติ" value="24" caption="ส่งกลับแก้ไข 5 รายการ" icon="clipboard-check" active />
 */
@Component({
  selector: 'btfp-kpi-card',
  imports: [BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'button',
    tabindex: '0',
    '[class.is-active]': 'active()',
    '[attr.aria-pressed]': 'active()',
  },
  template: `
    <div class="kpi__top">
      <span class="kpi__label">{{ label() }}</span>
      @if (icon()) {
        <btfp-icon class="kpi__icon" [name]="icon()!" size="24" />
      }
    </div>
    <span class="kpi__value">{{ value() }}</span>
    <span class="kpi__caption">{{ caption() }}</span>
  `,
  styles: `
    :host {
      display: flex;
      scroll-snap-align: start;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
      padding: 24px;
      background: var(--btfp-surface-raised);
      border: 1px solid var(--btfp-border-default);
      border-radius: var(--btfp-radius-card);
      cursor: pointer;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    :host(:hover) {
      border-color: var(--btfp-border-strong);
    }
    :host(:focus-visible) {
      outline: 2px solid var(--btfp-focus-ring);
      outline-offset: 2px;
    }
    :host(.is-active) {
      border: 2px solid var(--btfp-action-primary);
      padding: 23px;
    }
    .kpi__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .kpi__label {
      font-size: 14px;
      color: var(--btfp-text-secondary);
    }
    .kpi__icon {
      color: var(--btfp-icon-action);
      flex-shrink: 0;
    }
    .kpi__value {
      font-family: var(--btfp-font-heading);
      font-size: 32px;
      font-weight: 600;
      line-height: 1.35;
      color: var(--btfp-text-heading);
    }
    .kpi__caption {
      font-size: 12px;
      color: var(--btfp-text-secondary);
    }
  `,
})
export class BtfpKpiCard {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly caption = input<string>('');
  readonly icon = input<string>();
  readonly active = input(false, { transform: booleanAttribute });
}
