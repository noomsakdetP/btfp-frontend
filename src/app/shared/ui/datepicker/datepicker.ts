import { Directive, OnInit, inject } from '@angular/core';
import { DatePicker } from 'primeng-buddhist-year-datepicker';

/**
 * รูปแบบวันที่ของระบบ (รูปแบบราชการ) เช่น 1 ม.ค. 2569
 * ตามรูปแบบของ PrimeNG: d = วันไม่มี 0 นำหน้า, M = ชื่อเดือนย่อจาก TH_LOCALE, yy = ปี 4 หลัก
 */
export const BTFP_DATE_FORMAT = 'd M yy';

/**
 * ค่าเริ่มต้นของช่องเลือกวันที่ตามกฎของระบบ (Figma: Forms/DatePicker)
 *
 * ใช้คู่กับ DatePicker จากแพ็กเกจ primeng-buddhist-year-datepicker (สำเนา DatePicker ของ PrimeNG ที่แสดงปี พ.ศ. ได้)
 * เกาะบนแท็ก p-datepicker ทุกตัวในหน้าที่ import ไม่ต้องใส่ attribute เพิ่ม เขียนแบบเอกสาร PrimeNG ได้เลย
 *
 * ค่าที่ตั้งให้ (ใส่ attribute ทับได้ เช่น placeholder="เลือกวันเริ่มต้น")
 * - isBudhistYear: แสดงปีเป็น พ.ศ. ค่าใน ngModel / FormControl ยังเป็น Date ค.ศ. ส่ง API ได้เลย
 * - dateFormat d M yy (1 ม.ค. 2569) เลือกเดือนเป็น M yy เลือกปีเป็น yy
 * - ไอคอนปฏิทินในช่อง ปุ่ม "วันนี้" และ "ล้าง" ข้อความ "เลือกวันที่" กว้างเต็มช่อง
 * appendTo ต้องใส่เองในหน้า (PrimeNG ไม่ให้ตั้งจากโค้ด) แนะนำ appendTo="body" ทุกครั้ง
 *
 * @example
 * imports: [DatePicker, DatePickerDefaults]   // DatePicker จาก 'primeng-buddhist-year-datepicker'
 * <p-datepicker appendTo="body" inputId="start" [(ngModel)]="startDate" />
 */
@Directive({
  selector: 'p-datepicker, p-datePicker, p-date-picker',
})
export class DatePickerDefaults implements OnInit {
  // property ของ DatePicker เป็น @Input แบบเดิม ตั้งค่าเริ่มต้นได้ และ attribute ในหน้าจะทับทีหลัง
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly dp = inject(DatePicker) as any;

  constructor() {
    const dp = this.dp;
    dp.isBudhistYear = true;
    dp.dateFormat = BTFP_DATE_FORMAT;
    dp.placeholder = 'เลือกวันที่';
    dp.showIcon = true;
    dp.iconDisplay = 'input';
    dp.showButtonBar = true;
    dp.styleClass = 'w-full';
  }

  ngOnInit(): void {
    const dp = this.dp;
    if (dp.dateFormat === BTFP_DATE_FORMAT) {
      if (dp.view === 'month') dp.dateFormat = 'M yy';
      if (dp.view === 'year') dp.dateFormat = 'yy';
    }
    if (dp.view !== 'date' && dp.placeholder === 'เลือกวันที่') dp.placeholder = dp.view === 'year' ? 'เลือกปี' : 'เลือกเดือน';
  }
}
