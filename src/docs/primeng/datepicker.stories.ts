import { Component, computed, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { DatePicker } from 'primeng-buddhist-year-datepicker';
import { DatePickerDefaults } from '../../app/shared/ui/datepicker/datepicker';
import { UiIcon } from '../../app/shared/ui/icon/icon';
import { error, helper, primengParameters } from './_shared';

/**
 * ตัวอย่างสำหรับทดสอบส่วนที่เราเพิ่ม (ปี พ.ศ.): เห็นทั้งสิ่งที่ผู้ใช้เห็นและค่าที่เก็บจริง (ค.ศ.)
 * ค่าที่รับเป็นข้อความ yyyy-mm-dd แบบ ค.ศ. เพื่อให้ปรับใน Controls ได้
 */
@Component({
  selector: 'p-datepicker-demo',
  imports: [DatePicker, DatePickerDefaults, FormsModule, DatePipe],
  template: `
    <div style="width:280px; display:flex; flex-direction:column; gap:8px; min-height:440px">
      <label for="demo-date" style="font-weight:500">{{ label() }}</label>
      <p-datepicker
        appendTo="body"
        inputId="demo-date"
        [disabled]="disabled()"
        [minDate]="minDate()"
        [maxDate]="maxDate()"
        [ngModel]="initialDate()"
        (ngModelChange)="picked.set($event)"
      />
      <div style="margin-top:8px; font-size:13px; color:var(--p-text-secondary); line-height:1.8">
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
  decorators: [moduleMetadata({ imports: [DatePicker, DatePickerDefaults, FormsModule, UiIcon] })],
  parameters: primengParameters(`**Figma:** \`Forms/DatePicker\` (หน้าตาตาม PrimeNG แผงปฏิทินดูได้ที่ \`DatePicker Panel\`)  
**แพ็กเกจ:** [\`primeng-buddhist-year-datepicker\`](https://github.com/Alexiserist/primeng-buddhist-datepicker) 21.0.2 (สำเนา \`p-datepicker\` ของ PrimeNG 21.0.6 ที่แสดงปี พ.ศ. ได้ ทีม dev ใช้อยู่แล้ว) + \`DatePickerDefaults\` ของเราตั้งค่าตามระบบ

เขียน \`<p-datepicker>\` แบบเอกสาร PrimeNG ได้เลย ไม่ต้องใส่ attribute เพิ่ม

- ผู้ใช้เห็นรูปแบบราชการ เช่น 1 ม.ค. 2569 (ปี พ.ศ.) พิมพ์เองได้ในรูปแบบเดียวกัน (1 ม.ค. 2569)
- ค่าใน ngModel / FormControl เป็น \`Date\` ปกติ (ค.ศ.) ส่ง API ได้เลย
- หัวปฏิทินและตารางเลือกปีเป็น พ.ศ. ด้วย
- \`DatePickerDefaults\` ตั้งค่าตามระบบให้: เปิดปี พ.ศ. (\`isBudhistYear\`) ไอคอนปฏิทินในช่อง ปุ่ม "วันนี้" และ "ล้าง" ข้อความ "เลือกวันที่" กว้างเต็มช่อง

**วิธีใช้**

\`\`\`ts
import { DatePicker } from 'primeng-buddhist-year-datepicker';   // ไม่ใช่ 'primeng/datepicker'
import { DatePickerDefaults } from '../../shared/ui';

@Component({ imports: [DatePicker, DatePickerDefaults] })
\`\`\`

| Figma | ในโค้ด |
| --- | --- |
| Mode=date | \`<p-datepicker appendTo="body" inputId="start" [(ngModel)]="startDate" />\` แสดง 1 ม.ค. 2569 |
| Mode=month | เพิ่ม \`view="month"\` แสดง ม.ค. 2569 (รูปแบบเปลี่ยนให้เอง) |
| Mode=month-range | เพิ่ม \`view="month" selectionMode="range"\` แสดง มี.ค. 2569 - มิ.ย. 2569 ค่าเป็น \`[Date, Date]\` |
| State=hover, focus | PrimeNG ทำให้เองเมื่อชี้หรือคลิก |
| State=open | กดที่ช่อง (ดูหน้าตาแผงในตัวอย่าง "แผงปฏิทิน" ด้านล่าง) |
| State=disabled | \`disabled\` หรือ \`[disabled]="true"\` |
| State=error | \`invalid\` (ฟอร์มจริงใส่ \`ng-invalid ng-dirty\` ให้เอง) + \`<p class="p-field__error">\` แทนข้อความช่วย |
| หน้าหุ่นจำลอง (ไม่มี binding) | \`<p-datepicker appendTo="body" inputId="start" />\` |

\`appendTo="body"\` ต้องใส่เองทุกครั้ง (PrimeNG ไม่ให้ตั้งจากโค้ด) ไม่งั้นปฏิทินโดนตัดเมื่ออยู่ใน Drawer หรือกล่องที่เลื่อนได้

**ข้อควรรู้ของแพ็กเกจ:** เป็นสำเนาโค้ดของ PrimeNG 21.0.6 บั๊กที่ PrimeNG แก้ในรุ่นหลังจะไม่มีจนกว่าเจ้าของแพ็กเกจจะอัปเดต รองรับ PrimeNG 21 เท่านั้น ถ้าอัปเกรด PrimeNG ต้องเช็กว่าแพ็กเกจมีรุ่นที่รองรับ แล้วเปิดตัวอย่างด้านล่างทดสอบซ้ำ (เลือกวัน พิมพ์วันที่ เปลี่ยนปี) อย่า import \`DatePicker\` จาก \`primeng/datepicker\` คู่กันในหน้าเดียวกัน เพราะใช้ชื่อแท็กเดียวกัน
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

/** ฟิลด์ตาม Figma: ป้ายชื่อ + ช่อง + ข้อความช่วยหรือข้อความผิดพลาด */
const dpField = (id: string, label: string, attrs: string, foot = helper('รองรับปีพุทธศักราช (พ.ศ.)')) =>
  `<div class="p-field" style="width:336px;max-width:100%"><label for="${id}">${label}<span class="p-required" aria-hidden="true">*</span></label><p-datepicker appendTo="body" inputId="${id}" ${attrs} />${foot}</div>`;

export const States: Story = {
  name: 'สถานะตาม Figma (State)',
  parameters: { docs: { description: { story: 'Figma: Forms/DatePicker State = default, disabled, error ส่วน hover, focus, open เกิดเองเมื่อใช้งาน' } } },
  render: () => ({
    props: { value: new Date(2026, 8, 29) },
    template: `<div style="display:flex;flex-wrap:wrap;gap:24px">
      ${dpField('st-empty', 'วันที่เริ่มโครงการ (ยังไม่เลือก)', '')}
      ${dpField('st-value', 'วันที่เริ่มโครงการ', '[(ngModel)]="value"')}
      ${dpField('st-disabled', 'วันที่เริ่มโครงการ (ปิดใช้งาน)', '[ngModel]="value" disabled')}
      ${dpField('st-error', 'วันที่เริ่มโครงการ (ผิดพลาด)', 'invalid', error())}
    </div>`,
  }),
};

export const Modes: Story = {
  name: 'Mode ตาม Figma (วัน เดือน ช่วงเดือน)',
  parameters: { docs: { description: { story: 'Figma: Forms/DatePicker Mode = date, month, month-range' } } },
  render: () => ({
    props: { day: new Date(2026, 8, 29), month: new Date(2026, 8, 1), range: [new Date(2026, 2, 1), new Date(2026, 5, 1)] },
    template: `<div style="display:flex;flex-wrap:wrap;gap:24px;min-height:120px">
      ${dpField('md-date', 'วันที่เริ่มโครงการ (date)', '[(ngModel)]="day"')}
      ${dpField('md-month', 'เดือนที่รายงาน (month)', 'view="month" [(ngModel)]="month"')}
      ${dpField('md-range', 'ช่วงเดือนที่รายงาน (month-range)', 'view="month" selectionMode="range" [(ngModel)]="range"')}
    </div>`,
  }),
};

export const Panels: Story = {
  name: 'แผงปฏิทิน (State=open)',
  parameters: { docs: { description: { story: 'Figma: DatePicker Panel View = date, month, month-range, year แสดงแบบ inline ให้เห็นหน้าตาแผงที่เปิดอยู่ กดปีที่หัวปฏิทินเพื่อไปหน้าเลือกปี' } } },
  render: () => ({
    props: { day: new Date(2026, 8, 29), month: new Date(2026, 8, 1), range: [new Date(2026, 2, 1), new Date(2026, 5, 1)], year: new Date(2026, 0, 1) },
    template: `<div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start">
      <div><p class="p-field__helper">View=date</p><p-datepicker [inline]="true" [(ngModel)]="day" /></div>
      <div><p class="p-field__helper">View=month</p><p-datepicker [inline]="true" view="month" [(ngModel)]="month" /></div>
      <div><p class="p-field__helper">View=month-range</p><p-datepicker [inline]="true" view="month" selectionMode="range" [(ngModel)]="range" /></div>
      <div><p class="p-field__helper">View=year</p><p-datepicker [inline]="true" view="year" [(ngModel)]="year" /></div>
    </div>`,
  }),
};
