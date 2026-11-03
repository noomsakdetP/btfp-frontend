import type { Meta, StoryObj } from '@storybook/angular-vite';
import { foundationImports, iconSizesTpl, iconsTpl } from './_shared';

const meta: Meta = {
  title: "Foundations/ไอคอน",
  id: 'foundations-icons',
  tags: ['autodocs'],
  decorators: [foundationImports],
  parameters: { backgrounds: { default: 'white' }, docs: { description: { component: `ไอคอน **Lucide** ชุดเดียวกับ Figma (\`icon/<หมวด>/<ชื่อ>\`) แสดงด้วย \`btfp-icon\` เส้นหนา 1.5 (16px ลงมา 1.25) ตั้งให้อัตโนมัติ สีตามข้อความรอบข้าง (\`currentColor\`)

\`\`\`html
<btfp-icon name="eye" size="16" />
\`\`\`

**เพิ่มไอคอนใหม่** import จาก \`lucide\` แล้วเพิ่มใน \`src/app/theme/icons.ts\`

\`\`\`ts
import { Eye } from 'lucide';
export const BTFP_ICONS = { eye: Eye, ... };
\`\`\`

ชื่อที่ Lucide v1 เปลี่ยน: \`trash-2\` เป็น \`trash\`, \`filter\` เป็น \`funnel\`, \`circle-help\` เป็น \`circle-question-mark\`, \`building-2\` เป็น \`building-complex\`, \`history\` เป็น \`rotate-ccw-clock\`, \`bold\` เป็น \`letter-b\`

ห้ามใช้ \`@lucide/angular\` (ไฟล์ใหญ่ 11MB ทำ Storybook build ไม่ผ่าน)` } } },
};
export default meta;

export const All: StoryObj = {
  name: "ไอคอนที่ลงทะเบียนแล้ว",
  render: () => ({ template: iconsTpl() }),
};

export const Sizes: StoryObj = {
  name: "ขนาด",
  parameters: { docs: { description: { story: `16 ในตาราง ปุ่ม S และข้อความ, 20 ในเมนูและปุ่ม M L, 24 หัวข้อ` } } },
  render: () => ({ template: iconSizesTpl() }),
};
