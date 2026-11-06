import type { Meta, StoryObj } from '@storybook/angular-vite';
import { foundationImports, radiusTpl, shadowTpl, spacingTpl } from './_shared';

const meta: Meta = {
  title: "Foundations/ระยะ มุมโค้ง เงา",
  id: 'foundations-spacing',
  tags: ['autodocs'],
  decorators: [foundationImports],
  parameters: { backgrounds: { default: 'white' }, docs: { description: { component: `| กลุ่ม | ค่า | CSS variable |
| --- | --- | --- |
| Spacing | 4, 8, 16, 24, 32, 48, 64 px | \`--p-space-xs\` ถึง \`--p-space-3xl\` |
| Radius | input/tag 4, button/inner 8, card/modal 12, card-lg 16, full | \`--p-radius-*\` |
| Elevation | 3 ระดับ | \`--p-shadow-1\` ถึง \`--p-shadow-3\` |
| ขนาดปุ่มและช่องกรอก | S 32, M 40, L 48 px | \`--p-control-sm/md/lg\` |
| แถวตาราง | 56 px | \`--p-table-row\` |

Layout ในหน้าใช้ class ของ Tailwind (1 หน่วย = 4px เช่น \`gap-4\` = 16px \`p-6\` = 24px) ตรงกับ spacing ของ Figma` } } },
};
export default meta;

export const Spacing: StoryObj = {
  name: "Spacing",
  render: () => ({ template: spacingTpl() }),
};

export const Radius: StoryObj = {
  name: "Radius",
  render: () => ({ template: radiusTpl() }),
};

export const Elevation: StoryObj = {
  name: "Elevation",
  parameters: { docs: { description: { story: `Figma: Elevation/01 การ์ด, 02 dropdown และ popover, 03 modal และ drawer` } } },
  render: () => ({ template: shadowTpl() }),
};
