import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports, rowOf } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Feedback/Tooltip",
  id: 'primeng-tooltip',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Feedback/Tooltip\`  
**PrimeNG:** [\`p-tooltip\`](https://primeng.org/tooltip)

\`\`\`ts
import { Tooltip } from 'primeng/tooltip';
\`\`\`

| Figma | ในโค้ด |
| --- | --- |
| Position=top / right / bottom / left | \`pTooltip="ข้อความ" tooltipPosition="top"\` |

พื้น navy/900 ตัวอักษร 12px ใช้กับปุ่มไอคอนทุกปุ่ม และข้อความในตารางที่ถูกตัด (ใช้ \`title\` ก็ได้)
`),
};
export default meta;

export const Positions: StoryObj = {
  name: "Position",
  parameters: { docs: { description: { story: `ชี้เมาส์ที่ปุ่มเพื่อดู` } } },
  render: () => ({ template: rowOf(`<p-button outlined severity="secondary" label="ด้านบน" pTooltip="ข้อมูลเพิ่มเติม" tooltipPosition="top" /><p-button outlined severity="secondary" label="ด้านขวา" pTooltip="ข้อมูลเพิ่มเติม" tooltipPosition="right" /><p-button outlined severity="secondary" label="ด้านล่าง" pTooltip="ข้อมูลเพิ่มเติม" tooltipPosition="bottom" />`) }),
};
