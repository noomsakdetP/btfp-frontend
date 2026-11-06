import { Directive, inject } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { BTFP_DATE_FORMAT, BtfpBuddhistEra } from './buddhist-era.directive';

/**
 * btfpDatepicker : ตั้งค่า p-datepicker ของ PrimeNG ตามกฎของระบบ (Figma: Forms/DatePicker 4:1571)
 *
 * ใช้ p-datepicker ของ PrimeNG ตรง ๆ แล้วใส่ attribute btfpDatepicker เพิ่ม
 * - แสดงปีเป็น พ.ศ. รูปแบบราชการ เช่น 1 ม.ค. 2569 (ผ่าน btfpBuddhistEra)
 * - ค่าใน ngModel / formControl เป็น Date ปกติ (ค.ศ.) ส่ง API ได้เลย
 * - พิมพ์เองได้ทั้ง 1 ม.ค. 2569 และ 1/1/2569
 * - ไอคอนปฏิทินในช่อง, ปุ่ม "วันนี้" และ "ล้าง", ข้อความ "เลือกวันที่", กว้างเต็มช่อง
 *
 * ค่าที่ directive ตั้งให้ ใส่ attribute ทับได้ เช่น placeholder="เลือกวันเริ่มต้น"
 * appendTo ต้องใส่เอง (PrimeNG ไม่ให้ตั้งจากโค้ด) แนะนำ appendTo="body" ทุกครั้ง
 *
 * @example
 * <p-datepicker btfpDatepicker appendTo="body" inputId="start" [(ngModel)]="startDate" />
 * <p-datepicker btfpDatepicker appendTo="body" formControlName="startDate" [minDate]="today" />
 */
@Directive({
  selector: 'p-datepicker[btfpDatepicker], p-datePicker[btfpDatepicker]',
  hostDirectives: [BtfpBuddhistEra],
})
export class BtfpDatepicker {
  constructor() {
    // property เหล่านี้ของ PrimeNG 21 เป็น @Input แบบเดิม ตั้งค่าเริ่มต้นได้ และ attribute ในหน้าจะทับทีหลัง
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dp = inject(DatePicker) as any;
    dp.dateFormat = BTFP_DATE_FORMAT;
    dp.placeholder = 'เลือกวันที่';
    dp.showIcon = true;
    dp.iconDisplay = 'input';
    dp.showButtonBar = true;
    dp.styleClass = 'w-full';
  }
}
