import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports, rowOf } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Actions/Button",
  id: 'primeng-button',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Actions/Button\`  
**PrimeNG:** [\`p-button\`](https://primeng.org/button)

\`\`\`ts
import { Button } from 'primeng/button';
\`\`\`

| Figma | ในโค้ด |
| --- | --- |
| Type=primary | \`<p-button label="บันทึก" />\` |
| Type=secondary | \`<p-button outlined severity="secondary" label="รายงาน" />\` |
| Type=tertiary | \`<p-button text label="ยกเลิก" />\` |
| Type=danger | \`<p-button severity="danger" label="ลบ" />\` (พื้นแดงอ่อนตาม Figma ไม่ใช่แดงทึบ) |
| Size=S / M / L | \`size="small"\` 32px / ค่าเริ่มต้น 40px / \`size="large"\` 48px |
| State=disabled / loading | \`disabled\` / \`loading\` |
| leading-icon | วาง \`<btfp-icon>\` ก่อนข้อความใน \`<p-button>\` ไอคอน 20px (Size S ใช้ 16px) |

**ข้อควรระวัง**

- ปุ่มรองต้องใส่ \`severity="secondary"\` คู่กับ \`outlined\` เสมอ ถ้าใส่ \`outlined\` อย่างเดียวจะเป็นขอบสีน้ำเงินซึ่งไม่มีใน Figma
- ปุ่ม Size S ใช้ตัวอักษร Regular 14 ส่วน M และ L ใช้ Medium 16 (ตั้งไว้ใน \`styles.scss\` แล้ว)
- ปุ่มที่มีแต่ไอคอนดูที่ Icon Button
`),
};
export default meta;

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
  render: () => ({ template: rowOf(`<p-button><btfp-icon name="plus" size="20" /><span>เพิ่มข้อเสนอ</span></p-button><p-button outlined severity="secondary"><btfp-icon name="chart-column" size="20" /><span>รายงาน</span></p-button><p-button size="small" outlined severity="secondary"><btfp-icon name="user-plus" size="16" /><span>มอบหมายเจ้าหน้าที่</span></p-button><p-button severity="danger"><btfp-icon name="trash" size="20" /><span>ลบรายการ</span></p-button>`) }),
};

export const States: StoryObj = {
  name: "State",
  parameters: { docs: { description: { story: `disabled และ loading` } } },
  render: () => ({ template: rowOf(`<p-button label="ดำเนินการ" disabled /><p-button outlined severity="secondary" label="ดำเนินการ" disabled /><p-button label="กำลังบันทึก" loading /><p-button outlined severity="secondary" label="กำลังโหลด" loading />`) }),
};
