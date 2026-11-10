import type { Meta, StoryObj } from '@storybook/angular-vite';
import { error, field, helper, primengParameters, primengStoryImports, rowOf } from './_shared';
import { textInputPlayground } from './_playground';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Forms/Text Input และ Textarea",
  id: 'primeng-text-input',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Forms/TextInput, Forms/Textarea\`  
**PrimeNG:** [\`p-inputtext\`](https://primeng.org/inputtext)

**วิธีใช้** ทำข้อ 1 และ 2 ครั้งเดียวต่อหน้า แล้วใส่แท็กใน \`.html\` ได้กี่ที่ก็ได้

\`\`\`ts
// 1. import ด้านบนของไฟล์ .ts ของหน้า
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';

@Component({
  // 2. ใส่ในรายการ imports ของหน้า (ถ้ามีตัวอื่นอยู่แล้วให้ต่อท้าย)
  imports: [InputText, Textarea],
  templateUrl: './my-page.html',
})
export class MyPage {}
\`\`\`

3. ใส่แท็กในไฟล์ \`.html\` ตามตารางด้านล่าง หรือกด **Show code** ใต้ตัวอย่างแล้วกด **Copy code**

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

สถานะผิดพลาด: ฟอร์มจริงใส่ class \`ng-invalid ng-dirty\` ให้เอง แล้วแสดง \`<p class="btfp-field__error"><btfp-icon name="pi-exclamation-circle" size="16" />ข้อความ</p>\` แทนข้อความช่วย
`),
};
export default meta;

/** ตัวแรกของหน้า Docs มีช่อง Controls ให้ลองเปลี่ยนค่า */
export const Playground: StoryObj = textInputPlayground;

export const States: StoryObj = {
  name: "State",
  render: () => ({ template: rowOf(`${field('ชื่อโครงการ', '<input pInputText placeholder="กรอกชื่อโครงการ" />', helper())}${field('ชื่อโครงการ (ผิดพลาด)', '<input pInputText placeholder="กรอกชื่อโครงการ" class="ng-invalid ng-dirty" />', error())}${field('ชื่อโครงการ (ปิดใช้งาน)', '<input pInputText placeholder="กรอกชื่อโครงการ" disabled />', helper())}`) }),
};

export const Textarea: StoryObj = {
  name: "Textarea",
  render: () => ({ template: field('หลักการและเหตุผล', '<textarea pTextarea rows="3" placeholder="อธิบายรายละเอียดโครงการ"></textarea>', helper()) }),
};
