import { Component, computed, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DatePicker } from 'primeng/datepicker';
import { BtfpDatepicker } from '../../app/shared/ui/datepicker/datepicker';
import { primengParameters } from './_shared';

/**
 * ตัวอย่างสำหรับทดสอบส่วนที่เราเพิ่ม (ปี พ.ศ.): เห็นทั้งสิ่งที่ผู้ใช้เห็นและค่าที่เก็บจริง (ค.ศ.)
 * ค่าที่รับเป็นข้อความ yyyy-mm-dd แบบ ค.ศ. เพื่อให้ปรับใน Controls ได้
 */
@Component({
  selector: 'btfp-datepicker-demo',
  imports: [DatePicker, BtfpDatepicker, FormsModule, DatePipe],
  template: `
    <div style="width:280px; display:flex; flex-direction:column; gap:8px; min-height:440px">
      <label for="demo-date" style="font-weight:500">{{ label() }}</label>
      <p-datepicker
        btfpDatepicker
        appendTo="body"
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
  title: 'PrimeNG (ธีม กทปส.)/Forms/DatePicker',
  id: 'primeng-datepicker',
  component: DatepickerDemo,
  tags: ['autodocs'],
  parameters: primengParameters(`**Figma:** \`Forms/DatePicker\` (หน้าตาตาม PrimeNG แผงปฏิทินดูได้ที่ \`DatePicker Panel\`)  
**PrimeNG:** [\`p-datepicker\`](https://primeng.org/datepicker) + \`btfpDatepicker\` ของเรา

ใช้ \`p-datepicker\` ของ PrimeNG ตรง ๆ แล้วใส่ attribute \`btfpDatepicker\` เพิ่ม ส่วนที่เราเพิ่มจาก PrimeNG มีอย่างเดียวคือ **ปี พ.ศ.**

- ผู้ใช้เห็นรูปแบบราชการ เช่น 1 ม.ค. 2569 (ปี พ.ศ.) พิมพ์เองได้ทั้ง 1 ม.ค. 2569 และ 1/1/2569
- ค่าใน ngModel / FormControl เป็น \`Date\` ปกติ (ค.ศ.) ส่ง API ได้เลย
- หัวปฏิทินและตารางเลือกปีเป็น พ.ศ. ด้วย
- ตั้งค่าตามระบบให้: ไอคอนปฏิทินในช่อง ปุ่ม "วันนี้" และ "ล้าง" ข้อความ "เลือกวันที่" กว้างเต็มช่อง

**วิธีใช้**

\`\`\`ts
import { DatePicker } from 'primeng/datepicker';
import { BtfpDatepicker } from '../../shared/ui';

@Component({ imports: [DatePicker, BtfpDatepicker] })
\`\`\`

| Figma | ในโค้ด |
| --- | --- |
| Forms/DatePicker Mode=date | \`<p-datepicker btfpDatepicker appendTo="body" inputId="start" [(ngModel)]="startDate" />\` |
| State=disabled | \`[disabled]="true"\` |
| หน้าหุ่นจำลอง (ไม่มี binding) | \`<p-datepicker btfpDatepicker appendTo="body" inputId="start" />\` |

\`appendTo="body"\` ต้องใส่เองทุกครั้ง (PrimeNG ไม่ให้ตั้งจากโค้ด) ไม่งั้นปฏิทินโดนตัดเมื่ออยู่ใน Drawer หรือกล่องที่เลื่อนได้

**ทดสอบทุกครั้งที่อัปเกรด PrimeNG** \`btfpDatepicker\` แทนที่ method ภายในของ DatePicker (formatDate, parseDate, getYear, yearPickerValues, onYearSelect) เปิดตัวอย่างด้านล่างทุกตัว เลือกวัน พิมพ์วันที่ และเปลี่ยนปี ทดสอบกับ PrimeNG 21.1 แล้ว
`),
  argTypes: {
    initial: { control: 'text', description: 'ค่าเริ่มต้น yyyy-mm-dd (ค.ศ.)' },
    min: { control: 'text', description: 'minDate yyyy-mm-dd (ค.ศ.)' },
    max: { control: 'text', description: 'maxDate yyyy-mm-dd (ค.ศ.)' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<DatepickerDemo>;

export const Playground: Story = { name: 'ปี พ.ศ.: มีค่าแล้ว', args: { initial: '2026-03-15' } };
export const Empty: Story = { name: 'ปี พ.ศ.: ยังไม่เลือก', args: { label: 'วันที่ยื่น ตั้งแต่' } };
export const LeapDay: Story = { name: 'ปี พ.ศ.: วันที่ 29 ก.พ. 2567', args: { label: 'วันที่ทดสอบปีอธิกสุรทิน', initial: '2024-02-29' } };
export const MinMax: Story = {
  name: 'ปี พ.ศ.: จำกัดช่วงวันที่เลือกได้',
  args: { label: 'วันส่งมอบงวดงาน (มี.ค. 2569)', min: '2026-03-01', max: '2026-03-31', initial: '2026-03-10' },
};
export const Disabled: Story = { name: 'ปิดการใช้งาน', args: { initial: '2026-03-15', disabled: true } };
