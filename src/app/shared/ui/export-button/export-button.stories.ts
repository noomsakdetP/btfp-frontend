import type { Meta, StoryObj } from '@storybook/angular-vite';
import { ExportButton } from './export-button';

const meta: Meta<ExportButton> = {
  title: 'Components/Actions/Export Button',
  component: ExportButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ปุ่มส่งออกพร้อมเมนูรูปแบบไฟล์ (Figma: Actions/Export Menu Button) ใช้ตัวเดียวทั้งระบบเพื่อให้ตัวเลือกเหมือนกันทุกหน้า สร้างจาก `p-button` + `p-menu` ของ PrimeNG',
      },
    },
  },
  render: (args) => ({
    props: { ...args, onExport: (f: string) => console.log('export', f) },
    template: `<div style="height:180px"><p-export-button [label]="label" (export)="onExport($event)" /></div>`,
  }),
  args: { label: 'ส่งออก' },
};
export default meta;
export const Default: StoryObj<ExportButton> = { name: 'ปกติ' };
