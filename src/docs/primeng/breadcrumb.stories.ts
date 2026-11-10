import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Navigation/Breadcrumb",
  id: 'primeng-breadcrumb',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Navigation/Breadcrumb\`

หน้าหุ่นจำลองเขียนเป็น HTML ธรรมดา เพราะ \`p-breadcrumb\` ต้องส่งรายการผ่าน binding (\`[model]\`) ตอนต่อ API เปลี่ยนเป็น \`p-breadcrumb\` ได้

ตัวอักษร 14px สี text/secondary หน้าปัจจุบันสี text/primary ตัวคั่นเป็นไอคอน \`chevron-right\` 16px ใส่ \`aria-current="page"\` ที่หน้าปัจจุบัน`),
};
export default meta;

export const Default: StoryObj = {
  name: "ตัวอย่าง",
  render: () => ({ template: `<nav aria-label="เส้นทาง" class="p-text-body-s" style="display:flex;align-items:center;gap:8px;color:var(--p-text-secondary)"><a href="#" style="color:inherit;text-decoration:none">หน้าหลัก</a><p-ui-icon name="pi-chevron-right" size="16" /><a href="#" style="color:inherit;text-decoration:none">รายการทุน</a><p-ui-icon name="pi-chevron-right" size="16" /><span aria-current="page" style="color:var(--p-text-primary)">รายละเอียดโครงการ</span></nav>` }),
};
