import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports, rowOf } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Actions/Icon Button",
  id: 'primeng-icon-button',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Actions/IconButton\`  
**PrimeNG:** [\`p-button\`](https://primeng.org/button)

\`\`\`ts
import { Button } from 'primeng/button';
\`\`\`

| Figma | ในโค้ด |
| --- | --- |
| Type=primary | \`<p-button ariaLabel="เพิ่ม">\` + ไอคอนใน \`#icon\` |
| Type=secondary | \`outlined severity="secondary"\` |
| Type=ghost | \`text\` |
| Size=S / M / L | \`size="small"\` 32x32 / ค่าเริ่มต้น 40x40 / \`size="large"\` 48x48 |

**วิธีใส่ไอคอน** ต้องอยู่ใน \`<ng-template #icon>\` PrimeNG จึงทำปุ่มเป็นสี่เหลี่ยมจัตุรัสตาม Figma ถ้าวางไอคอนตรง ๆ ปุ่มจะกว้างเกิน

\`\`\`html
<p-button text ariaLabel="ดูรายละเอียด" pTooltip="ดูรายละเอียด">
  <ng-template #icon><btfp-icon name="eye" size="16" /></ng-template>
</p-button>
\`\`\`

ต้องใส่ \`ariaLabel\` และ \`pTooltip\` ทุกครั้ง เพราะไม่มีข้อความบอกว่าปุ่มทำอะไร ไอคอนขนาด S ใช้ 16px M และ L ใช้ 20px
`),
};
export default meta;

export const Types: StoryObj = {
  name: "Type",
  render: () => ({ template: rowOf(`<p-button ariaLabel="เพิ่ม" pTooltip="เพิ่ม"><ng-template #icon><btfp-icon name="plus" size="20" /></ng-template></p-button><p-button outlined severity="secondary" ariaLabel="เพิ่ม" pTooltip="เพิ่ม"><ng-template #icon><btfp-icon name="plus" size="20" /></ng-template></p-button><p-button text ariaLabel="เพิ่ม" pTooltip="เพิ่ม"><ng-template #icon><btfp-icon name="plus" size="20" /></ng-template></p-button>`) }),
};

export const Sizes: StoryObj = {
  name: "Size",
  parameters: { docs: { description: { story: `S 32, M 40, L 48 px` } } },
  render: () => ({ template: rowOf(`<p-button size="small" outlined severity="secondary" ariaLabel="เพิ่ม"><ng-template #icon><btfp-icon name="plus" size="16" /></ng-template></p-button><p-button outlined severity="secondary" ariaLabel="เพิ่ม"><ng-template #icon><btfp-icon name="plus" size="20" /></ng-template></p-button><p-button size="large" outlined severity="secondary" ariaLabel="เพิ่ม"><ng-template #icon><btfp-icon name="plus" size="20" /></ng-template></p-button>`) }),
};
