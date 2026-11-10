import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports, rowOf } from './_shared';
import { tagPlayground } from './_playground';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Data Display/Tag และ Chip",
  id: 'primeng-tag',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`DataDisplay/Tag\`  
**PrimeNG:** [\`p-tag\`](https://primeng.org/tag)

**วิธีใช้** ทำข้อ 1 และ 2 ครั้งเดียวต่อหน้า แล้วใส่แท็กใน \`.html\` ได้กี่ที่ก็ได้

\`\`\`ts
// 1. import ด้านบนของไฟล์ .ts ของหน้า
import { Tag } from 'primeng/tag';
import { Chip } from 'primeng/chip';

@Component({
  // 2. ใส่ในรายการ imports ของหน้า (ถ้ามีตัวอื่นอยู่แล้วให้ต่อท้าย)
  imports: [Tag, Chip],
  templateUrl: './my-page.html',
})
export class MyPage {}
\`\`\`

3. ใส่แท็กในไฟล์ \`.html\` ตามตารางด้านล่าง หรือกด **Show code** ใต้ตัวอย่างแล้วกด **Copy code**

| Figma | ในโค้ด |
| --- | --- |
| Tone=neutral | \`<p-tag severity="secondary" value="ทุนประเภท 1" />\` |
| Tone=info / success / warning / danger | \`severity="info"\` / \`"success"\` / \`"warn"\` / \`"danger"\` |
| ตัวกรองที่ใช้อยู่ (Tag + ปุ่มลบ) | \`<p-chip label="..." removable>\` + \`<ng-template #removeicon><p-ui-icon name="pi-times" size="14" /></ng-template>\` |

ป้าย**สถานะ** 14 แบบของข้อเสนอโครงการไม่ใช้ \`p-tag\` ให้ใช้ \`p-status-tag\` (ดู Components > Data Display > Status Tag)
`),
};
export default meta;

/** ตัวแรกของหน้า Docs มีช่อง Controls ให้ลองเปลี่ยนค่า */
export const Playground: StoryObj = tagPlayground;

export const Tones: StoryObj = {
  name: "Tone",
  render: () => ({ template: rowOf(`<p-tag severity="secondary" value="ทุนประเภท 1" /><p-tag severity="info" value="ทุนประเภท 1" /><p-tag severity="success" value="ทุนประเภท 1" /><p-tag severity="warn" value="ทุนประเภท 1" /><p-tag severity="danger" value="ทุนประเภท 1" />`) }),
};

export const Chip: StoryObj = {
  name: "ตัวกรองที่ใช้อยู่ (p-chip)",
  render: () => ({ template: rowOf(`<span style="font-size:14px;color:var(--p-text-secondary)">ตัวกรองที่ใช้:</span><p-chip label="ทุนประเภท 1" [removable]="true"><ng-template #removeicon><p-ui-icon name="pi-times" size="14" /></ng-template></p-chip><p-chip label="ปีงบ 2569" [removable]="true"><ng-template #removeicon><p-ui-icon name="pi-times" size="14" /></ng-template></p-chip>`) }),
};
