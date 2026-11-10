import type { Meta, StoryObj } from '@storybook/angular-vite';
import { OPTIONS, field, helper, primengParameters, primengStoryImports } from './_shared';
import { selectPlayground } from './_playground';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Forms/Select และ MultiSelect",
  id: 'primeng-select',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Forms/Select, Forms/MultiSelect\`  
**PrimeNG:** [\`p-select\`](https://primeng.org/select)

**วิธีใช้** ทำข้อ 1 และ 2 ครั้งเดียวต่อหน้า แล้วใส่แท็กใน \`.html\` ได้กี่ที่ก็ได้

\`\`\`ts
// 1. import ด้านบนของไฟล์ .ts ของหน้า
import { Select } from 'primeng/select';
import { MultiSelect } from 'primeng/multiselect';

@Component({
  // 2. ใส่ในรายการ imports ของหน้า (ถ้ามีตัวอื่นอยู่แล้วให้ต่อท้าย)
  imports: [Select, MultiSelect],
  templateUrl: './my-page.html',
})
export class MyPage {}
\`\`\`

3. ใส่แท็กในไฟล์ \`.html\` ตามตารางด้านล่าง หรือกด **Show code** ใต้ตัวอย่างแล้วกด **Copy code**

| Figma | ในโค้ด |
| --- | --- |
| Forms/Select | \`<p-select [options]="..." optionLabel="label" placeholder="เลือกประเภททุน" />\` |
| Forms/MultiSelect | \`<p-multiselect display="chip" ... />\` |
| State=disabled | \`[disabled]="true"\` (ทั้งชิ้นจาง 50% ตาม Figma ป้ายข้อความเป็นสี text/disabled) |
| หน้าหุ่นจำลอง (ไม่มี binding) | \`<p-select placeholder="2569" styleClass="p-mock-value" />\` ค่าที่ "เลือกไว้แล้ว" แสดงผ่าน placeholder |

ใน Drawer ให้ใส่ \`appendTo="body"\` ไม่งั้นรายการตัวเลือกจะโดนตัด

ไอคอนในช่องกรอก (ลูกศร ค้นหา ปฏิทิน วงหมุนตอนโหลด) ขนาด 16px ตาม Figma ตั้งไว้ใน \`styles.scss\` แล้ว (PrimeNG ตั้งไว้ 14px) ปุ่มลบในชิปคง 14px

**ป้ายชื่อ ข้อความช่วย ข้อความผิดพลาด** ครอบด้วย \`.p-field\` (กำหนดใน \`styles.scss\`)

\`\`\`html
<div class="p-field">
  <label for="name">ชื่อโครงการ<span class="p-required" aria-hidden="true">*</span></label>
  <input pInputText id="name" placeholder="กรอกชื่อโครงการ" />
  <p class="p-field__helper">กรอกข้อมูลให้ครบถ้วนตามเอกสาร</p>
</div>
\`\`\`

สถานะผิดพลาด: ฟอร์มจริงใส่ class \`ng-invalid ng-dirty\` ให้เอง แล้วแสดง \`<p class="p-field__error"><p-ui-icon name="pi-exclamation-circle" size="16" />ข้อความ</p>\` แทนข้อความช่วย
`),
};
export default meta;

/** ตัวแรกของหน้า Docs มีช่อง Controls ให้ลองเปลี่ยนค่า */
export const Playground: StoryObj = selectPlayground;

export const Select: StoryObj = {
  name: "Select",
  args: { options: OPTIONS, value: null },
  render: (args) => ({ props: args, template: `<div style="display:flex;flex-wrap:wrap;gap:24px">${field('ประเภททุน', '<p-select [options]="options" [(ngModel)]="value" optionLabel="label" optionValue="value" placeholder="เลือกประเภททุน" />', helper())}${field('ประเภททุน (ปิดใช้งาน)', '<p-select [options]="options" placeholder="เลือกประเภททุน" [disabled]="true" />', helper())}</div>` }),
};

export const MultiSelect: StoryObj = {
  name: "MultiSelect",
  args: { options: OPTIONS, value: [1, 2] },
  render: (args) => ({ props: args, template: field('ประเภททุน', '<p-multiselect [options]="options" [(ngModel)]="value" optionLabel="label" optionValue="value" display="chip" placeholder="เลือกประเภททุน" />', helper()) }),
};

export const Mock: StoryObj = {
  name: "หน้าหุ่นจำลอง",
  parameters: { docs: { description: { story: `ไม่มี binding ใช้ placeholder + \`p-mock-value\` แสดงค่าที่เลือกไว้` } } },
  render: () => ({ template: field('ปีงบประมาณ', '<p-select placeholder="2569" styleClass="p-mock-value" />', '', false) }),
};
