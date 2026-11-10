import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Button } from 'primeng/button';
import { UiIcon } from '../icon/icon';

export type EmptyStateType = 'general' | 'no-results' | 'no-files' | 'error';

/**
 * p-empty-state : สถานะไม่พบข้อมูล (Figma: Empty State 13:3184)
 *
 * PrimeNG ไม่มี component นี้ จึงเขียนเองโดยใช้ p-button สำหรับปุ่ม
 *
 * type
 * - general     ยังไม่มีข้อมูลเลย
 * - no-results  ค้นหาหรือกรองแล้วไม่พบ
 * - no-files    ยังไม่มีไฟล์แนบ
 * - error       โหลดข้อมูลไม่สำเร็จ
 *
 * @example
 * <p-empty-state type="no-results" title="ไม่พบข้อเสนอที่ตรงกับเงื่อนไข"
 *   description="ลองเปลี่ยนคำค้นหรือล้างตัวกรอง" actionLabel="ล้างตัวกรองทั้งหมด" />
 */
@Component({
  selector: 'p-empty-state',
  imports: [Button, UiIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty__icon" [class]="'empty__icon--' + type()">
      <p-ui-icon [name]="iconName()" size="32" />
    </div>
    <h3 class="empty__title">{{ title() }}</h3>
    @if (description()) {
      <p class="empty__desc">{{ description() }}</p>
    }
    @if (actionLabel()) {
      <p-button [label]="actionLabel()!" [outlined]="type() !== 'general'" (onClick)="action.emit()" />
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 8px;
      padding: 48px 24px;
    }
    .empty__icon {
      display: grid;
      place-items: center;
      width: 64px;
      height: 64px;
      margin-bottom: 8px;
      border-radius: var(--p-radius-full);
      background: var(--p-info-bg);
      color: var(--p-icon-action);
    }
    .empty__icon--error {
      background: var(--p-danger-bg);
      color: var(--p-danger-text);
    }
    .empty__title {
      font-size: var(--p-typography-body-l-size);
    }
    .empty__desc {
      margin: 0 0 8px;
      max-width: 420px;
      color: var(--p-text-secondary);
    }
  `,
})
export class EmptyState {
  readonly type = input<EmptyStateType>('general');
  readonly title = input.required<string>();
  readonly description = input<string>();
  /** ข้อความปุ่ม ไม่ใส่ = ไม่มีปุ่ม */
  readonly actionLabel = input<string>();
  readonly action = output<void>();

  protected readonly iconName = computed(
    () =>
      ({
        general: 'pi-folder-open',
        'no-results': 'search-x',
        'no-files': 'file-x',
        error: 'pi-exclamation-triangle',
      })[this.type()],
  );
}
