import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { BtfpIcon } from '../icon/icon';

export type BtfpRowAction = 'view' | 'edit' | 'delete';

/**
 * btfp-row-actions : ปุ่มจัดการท้ายแถวตาราง (Figma: Domain/Table Row Actions)
 *
 * กฎของระบบ
 * 1. ลำดับปุ่มต้องเป็น ดู แก้ไข ลบ เสมอ (ส่งมาลำดับไหนก็จะเรียงให้ใหม่)
 * 2. ลบ ต้องเปิดป๊อปอัปยืนยันก่อนทุกครั้ง (component นี้เปิดให้เอง ส่ง event delete หลังผู้ใช้กดยืนยันเท่านั้น)
 *
 * @example
 * <btfp-row-actions actions="view,edit,delete" itemLabel="2569/0042" (view)="..." (delete)="..." />
 */
@Component({
  selector: 'btfp-row-actions',
  imports: [Button, Tooltip, BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (action of orderedActions(); track action) {
      @switch (action) {
        @case ('view') {
          <p-button [text]="true" severity="secondary" size="small" ariaLabel="ดูรายละเอียด" pTooltip="ดูรายละเอียด" tooltipPosition="top" (onClick)="view.emit()">
            <ng-template #icon><btfp-icon name="eye" size="18" /></ng-template>
          </p-button>
        }
        @case ('edit') {
          <p-button [text]="true" severity="secondary" size="small" ariaLabel="แก้ไข" pTooltip="แก้ไข" tooltipPosition="top" (onClick)="edit.emit()">
            <ng-template #icon><btfp-icon name="pencil" size="18" /></ng-template>
          </p-button>
        }
        @case ('delete') {
          <p-button [text]="true" severity="danger" size="small" ariaLabel="ลบ" pTooltip="ลบ" tooltipPosition="top" (onClick)="confirmDelete()">
            <ng-template #icon><btfp-icon name="trash" size="18" /></ng-template>
          </p-button>
        }
      }
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
    }
    :host ::ng-deep .p-button {
      width: 32px;
      height: 32px;
      padding: 0;
    }
  `,
})
export class BtfpRowActions {
  private readonly confirmation = inject(ConfirmationService);

  /** ปุ่มที่จะแสดง คั่นด้วยจุลภาค เช่น "view" หรือ "view,edit,delete" */
  readonly actions = input<string>('view,edit,delete');
  /** ชื่อรายการที่จะแสดงในป๊อปอัปยืนยันการลบ */
  readonly itemLabel = input<string>('รายการนี้');

  readonly view = output<void>();
  readonly edit = output<void>();
  readonly delete = output<void>();

  private static readonly ORDER: BtfpRowAction[] = ['view', 'edit', 'delete'];

  protected readonly orderedActions = computed(() => {
    const wanted = this.actions().split(',').map((a) => a.trim());
    return BtfpRowActions.ORDER.filter((a) => wanted.includes(a));
  });

  protected confirmDelete(): void {
    this.confirmation.confirm({
      header: 'ยืนยันการลบ',
      message: `ต้องการลบ ${this.itemLabel()} ใช่หรือไม่ ลบแล้วจะกู้คืนไม่ได้`,
      acceptLabel: 'ลบ',
      rejectLabel: 'ยกเลิก',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', outlined: true },
      accept: () => this.delete.emit(),
    });
  }
}
