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

### Design Token

Text Style ใน Figma ผูกกับ Variable แล้ว (ชนิดตัวอักษร ขนาด น้ำหนัก) ถ้าต้องปรับ เช่น ลูกค้าอยากได้หัวข้อใหญ่ขึ้น ให้แก้ Variable ใน Figma แล้วอัปเดตค่าเดียวกันใน \`src/styles/_tokens.scss\` ทุกหน้าที่ใช้ class หรือ token จะเปลี่ยนตาม

| ชั้น | Figma Variable | CSS variable |
| --- | --- | --- |
| primitives | font/family/sarabun, font/family/ibm-plex-sans-thai | \`--btfp-font-family-sarabun\` \`--btfp-font-family-ibm-plex-sans-thai\` |
| primitives | font/size/12 ถึง font/size/60 | \`--btfp-font-size-12\` ถึง \`--btfp-font-size-60\` |
| primitives | font/weight/regular, medium, semibold, bold | \`--btfp-font-weight-regular\` ถึง \`--btfp-font-weight-bold\` |
| semantic | font/family/heading, font/family/body | \`--btfp-font-heading\` \`--btfp-font-body\` |
| semantic | typography/&lt;ชื่อ&gt;/size, typography/&lt;ชื่อ&gt;/weight | \`--btfp-typography-h2-size\` \`--btfp-typography-h2-weight\` ฯลฯ |
| เฉพาะโค้ด | ไม่มี (Figma เก็บเป็น % ใน Text Style) | \`--btfp-line-height-heading\` 1.35, \`-body\` 1.6, \`-compact\` 1.5, \`-display-xl\` 1.2 |

ถ้าเขียน CSS ของ component เอง ให้ใช้ token ชั้น semantic ไม่ใส่ px ตรง ๆ

\`\`\`scss
.card-title {
  font-family: var(--btfp-font-heading);
  font-size: var(--btfp-typography-h3-size);
  font-weight: var(--btfp-typography-h3-weight);
}
\`\`\`

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
