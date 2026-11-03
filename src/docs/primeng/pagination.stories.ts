import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Navigation/Pagination",
  id: 'primeng-pagination',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Navigation/Pagination\`  
**PrimeNG:** [\`p-paginator\`](https://primeng.org/paginator)

**วิธีใช้** ทำข้อ 1 และ 2 ครั้งเดียวต่อหน้า แล้วใส่แท็กใน \`.html\` ได้กี่ที่ก็ได้

\`\`\`ts
// 1. import ด้านบนของไฟล์ .ts ของหน้า
import { Paginator } from 'primeng/paginator';

@Component({
  // 2. ใส่ในรายการ imports ของหน้า (ถ้ามีตัวอื่นอยู่แล้วให้ต่อท้าย)
  imports: [Paginator],
  templateUrl: './my-page.html',
})
export class MyPage {}
\`\`\`

3. ใส่แท็กในไฟล์ \`.html\` ตามตารางด้านล่าง หรือกด **Show code** ใต้ตัวอย่างแล้วกด **Copy code**

| Figma | ในโค้ด |
| --- | --- |
| Layout=desktop | \`<p-paginator [rows]="10" [totalRecords]="..." [showFirstLastIcon]="false" />\` |
| PaginationItem State=current | หน้าปัจจุบันพื้น primary ตัวอักษรขาว |

ปุ่ม 32px มุม 8px ในหน้าหุ่นจำลองใส่เป็น attribute ได้ \`rows="10" totalRecords="24" showFirstLastIcon="false"\`
`),
};
export default meta;

export const Default: StoryObj = {
  name: "ตัวอย่าง",
  render: () => ({ template: `<p-paginator [rows]="10" [totalRecords]="120" [showFirstLastIcon]="false" />` }),
};
