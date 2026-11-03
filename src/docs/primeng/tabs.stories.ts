import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Navigation/Tabs",
  id: 'primeng-tabs',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Navigation/Tabs\`  
**PrimeNG:** [\`p-tabs\`](https://primeng.org/tabs)

\`\`\`ts
import { Tabs, TabList, Tab } from 'primeng/tabs';
\`\`\`

| Figma | ในโค้ด |
| --- | --- |
| Selected=false / true | \`<p-tabs value="1"><p-tablist><p-tab value="0">...</p-tab></p-tablist></p-tabs>\` |
| State=disabled | \`<p-tab [disabled]="true">\` |

ตัวอักษร 16px แท็บที่เลือกเป็น Medium สี action/primary เส้นใต้ 3px ในหน้าหุ่นจำลองใส่ \`value="1"\` เป็น attribute ธรรมดาได้
`),
};
export default meta;

export const Default: StoryObj = {
  name: "ตัวอย่าง",
  render: () => ({ template: `<p-tabs value="1"><p-tablist><p-tab value="0">ทุกประเภท (128)</p-tab><p-tab value="1">ทุนประเภท 1 (86)</p-tab><p-tab value="2">ทุนประเภท 2 (31)</p-tab><p-tab value="3" [disabled]="true">ทุนประเภท 3</p-tab></p-tablist></p-tabs>` }),
};
