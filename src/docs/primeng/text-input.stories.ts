import type { Meta, StoryObj } from '@storybook/angular-vite';
import { error, field, helper, primengParameters, primengStoryImports, rowOf } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Forms/Text Input และ Textarea",
  id: 'primeng-text-input',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Forms/TextInput, Forms/Textarea\`  
**PrimeNG:** [\`p-inputtext\`](https://primeng.org/inputtext)

\`\`\`ts
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
\`\`\`

| Figma | ในโค้ด |
| --- | --- |
| State=default / hover / focus | \`<input pInputText />\` สูง 40px ขอบซ้ายขวา 16px ตัวอักษร 16px |
| State=disabled | \`disabled\` |
| State=error | \`class="ng-invalid ng-dirty"\` (ฟอร์มจริงใส่ให้อัตโนมัติ) + \`.btfp-field__error\` |
| Textarea | \`<textarea pTextarea rows="3">\` |

**ป้ายชื่อ ข้อความช่วย ข้อความผิดพลาด** ครอบด้วย \`.btfp-field\` (กำหนดใน \`styles.scss\`)

\`\`\`html
<div class="btfp-field">
  <label for="name">ชื่อโครงการ<span class="btfp-required" aria-hidden="true">*</span></label>
  <input pInputText id="name" placeholder="กรอกชื่อโครงการ" />
  <p class="btfp-field__helper">กรอกข้อมูลให้ครบถ้วนตามเอกสาร</p>
</div>
\`\`\`

สถานะผิดพลาด: ฟอร์มจริงใส่ class \`ng-invalid ng-dirty\` ให้เอง แล้วแสดง \`<p class="btfp-field__error"><btfp-icon name="circle-alert" size="16" />ข้อความ</p>\` แทนข้อความช่วย
`),
};
export default meta;

export const States: StoryObj = {
  name: "State",
  render: () => ({ template: rowOf(`${field('ชื่อโครงการ', '<input pInputText placeholder="กรอกชื่อโครงการ" />', helper())}${field('ชื่อโครงการ (ผิดพลาด)', '<input pInputText placeholder="กรอกชื่อโครงการ" class="ng-invalid ng-dirty" />', error())}${field('ชื่อโครงการ (ปิดใช้งาน)', '<input pInputText placeholder="กรอกชื่อโครงการ" disabled />', helper())}`) }),
};

export const Textarea: StoryObj = {
  name: "Textarea",
  render: () => ({ template: field('หลักการและเหตุผล', '<textarea pTextarea rows="3" placeholder="อธิบายรายละเอียดโครงการ"></textarea>', helper()) }),
};
