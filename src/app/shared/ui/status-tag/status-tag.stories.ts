import type { Meta, StoryObj } from '@storybook/angular-vite';
import { BtfpStatusTag } from './status-tag';

const meta: Meta<BtfpStatusTag> = {
  title: 'Components/Status Tag',
  component: BtfpStatusTag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ป้ายสถานะ สร้างบน `p-tag` ของ PrimeNG (Figma: DataDisplay/Tag) ข้อความใส่ระหว่างแท็ก ไอคอนใช้ชื่อ Lucide แบบ kebab-case',
      },
    },
  },
  argTypes: {
    severity: { control: 'select', options: ['info', 'success', 'warn', 'danger', 'secondary'] },
    icon: { control: 'text' },
  },
  args: { severity: 'info', icon: 'hourglass' },
  render: (args) => ({
    props: args,
    template: `<btfp-status-tag [severity]="severity" [icon]="icon">รอการพิจารณา</btfp-status-tag>`,
  }),
};
export default meta;
type Story = StoryObj<BtfpStatusTag>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  name: 'สถานะทั้งหมดในหน้า B-01',
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; flex-wrap:wrap">
        <btfp-status-tag severity="info" icon="send">ส่งแล้ว รอการตรวจสอบ</btfp-status-tag>
        <btfp-status-tag severity="info" icon="hourglass">รอการพิจารณา</btfp-status-tag>
        <btfp-status-tag severity="warn" icon="rotate-ccw">ไม่ผ่าน รอแก้ไข</btfp-status-tag>
        <btfp-status-tag severity="danger" icon="ban">ไม่ผ่านคุณสมบัติ</btfp-status-tag>
        <btfp-status-tag severity="success" icon="circle-check">อนุมัติ</btfp-status-tag>
        <btfp-status-tag severity="secondary">ฉบับร่าง</btfp-status-tag>
      </div>`,
  }),
};
