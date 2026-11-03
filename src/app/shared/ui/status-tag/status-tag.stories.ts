import type { Meta, StoryObj } from '@storybook/angular-vite';
import { BTFP_STATUS, BtfpStatusTag } from './status-tag';

const STATUSES = Object.keys(BTFP_STATUS);

const meta: Meta<BtfpStatusTag> = {
  title: 'Components/Status Tag',
  component: BtfpStatusTag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ป้ายสถานะ (Figma: Domain/Status Badge) ใส่ `status` อย่างเดียวได้สี ไอคอน และข้อความตาม Figma ครบ 14 สถานะ ไม่ต้องเลือกสีเอง ถ้าเป็นป้ายอื่นใส่ `severity` + `icon` + ข้อความเอง',
      },
    },
  },
  argTypes: {
    status: { control: 'select', options: STATUSES },
    severity: { control: 'select', options: [undefined, 'info', 'success', 'warn', 'danger', 'secondary', 'navy', 'teal', 'orange'] },
    icon: { control: 'text' },
  },
  args: { status: 'review' },
  render: (args) => ({
    props: args,
    template: `<btfp-status-tag [status]="status" [severity]="severity" [icon]="icon" />`,
  }),
};
export default meta;
type Story = StoryObj<BtfpStatusTag>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  name: 'ครบ 14 สถานะ',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:max-content max-content; gap:12px 24px; align-items:center">
        ${STATUSES.map(
          (s) => `<code style="font-size:12px;color:var(--btfp-text-secondary)">status="${s}"</code><span><btfp-status-tag status="${s}" /></span>`,
        ).join('')}
      </div>`,
  }),
};

export const Custom: Story = {
  name: 'ป้ายอื่น (กำหนดสีเอง)',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; flex-wrap:wrap">
        <btfp-status-tag severity="info" icon="info">info</btfp-status-tag>
        <btfp-status-tag severity="success" icon="circle-check">success</btfp-status-tag>
        <btfp-status-tag severity="warn" icon="triangle-alert">warn</btfp-status-tag>
        <btfp-status-tag severity="danger" icon="ban">danger</btfp-status-tag>
        <btfp-status-tag severity="secondary">secondary</btfp-status-tag>
        <btfp-status-tag severity="navy">navy</btfp-status-tag>
        <btfp-status-tag severity="teal">teal</btfp-status-tag>
        <btfp-status-tag severity="orange">orange</btfp-status-tag>
      </div>`,
  }),
};
