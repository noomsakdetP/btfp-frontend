import type { Meta, StoryObj } from '@storybook/angular-vite';
import { foundationImports, TYPE, typeTpl } from './_shared';

const meta: Meta = {
  title: "Foundations/ตัวอักษร",
  id: 'foundations-typography',
  tags: ['autodocs'],
  decorators: [foundationImports],
  parameters: { backgrounds: { default: 'white' }, docs: { description: { component: `Text Styles จาก Figma 13 แบบ หัวข้อใช้ **IBM Plex Sans Thai** เนื้อหาใช้ **Sarabun** (โหลดจาก \`@fontsource\` ในโปรเจกต์ ไม่ใช้ Google Fonts)

ใส่ class ตามชื่อ Text Style ได้เลย กำหนดไว้ใน \`src/styles.scss\`

\`\`\`html
<h2 class="btfp-text-h2">ข้อเสนอโครงการ</h2>
<p class="btfp-text-body-s">ประกาศทุนประจำปีงบประมาณ 2569</p>
\`\`\`

| Figma | class |
| --- | --- |
| Typography/Display/XL, Display | \`.btfp-text-display-xl\`, \`.btfp-text-display\` |
| Typography/H1 ถึง H4 | \`.btfp-text-h1\` ถึง \`.btfp-text-h4\` |
| Typography/Body/L, Body, Body/Medium | \`.btfp-text-body-l\`, \`.btfp-text-body\`, \`.btfp-text-body-medium\` |
| Typography/Body/S, Body/S Medium | \`.btfp-text-body-s\`, \`.btfp-text-body-s-medium\` |
| Typography/Table, Caption | \`.btfp-text-table\`, \`.btfp-text-caption\` |

ข้อความบนหน้าจอห้ามใช้ "—" และ "•"` } } },
};
export default meta;

export const Headings: StoryObj = {
  name: "หัวข้อ",
  parameters: { docs: { description: { story: `IBM Plex Sans Thai` } } },
  render: () => ({ template: typeTpl(TYPE.slice(0, 6)) }),
};

export const Body: StoryObj = {
  name: "เนื้อหา",
  parameters: { docs: { description: { story: `Sarabun` } } },
  render: () => ({ template: typeTpl(TYPE.slice(6)) }),
};
