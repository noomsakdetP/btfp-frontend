import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports, rowOf } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Data Display/Avatar",
  id: 'primeng-avatar',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`DataDisplay/Avatar\`  
**PrimeNG:** [\`p-avatar\`](https://primeng.org/avatar)

\`\`\`ts
import { Avatar } from 'primeng/avatar';
\`\`\`

| Figma | ในโค้ด |
| --- | --- |
| Type=initials | \`<p-avatar label="กท" shape="circle" />\` |
| Type=image | \`<p-avatar image="..." shape="circle" />\` |
| Size=S / M / L | ค่าเริ่มต้น 32px / \`size="large"\` 40px / \`size="xlarge"\` 48px |
`),
};
export default meta;

export const Sizes: StoryObj = {
  name: "Size",
  render: () => ({ template: rowOf(`<p-avatar label="กท" shape="circle" /><p-avatar label="กท" shape="circle" size="large" /><p-avatar label="กท" shape="circle" size="xlarge" />`) }),
};
