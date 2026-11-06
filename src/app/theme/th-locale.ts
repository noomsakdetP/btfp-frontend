import { Translation } from 'primeng/api';

/** ข้อความภาษาไทยของ PrimeNG (ปฏิทิน, ตัวกรอง, ปุ่มระบบ) */
export const TH_LOCALE: Translation = {
  dayNames: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
  dayNamesShort: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
  dayNamesMin: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
  monthNames: [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
  ],
  monthNamesShort: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
  today: 'วันนี้',
  clear: 'ล้าง',
  weekHeader: 'สัปดาห์',
  firstDayOfWeek: 0,
  dateFormat: 'd M yy',
  emptyMessage: 'ไม่พบข้อมูล',
  emptyFilterMessage: 'ไม่พบข้อมูลที่ค้นหา',
  emptySearchMessage: 'ไม่พบข้อมูลที่ค้นหา',
  selectionMessage: 'เลือกแล้ว {0} รายการ',
  accept: 'ยืนยัน',
  reject: 'ยกเลิก',
  choose: 'เลือก',
  upload: 'อัปโหลด',
  cancel: 'ยกเลิก',
  noFilter: 'ไม่กรอง',
  aria: {
    close: 'ปิด',
    previousPageLabel: 'หน้าก่อนหน้า',
    nextPageLabel: 'หน้าถัดไป',
    firstPageLabel: 'หน้าแรก',
    lastPageLabel: 'หน้าสุดท้าย',
    rowsPerPageLabel: 'แถวต่อหน้า',
    pageLabel: 'หน้า {page}',
  },
};
