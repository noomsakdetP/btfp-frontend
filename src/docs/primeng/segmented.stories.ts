import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Forms/Segmented Control",
  id: 'primeng-segmented',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Forms/Segmented Control\`  
**PrimeNG:** [\`p-selectbutton\`](https://primeng.org/selectbutton)

**วิธีใช้** ทำข้อ 1 และ 2 ครั้งเดียวต่อหน้า แล้วใส่แท็กใน \`.html\` ได้กี่ที่ก็ได้

\`\`\`ts
// 1. import ด้านบนของไฟล์ .ts ของหน้า
import { SelectButton } from 'primeng/selectbutton';

@Component({
  // 2. ใส่ในรายการ imports ของหน้า (ถ้ามีตัวอื่นอยู่แล้วให้ต่อท้าย)
  imports: [SelectButton],
  templateUrl: './my-page.html',
})
export class MyPage {}
\`\`\`

3. ใส่แท็กในไฟล์ \`.html\` ตามตารางด้านล่าง หรือกด **Show code** ใต้ตัวอย่างแล้วกด **Copy code**

| Figma | ในโค้ด |
| --- | --- |
| Selected=first / second | \`<p-selectbutton [options]="..." [(ngModel)]="..." optionLabel="label" optionValue="value" [allowEmpty]="false" />\` |

ใช้สลับมุมมอง 2 ถึง 3 แบบ เช่น หน้าเข้าสู่ระบบ "สำหรับผู้ขอรับทุน / สำหรับเจ้าหน้าที่" กรอบและช่องว่างระหว่างตัวเลือกกำหนดใน \`styles.scss\`
`),
};
export default meta;

export const Default: StoryObj = {
  name: "ตัวอย่าง",
  args: { seg: 'applicant', segOptions: [{ label: 'สำหรับผู้ขอรับทุน', value: 'applicant' }, { label: 'สำหรับเจ้าหน้าที่', value: 'staff' }] },
  render: (args) => ({ props: args, template: `<p-selectbutton [options]="segOptions" [(ngModel)]="seg" optionLabel="label" optionValue="value" [allowEmpty]="false" />` }),
};
