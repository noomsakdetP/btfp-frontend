import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Forms/Segmented Control",
  id: 'primeng-segmented',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Forms/Segmented Control\`  
**PrimeNG:** [\`p-selectbutton\`](https://primeng.org/selectbutton)

\`\`\`ts
import { SelectButton } from 'primeng/selectbutton';
\`\`\`

| Figma | ในโค้ด |
| --- | --- |
| Selected=first / second | \`<p-selectbutton [options]="..." [(ngModel)]="..." optionLabel="label" optionValue="value" [allowEmpty]="false" />\` |

ใช้สลับมุมมอง 2 ถึง 3 แบบ เช่น หน้าเข้าสู่ระบบ "สำหรับผู้ขอรับทุน / สำหรับเจ้าหน้าที่" กรอบและช่องว่างระหว่างตัวเลือกกำหนดใน \`styles.scss\`
`),
};
export default meta;

export const Default: StoryObj = {
  name: "ตัวอย่าง",
  args: { seg: 'applicant', segOptions: [{ label: 'สำหรับผู้ขอรับทุน', value: 'applicant' }, { label: 'สำหรับเจ้าหน้าที่', value: 'staff' }] },
  render: (args) => ({ props: args, template: `<p-selectbutton [options]="segOptions" [(ngModel)]="seg" optionLabel="label" optionValue="value" [allowEmpty]="false" />` }),
};
