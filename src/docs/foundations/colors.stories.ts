import type { Meta, StoryObj } from '@storybook/angular-vite';
import { foundationImports, feedbackTpl, primitivesTpl, semanticTpl } from './_shared';

const meta: Meta = {
  title: "Foundations/สี",
  id: 'foundations-colors',
  tags: ['autodocs'],
  decorators: [foundationImports],
  parameters: { backgrounds: { default: 'white' }, docs: { description: { component: `ค่าสีจาก Figma Variables 3 ชั้น ใช้ผ่าน CSS variable จาก \`src/styles/_tokens.scss\` เท่านั้น **ห้ามใส่รหัสสีตรง**

| ชั้น | Figma collection | ตัวอย่างในโค้ด | ใช้เมื่อ |
| --- | --- | --- | --- |
| Primitive | \`primitives\` (color/blue/600) | \`--btfp-blue-600\` | ไม่ควรใช้ตรง ๆ ยกเว้นไม่มี semantic ที่ตรงความหมาย |
| Semantic | \`semantic\` (color/action/primary) | \`--btfp-action-primary\` | ใช้เป็นหลักในหน้าจอและ component |
| Component | \`component\` (input/border/focus) | \`--btfp-input-border-focus\` | ค่าเฉพาะ component |

\`\`\`scss
.my-card {
  background: var(--btfp-surface-raised);
  border: 1px solid var(--btfp-border-default);
  color: var(--btfp-text-primary);
}
\`\`\`

ใน Figma ชื่อ \`cool-gray\` ในโค้ดใช้ชื่อ \`gray\` ส่วนสีของ PrimeNG ตั้งไว้ใน \`src/app/theme/btfp-preset.ts\` ค่าที่แสดงด้านล่างอ่านจาก browser จริง` } } },
};
export default meta;

export const Semantic: StoryObj = {
  name: "Semantic",
  parameters: { docs: { description: { story: `ความหมายของสี ใช้กลุ่มนี้ในหน้าจอและ component ตัวสีฟ้าใต้ชื่อคือสี primitive ที่อ้างถึง` } } },
  render: () => ({ template: semanticTpl() }),
};

export const Feedback: StoryObj = {
  name: "Feedback",
  parameters: { docs: { description: { story: `สถานะสำเร็จ เตือน ผิดพลาด ข้อมูล แต่ละแบบมีพื้น ข้อความ เส้นขอบ (ป้ายสถานะ 14 แบบใช้ \`btfp-status-tag\`)` } } },
  render: () => ({ template: feedbackTpl() }),
};

export const Primitives: StoryObj = {
  name: "Primitives",
  parameters: { docs: { description: { story: `ชุดสีพื้นฐาน 8 ชุด ชุดละ 10 ระดับ` } } },
  render: () => ({ template: primitivesTpl() }),
};
