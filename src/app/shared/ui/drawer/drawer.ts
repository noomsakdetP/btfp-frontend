import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';
import { Drawer } from 'primeng/drawer';

/**
 * btfp-drawer : แผงเลื่อนจากขอบจอ สร้างบน p-drawer ของ PrimeNG
 *
 * ทำไมต้องห่อ: p-drawer รับ visible เป็น attribute ธรรมดาไม่ได้ (ต้องใช้ binding)
 * แต่หน้าแบบหุ่นจำลองต้องไม่มี binding จึงห่อให้รับ attribute "open" แทน
 *
 * ช่องใส่เนื้อหา
 * - [btfpDrawerHeader]  หัว Drawer (ใส่ปุ่ม/ลิงก์ปิดเอง เพราะปิดการปิดอัตโนมัติไว้)
 * - เนื้อหาหลัก         ใส่ตรง ๆ
 * - [btfpDrawerFooter]  แถบปุ่มด้านล่าง
 *
 * กว้าง 480px บนจอ sm ขึ้นไป และเต็มจอบนมือถือ
 *
 * @example
 * <btfp-drawer open>
 *   <div btfpDrawerHeader>...</div>
 *   ...
 *   <div btfpDrawerFooter>...</div>
 * </btfp-drawer>
 */
@Component({
  selector: 'btfp-drawer',
  imports: [Drawer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-drawer
      [visible]="open()"
      [position]="position()"
      [modal]="true"
      [blockScroll]="true"
      [closable]="false"
      [dismissible]="false"
      [closeOnEscape]="false"
      styleClass="w-full sm:w-[480px]"
    >
      <ng-template #header><ng-content select="[btfpDrawerHeader]" /></ng-template>
      <ng-content />
      <ng-template #footer><ng-content select="[btfpDrawerFooter]" /></ng-template>
    </p-drawer>
  `,
})
export class BtfpDrawer {
  /** ใส่ attribute open เพื่อแสดง Drawer */
  readonly open = input(false, { transform: booleanAttribute });
  readonly position = input<'left' | 'right' | 'top' | 'bottom'>('right');
}
