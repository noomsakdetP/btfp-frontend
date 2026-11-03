import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports } from './_shared';
import { tabsPlayground } from './_playground';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Navigation/Tabs",
  id: 'primeng-tabs',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Navigation/Tabs\`  
**PrimeNG:** [\`p-tabs\`](https://primeng.org/tabs)

**วิธีใช้** ทำข้อ 1 และ 2 ครั้งเดียวต่อหน้า แล้วใส่แท็กใน \`.html\` ได้กี่ที่ก็ได้

\`\`\`ts
// 1. import ด้านบนของไฟล์ .ts ของหน้า
import { Tabs, TabList, Tab } from 'primeng/tabs';

@Component({
  // 2. ใส่ในรายการ imports ของหน้า (ถ้ามีตัวอื่นอยู่แล้วให้ต่อท้าย)
  imports: [Tabs, TabList, Tab],
  templateUrl: './my-page.html',
})
export class MyPage {}
\`\`\`

3. ใส่แท็กในไฟล์ \`.html\` ตามตารางด้านล่าง หรือกด **Show code** ใต้ตัวอย่างแล้วกด **Copy code**

| Figma | ในโค้ด |
| --- | --- |
| Selected=false / true | \`<p-tabs value="1"><p-tablist><p-tab value="0">...</p-tab></p-tablist></p-tabs>\` |
| State=disabled | \`<p-tab [disabled]="true">\` |

ตัวอักษร 16px แท็บที่เลือกเป็น Medium สี action/primary เส้นใต้ 3px ในหน้าหุ่นจำลองใส่ \`value="1"\` เป็น attribute ธรรมดาได้
`),
};
export default meta;

/** ตัวแรกของหน้า Docs มีช่อง Controls ให้ลองเปลี่ยนค่า */
export const Playground: StoryObj = tabsPlayground;

export const Default: StoryObj = {
  name: "ตัวอย่าง",
  render: () => ({ template: `<p-tabs value="1"><p-tablist><p-tab value="0">ทุกประเภท (128)</p-tab><p-tab value="1">ทุนประเภท 1 (86)</p-tab><p-tab value="2">ทุนประเภท 2 (31)</p-tab><p-tab value="3" [disabled]="true">ทุนประเภท 3</p-tab></p-tablist></p-tabs>` }),
};
