import { Directive, inject } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';

/** ปี พ.ศ. = ค.ศ. + 543 */
export const BE_OFFSET = 543;

/**
 * รูปแบบวันที่ของระบบ (รูปแบบราชการ) เช่น 1 ม.ค. 2569
 * ตามรูปแบบของ PrimeNG: d = วันไม่มี 0 นำหน้า, M = ชื่อเดือนย่อจาก TH_LOCALE, yy = ปี 4 หลัก
 */
export const BTFP_DATE_FORMAT = 'd M yy';

/** รูปแบบตัวเลขที่ผู้ใช้พิมพ์เองได้ เช่น 1/1/2569 หรือ 01/01/2569 */
const NUMERIC_INPUT = /^\s*\d{1,2}\/\d{1,2}\/\d{4}\s*$/;

/**
 * btfpBuddhistEra : ทำให้ p-datepicker แสดงปีเป็น พ.ศ.
 *
 * หลักการ
 * - ค่าที่เก็บในฟอร์ม (ngModel / FormControl) ยังเป็น Date ปกติ (ค.ศ.) ส่งให้ API ได้เลย ไม่ต้องแปลง
 * - แปลงเฉพาะสิ่งที่ผู้ใช้เห็น: ช่องกรอก, ปีบนหัวปฏิทิน, ตารางเลือกปี
 * - ผู้ใช้พิมพ์ปีเป็น พ.ศ. ได้ ทั้ง 15 มี.ค. 2569 และ 15/3/2569 ระบบจะแปลงกลับเป็น ค.ศ. ให้เอง
 *
 * ข้อจำกัดที่ทดสอบแล้วกับ PrimeNG 21.1
 * - ใช้กับ dateFormat ที่มีปี 4 หลัก (yy) เท่านั้น เช่น d M yy (ค่าเริ่มต้นของระบบ) หรือ dd/mm/yy
 * - directive นี้แทนที่ method ภายในของ DatePicker (formatDate, parseDate, getYear, yearPickerValues, onYearSelect)
 *   ถ้าอัปเกรด PrimeNG ต้องเปิด Storybook หน้า "Datepicker (พ.ศ.)" ทดสอบซ้ำทุกครั้ง
 *
 * ใช้ผ่าน <btfp-datepicker> ดีกว่าใส่ directive เอง
 */
@Directive({
  selector: 'p-datepicker[btfpBuddhistEra], p-datePicker[btfpBuddhistEra]',
})
export class BtfpBuddhistEra {
  // DatePicker ของ PrimeNG มี method เหล่านี้เป็น public แต่ไม่ได้ประกาศใน type ทุกตัว จึงต้องใช้ any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly dp = inject(DatePicker) as any;

  constructor() {
    const dp = this.dp;

    const formatDate = dp.formatDate.bind(dp);
    dp.formatDate = (date: Date, format: string): string => {
      const text: string = formatDate(date, format);
      if (!date) return text;
      const ce = String(date.getFullYear());
      return text.replace(ce, String(date.getFullYear() + BE_OFFSET));
    };

    const parseDate = dp.parseDate.bind(dp);
    dp.parseDate = (value: string, format: string): Date | null => {
      const ceText = (value ?? '').replace(/(\d{4})/, (_m, y: string) => String(Number(y) - BE_OFFSET));
      // ผู้ใช้พิมพ์เป็นตัวเลข เช่น 1/1/2569 ก็รับได้ แม้รูปแบบที่แสดงจะเป็นชื่อเดือน
      if (format !== 'd/m/yy' && NUMERIC_INPUT.test(ceText)) return parseDate(ceText.trim(), 'd/m/yy');
      return parseDate(ceText, format);
    };

    const getYear = dp.getYear.bind(dp);
    dp.getYear = (month: unknown): number => getYear(month) + BE_OFFSET;

    const yearPickerValues = dp.yearPickerValues.bind(dp);
    dp.yearPickerValues = (): number[] => yearPickerValues().map((y: number) => y + BE_OFFSET);

    const onYearSelect = dp.onYearSelect.bind(dp);
    dp.onYearSelect = (event: Event, year: number) => onYearSelect(event, year - BE_OFFSET);

    if (typeof dp.onYearCellKeydown === 'function') {
      const onYearCellKeydown = dp.onYearCellKeydown.bind(dp);
      dp.onYearCellKeydown = (event: Event, year: number) => onYearCellKeydown(event, year - BE_OFFSET);
    }
  }
}
