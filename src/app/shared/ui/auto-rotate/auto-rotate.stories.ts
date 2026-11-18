import type { Meta, StoryObj } from '@storybook/angular-vite';
import { AutoRotate } from './auto-rotate';

const meta: Meta<AutoRotate> = {
  title: 'Components/Media/Auto Rotate',
  component: AutoRotate,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'เปลี่ยนสไลด์อัตโนมัติจาก markup ธรรมดา (ใช้ในหน้าหุ่นจำลองที่ห้าม binding) ลูกที่มี `data-slide` คือสไลด์ สไลด์ที่แสดงได้ `data-active` ปุ่ม `data-rotate="next|prev"` เลื่อนสไลด์ `data-goto="2"` ไปสไลด์ที่ 2 และ `data-rotate-count` แสดง "1 / 3" หยุดเมื่อเมาส์ชี้หรือโฟกัสอยู่ และเมื่อผู้ใช้ตั้งเครื่องให้ลดการเคลื่อนไหว',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <style>.demo [data-slide]{grid-area:1/1;opacity:0;transition:opacity .4s}.demo [data-slide][data-active]{opacity:1}</style>
      <p-auto-rotate class="demo" [interval]="interval">
        <div style="display:grid">
          <p data-slide style="margin:0;padding:24px;background:var(--p-blue-50)">สไลด์ที่ 1</p>
          <p data-slide style="margin:0;padding:24px;background:var(--p-yellow-100)">สไลด์ที่ 2</p>
          <p data-slide style="margin:0;padding:24px;background:var(--p-red-100)">สไลด์ที่ 3</p>
        </div>
        <p style="display:flex;gap:8px;align-items:center">
          <button type="button" data-rotate="prev">ก่อนหน้า</button>
          <span data-rotate-count>1 / 3</span>
          <button type="button" data-rotate="next">ถัดไป</button>
        </p>
      </p-auto-rotate>`,
  }),
};
export default meta;
type Story = StoryObj<AutoRotate>;

export const Default: Story = { name: 'เปลี่ยนเองทุก 2 วินาที', args: { interval: 2000 } };
export const Manual: Story = { name: 'กดปุ่มเท่านั้น', args: { interval: 0 } };
