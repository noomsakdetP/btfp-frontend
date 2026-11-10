import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports, rowOf } from './_shared';
import { buttonPlayground } from './_playground';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Actions/Button",
  id: 'primeng-button',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Actions/Button\`  
**PrimeNG:** [\`p-button\`](https://primeng.org/button)

**วิธีใช้** ทำข้อ 1 และ 2 ครั้งเดียวต่อหน้า แล้วใส่แท็กใน \`.html\` ได้กี่ที่ก็ได้

\`\`\`ts
// 1. import ด้านบนของไฟล์ .ts ของหน้า
import { Button } from 'primeng/button';

@Component({
  // 2. ใส่ในรายการ imports ของหน้า (ถ้ามีตัวอื่นอยู่แล้วให้ต่อท้าย)
  imports: [Button],
  templateUrl: './my-page.html',
})
export class MyPage {}
\`\`\`

3. ใส่แท็กในไฟล์ \`.html\` ตามตารางด้านล่าง หรือกด **Show code** ใต้ตัวอย่างแล้วกด **Copy code**

| Figma | ในโค้ด |
| --- | --- |
| Type=primary | \`<p-button label="บันทึก" />\` |
| Type=secondary | \`<p-button outlined severity="secondary" label="รายงาน" />\` |
| Type=tertiary | \`<p-button text label="ยกเลิก" />\` |
| Type=danger | \`<p-button severity="danger" label="ลบ" />\` (พื้นแดงอ่อนตาม Figma ไม่ใช่แดงทึบ) |
| Size=S / M / L | \`size="small"\` 32px / ค่าเริ่มต้น 40px / \`size="large"\` 48px |
| State=disabled / loading | \`disabled\` / \`loading\` |
| leading-icon | วาง \`<p-ui-icon>\` ก่อนข้อความใน \`<p-button>\` ไอคอน 20px (Size S ใช้ 16px) |

**ข้อควรระวัง**

- ปุ่มรองต้องใส่ \`severity="secondary"\` คู่กับ \`outlined\` เสมอ ถ้าใส่ \`outlined\` อย่างเดียวจะเป็นขอบสีน้ำเงินซึ่งไม่มีใน Figma
- ปุ่ม Size S ใช้ตัวอักษร Regular 14 ส่วน M และ L ใช้ Medium 16 (ตั้งไว้ใน \`styles.scss\` แล้ว)
- ปุ่มที่มีแต่ไอคอนดูที่ Icon Button
`),
};
export default meta;

/** ตัวแรกของหน้า Docs มีช่อง Controls ให้ลองเปลี่ยนค่า */
export const Playground: StoryObj = buttonPlayground;

export const Types: StoryObj = {
  name: "Type",
  parameters: { docs: { description: { story: `4 แบบตาม Figma` } } },
  render: () => ({ template: rowOf(`<p-button label="ดำเนินการ" /><p-button outlined severity="secondary" label="ดำเนินการ" /><p-button text label="ดำเนินการ" /><p-button severity="danger" label="ลบ" />`) }),
};

export const Sizes: StoryObj = {
  name: "Size",
  parameters: { docs: { description: { story: `S 32px, M 40px (ค่าเริ่มต้น), L 48px` } } },
  render: () => ({ template: rowOf(`<p-button size="small" label="ดำเนินการ" /><p-button label="ดำเนินการ" /><p-button size="large" label="ดำเนินการ" /><p-button size="small" outlined severity="secondary" label="ดำเนินการ" /><p-button outlined severity="secondary" label="ดำเนินการ" /><p-button size="large" outlined severity="secondary" label="ดำเนินการ" />`) }),
};

export const WithIcon: StoryObj = {
  name: "มีไอคอนนำหน้า",
  render: () => ({ template: rowOf(`<p-button><p-ui-icon name="pi-plus" size="20" /><span>เพิ่มข้อเสนอ</span></p-button><p-button outlined severity="secondary"><p-ui-icon name="pi-chart-bar" size="20" /><span>รายงาน</span></p-button><p-button size="small" outlined severity="secondary"><p-ui-icon name="pi-user-plus" size="16" /><span>มอบหมายเจ้าหน้าที่</span></p-button><p-button severity="danger"><p-ui-icon name="pi-trash" size="20" /><span>ลบรายการ</span></p-button>`) }),
};

export const States: StoryObj = {
  name: "State",
  parameters: { docs: { description: { story: `disabled และ loading` } } },
  render: () => ({ template: rowOf(`<p-button label="ดำเนินการ" disabled /><p-button outlined severity="secondary" label="ดำเนินการ" disabled /><p-button label="กำลังบันทึก" loading /><p-button outlined severity="secondary" label="กำลังโหลด" loading />`) }),
};
