import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { BtfpDatepicker } from './datepicker';

/** ตัวอย่างสำหรับทดสอบ: เห็นทั้งสิ่งที่ผู้ใช้เห็น (พ.ศ.) และค่าที่เก็บจริง (ค.ศ.) */
@Component({
  selector: 'btfp-datepicker-demo',
  imports: [BtfpDatepicker, FormsModule, DatePipe],
  template: `
    <div style="width:280px; display:flex; flex-direction:column; gap:12px; min-height:420px">
      <label for="demo-date" style="font-weight:500">วันที่ยื่น</label>
      <btfp-datepicker inputId="demo-date" [(ngModel)]="value" />
      <div style="font-size:13px; color:#475569; line-height:1.8">
        ค่าที่เก็บในฟอร์ม (ส่ง API):<br />
        <code>{{ value() ? (value() | date: 'yyyy-MM-dd') : 'ยังไม่ได้เลือก' }}</code>
      </div>
    </div>
  `,
})
class DatepickerDemo {
  readonly value = signal<Date | null>(new Date(2026, 2, 15));
}

const meta: Meta<DatepickerDemo> = {
  title: 'Components/Datepicker (พ.ศ.)',
  component: DatepickerDemo,
  parameters: {
    docs: {
      description: {
        component: [
          '`btfp-datepicker` ครอบ `p-datepicker` ของ PrimeNG ให้แสดงปีเป็น พ.ศ.',
          '',
          '- ผู้ใช้เห็นและพิมพ์ วว/ดด/ปปปป แบบ พ.ศ. เช่น 15/03/2569',
          '- ค่าใน ngModel / FormControl เป็น `Date` ปกติ (ค.ศ.) ส่ง API ได้เลย',
          '- หัวปฏิทินและตารางเลือกปีเป็น พ.ศ. ด้วย',
          '- ทดสอบกับ PrimeNG 21.1 แล้ว (เลือกวัน, พิมพ์วันที่, 29 ก.พ., เลือกปี) ถ้าอัปเกรด PrimeNG ให้ทดสอบหน้านี้ซ้ำ',
        ].join('\n'),
      },
    },
  },
};
export default meta;
export const Playground: StoryObj<DatepickerDemo> = { name: 'ทดลองใช้' };
