import type { Meta, StoryObj } from '@storybook/angular-vite';
import { BtfpRouteProgress } from './route-progress';

const meta: Meta<BtfpRouteProgress> = {
  title: 'Components/Feedback/Route Progress',
  component: BtfpRouteProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: '360px' },
      description: {
        component: [
          'แสดงว่ากำลังเปลี่ยนเมนู (Figma: Feedback/Progress Bar, Feedback/Loading Spinner)',
          '',
          '- **แถบวิ่ง** สูง 3px ติดขอบบนของจอ ขึ้นเมื่อรอเกิน 150 ms เปิดเร็วกว่านั้นจะไม่เห็นแถบกระพริบ',
          '- **วงกลมหมุน** กลางจอบนชั้นทับโปร่ง ขึ้นเมื่อรอเกิน 800 ms ใช้กรณีเน็ตช้า',
          '- ใส่ไว้ใน `app.ts` ครั้งเดียวแล้ว ทุกหน้าได้ทันที **หน้าใหม่ไม่ต้องใส่เอง**',
          '- ภายในใช้ `p-progressbar` และ `p-progressspinner` สีตาม `btfp-preset.ts`',
          '',
          'ตัวอย่างด้านล่างบังคับแสดงด้วย `demo` (ใช้เฉพาะ Storybook) ปรับเวลาได้ด้วย `barDelay` และ `spinnerDelay`',
        ].join('\n'),
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:360px;padding:72px 32px;background:var(--btfp-bg-subtle)">
        <h2 class="btfp-text-h2">ข้อเสนอโครงการ</h2>
        <p class="btfp-text-body">เนื้อหาของหน้าเดิมยังเห็นอยู่ระหว่างรอ</p>
      </div>
      <btfp-route-progress [demo]="demo" />`,
  }),
};
export default meta;
type Story = StoryObj<BtfpRouteProgress>;

export const Bar: Story = { name: 'แถบด้านบน (รอเกิน 150 ms)', args: { demo: 'bar' } };
export const Spinner: Story = { name: 'แถบ + วงกลมหมุน (รอเกิน 800 ms)', args: { demo: 'spinner' } };
