import type { Meta, StoryObj } from '@storybook/angular-vite';
import { BTFP_STATUS, StatusTag } from './status-tag';

const STATUSES = Object.keys(BTFP_STATUS);

const meta: Meta<StatusTag> = {
  title: 'Components/Data Display/Status Tag',
  component: StatusTag,
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
    template: `<p-status-tag [status]="status" [severity]="severity" [icon]="icon" />`,
  }),
};
export default meta;
type Story = StoryObj<StatusTag>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  name: 'ครบ 14 สถานะ',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:max-content max-content; gap:12px 24px; align-items:center">
        ${STATUSES.map(
          (s) => `<code style="font-size:12px;color:var(--p-text-secondary)">status="${s}"</code><span><p-status-tag status="${s}" /></span>`,
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
        <p-status-tag severity="info" icon="pi-info-circle">info</p-status-tag>
        <p-status-tag severity="success" icon="pi-check-circle">success</p-status-tag>
        <p-status-tag severity="warn" icon="pi-exclamation-triangle">warn</p-status-tag>
        <p-status-tag severity="danger" icon="pi-ban">danger</p-status-tag>
        <p-status-tag severity="secondary">secondary</p-status-tag>
        <p-status-tag severity="navy">navy</p-status-tag>
        <p-status-tag severity="teal">teal</p-status-tag>
        <p-status-tag severity="orange">orange</p-status-tag>
      </div>`,
  }),
};
