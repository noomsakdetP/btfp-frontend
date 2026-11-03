import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports, rowOf } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Data Display/Avatar",
  id: 'primeng-avatar',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`DataDisplay/Avatar\`  
**PrimeNG:** [\`p-avatar\`](https://primeng.org/avatar)

**วิธีใช้** ทำข้อ 1 และ 2 ครั้งเดียวต่อหน้า แล้วใส่แท็กใน \`.html\` ได้กี่ที่ก็ได้

\`\`\`ts
// 1. import ด้านบนของไฟล์ .ts ของหน้า
import { Avatar } from 'primeng/avatar';

@Component({
  // 2. ใส่ในรายการ imports ของหน้า (ถ้ามีตัวอื่นอยู่แล้วให้ต่อท้าย)
  imports: [Avatar],
  templateUrl: './my-page.html',
})
export class MyPage {}
\`\`\`

3. ใส่แท็กในไฟล์ \`.html\` ตามตารางด้านล่าง หรือกด **Show code** ใต้ตัวอย่างแล้วกด **Copy code**

| Figma | ในโค้ด |
| --- | --- |
| Type=initials | \`<p-avatar label="กท" shape="circle" />\` |
| Type=image | \`<p-avatar image="..." shape="circle" />\` |
| Size=S / M / L | ค่าเริ่มต้น 32px / \`size="large"\` 40px / \`size="xlarge"\` 48px |
`),
};
export default meta;

export const Sizes: StoryObj = {
  name: "Size",
  render: () => ({ template: rowOf(`<p-avatar label="กท" shape="circle" /><p-avatar label="กท" shape="circle" size="large" /><p-avatar label="กท" shape="circle" size="xlarge" />`) }),
};
