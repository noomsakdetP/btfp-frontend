import type { Meta, StoryObj } from '@storybook/angular-vite';
import { BtfpKpiCard } from './kpi-card';

const meta: Meta<BtfpKpiCard> = {
  title: 'Components/KPI Card',
  component: BtfpKpiCard,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'การ์ดตัวเลขสรุป (Figma: Domain/KPI Stat Card) PrimeNG ไม่มี component นี้ จึงเขียนเอง' } },
  },
  args: { label: '2. ตรวจสอบคุณสมบัติ', value: '24', caption: 'ส่งกลับแก้ไข 5 รายการ', icon: 'clipboard-check', active: false },
  render: (args) => ({
    props: args,
    template: `<div style="width:300px"><btfp-kpi-card [label]="label" [value]="value" [caption]="caption" [icon]="icon" [active]="active" /></div>`,
  }),
};
export default meta;
type Story = StoryObj<BtfpKpiCard>;

export const Default: Story = { name: 'ปกติ' };
export const Active: Story = { name: 'เลือกอยู่', args: { active: true } };
export const WorkflowRow: Story = {
  name: 'แถวสรุป 5 ขั้นตอน',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    template: `
      <div class="grid snap-x auto-cols-[minmax(172px,1fr)] grid-flow-col gap-4 overflow-x-auto p-6">
        <btfp-kpi-card label="1. ยื่นเสนอโครงการ" value="12" caption="รอเจ้าหน้าที่รับเรื่อง" icon="send" />
        <btfp-kpi-card label="2. ตรวจสอบคุณสมบัติ" value="24" caption="ส่งกลับแก้ไข 5 รายการ" icon="clipboard-check" active />
        <btfp-kpi-card label="3. ตรวจโครงการเบื้องต้น" value="18" caption="รอความเห็นอนุกรรมการ" icon="list-checks" />
        <btfp-kpi-card label="4. สรุปสาระสำคัญ" value="9" caption="เสนอคณะกรรมการบริหารฯ" icon="file-text" />
        <btfp-kpi-card label="5. ผลการพิจารณา" value="23" caption="อนุมัติ 17 ไม่อนุมัติ 6" icon="circle-check" />
      </div>`,
  }),
};
