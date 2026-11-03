import { Component, computed, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { BtfpDatepicker } from './datepicker';

/**
 * ตัวอย่างสำหรับทดสอบ: เห็นทั้งสิ่งที่ผู้ใช้เห็น (พ.ศ.) และค่าที่เก็บจริง (ค.ศ.)
 * ค่าที่รับเป็นข้อความ yyyy-mm-dd แบบ ค.ศ. เพื่อให้ปรับใน Controls ได้
 */
@Component({
  selector: 'btfp-datepicker-demo',
  imports: [BtfpDatepicker, FormsModule, DatePipe],
  template: `
    <div style="width:280px; display:flex; flex-direction:column; gap:8px; min-height:440px">
      <label for="demo-date" style="font-weight:500">{{ label() }}</label>
      <btfp-datepicker
        inputId="demo-date"
        [disabled]="disabled()"
        [minDate]="minDate()"
        [maxDate]="maxDate()"
        [ngModel]="initialDate()"
        (ngModelChange)="picked.set($event)"
      />
      <div style="margin-top:8px; font-size:13px; color:var(--btfp-text-secondary); line-height:1.8">
        ค่าที่เก็บในฟอร์ม (ค.ศ. ส่ง API):<br />
        <code>{{ value() ? (value() | date: 'yyyy-MM-dd') : 'ยังไม่ได้เลือก' }}</code>
      </div>
    </div>
  `,
})
class DatepickerDemo {
  readonly label = input('วันที่ยื่น');
  /** ค่าเริ่มต้น yyyy-mm-dd (ค.ศ.) เว้นว่าง = ยังไม่เลือก */
  readonly initial = input<string>();
  /** วันแรกที่เลือกได้ yyyy-mm-dd (ค.ศ.) */
  readonly min = input<string>();
  /** วันสุดท้ายที่เลือกได้ yyyy-mm-dd (ค.ศ.) */
  readonly max = input<string>();
  readonly disabled = input(false);

  // สร้าง Date ครั้งเดียวต่อค่า (ห้ามสร้างใน template ไม่งั้น change detection วนไม่จบ)
  protected readonly initialDate = computed(() => toDate(this.initial()));
  protected readonly minDate = computed(() => toDate(this.min()));
  protected readonly maxDate = computed(() => toDate(this.max()));
  protected readonly picked = signal<Date | null | undefined>(undefined);
  protected readonly value = computed(() => (this.picked() === undefined ? this.initialDate() : this.picked()));
}

function toDate(iso?: string): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

const meta: Meta<DatepickerDemo> = {
  title: 'Components/Forms/Datepicker (พ.ศ.)',
  // กำหนด id เป็นภาษาอังกฤษ ลิงก์ของ story จะได้ไม่มีอักษรไทย
  id: 'components-datepicker',
  component: DatepickerDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '`btfp-datepicker` ครอบ `p-datepicker` ของ PrimeNG ให้แสดงปีเป็น พ.ศ. (Figma: Forms/DatePicker)',
          '',
          '- ผู้ใช้เห็นและพิมพ์ วว/ดด/ปปปป แบบ พ.ศ. เช่น 15/03/2569',
          '- ค่าใน ngModel / FormControl เป็น `Date` ปกติ (ค.ศ.) ส่ง API ได้เลย',
          '- หัวปฏิทินและตารางเลือกปีเป็น พ.ศ. ด้วย',
          '- ทดสอบกับ PrimeNG 21.1 แล้ว (เลือกวัน, พิมพ์วันที่, 29 ก.พ., เลือกปี) ถ้าอัปเกรด PrimeNG ให้ทดสอบหน้านี้ซ้ำ',
          '',
          '```html',
          '<btfp-datepicker inputId="start" [(ngModel)]="startDate" />',
          '<btfp-datepicker formControlName="startDate" [minDate]="today" />',
          '```',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    initial: { control: 'text', description: 'ค่าเริ่มต้น yyyy-mm-dd (ค.ศ.)' },
    min: { control: 'text', description: 'minDate yyyy-mm-dd (ค.ศ.)' },
    max: { control: 'text', description: 'maxDate yyyy-mm-dd (ค.ศ.)' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<DatepickerDemo>;

export const Playground: Story = {
  name: 'มีค่าแล้ว',
  args: { initial: '2026-03-15' },
};

export const Empty: Story = {
  name: 'ยังไม่เลือก',
  args: { label: 'วันที่ยื่น ตั้งแต่' },
};

export const LeapDay: Story = {
  name: 'วันที่ 29 ก.พ. 2567',
  args: { label: 'วันที่ทดสอบปีอธิกสุรทิน', initial: '2024-02-29' },
};

export const MinMax: Story = {
  name: 'จำกัดช่วงวันที่เลือกได้',
  args: { label: 'วันส่งมอบงวดงาน (มี.ค. 2569)', min: '2026-03-01', max: '2026-03-31', initial: '2026-03-10' },
};

export const Disabled: Story = {
  name: 'ปิดการใช้งาน',
  args: { initial: '2026-03-15', disabled: true },
};
