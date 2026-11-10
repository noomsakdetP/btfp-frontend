import { Directive, OnInit, booleanAttribute, inject, input } from '@angular/core';
import { Drawer } from 'primeng/drawer';

/**
 * DrawerDefaults : ตั้งค่า p-drawer ของ PrimeNG ตามกฎของระบบ
 *
 * เกาะบนแท็ก p-drawer ทุกตัวในหน้าที่ import ไม่ต้องใส่ attribute เพิ่ม (imports: [Drawer, DrawerDefaults])
 * - กว้าง 480px บนจอ sm ขึ้นไป และเต็มจอบนมือถือ
 * - มีชั้นทับ ล็อกการเลื่อนหน้า ไม่ปิดเองเมื่อกดนอกแผงหรือกด Esc (ใส่ปุ่ม/ลิงก์ปิดเองในหัว Drawer)
 * - attribute open: เปิดค้างไว้ สำหรับหน้าหุ่นจำลองที่ห้ามมี binding
 *   (visible ของ PrimeNG รับ attribute ธรรมดาไม่ได้) ตอนต่อ API ใช้ [(visible)] ของ PrimeNG แทน
 *
 * หัวและแถบปุ่มด้านล่างใช้ ng-template ของ PrimeNG (#header, #footer)
 *
 * @example
 * <p-drawer open position="right">
 *   <ng-template #header>...</ng-template>
 *   ...
 *   <ng-template #footer>...</ng-template>
 * </p-drawer>
 */
@Directive({
  selector: 'p-drawer',
})
export class DrawerDefaults implements OnInit {
  /** ใส่ attribute open เพื่อเปิด Drawer ค้างไว้ (หน้าหุ่นจำลอง) */
  readonly open = input(false, { transform: booleanAttribute });

  // property เหล่านี้ของ PrimeNG 21 เป็น @Input แบบเดิม ตั้งค่าเริ่มต้นได้ และ attribute ในหน้าจะทับทีหลัง
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly drawer = inject(Drawer) as any;

  constructor() {
    const d = this.drawer;
    d.modal = true;
    d.blockScroll = true;
    d.closable = false;
    d.dismissible = false;
    d.closeOnEscape = false;
    d.styleClass = 'w-full sm:w-[480px]';
  }

  ngOnInit(): void {
    if (this.open()) this.drawer.visible = true;
  }
}
