import type { Meta, StoryObj } from '@storybook/angular-vite';
import { BtfpDrawer } from './drawer';

const meta: Meta<BtfpDrawer> = {
  title: 'Components/Overlay/Drawer',
  tags: ['autodocs'],
  component: BtfpDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'แผงเลื่อนจากขอบจอ ห่อ `p-drawer` ให้เปิดด้วย attribute `open` ได้โดยไม่ต้องใช้ binding (สำหรับหน้าหุ่นจำลอง) กว้าง 480px และเต็มจอบนมือถือ',
      },
    },
  },
};
export default meta;

export const Open: StoryObj<BtfpDrawer> = {
  name: 'เปิดอยู่',
  render: () => ({
    template: `
      <div style="height:100vh"></div>
      <btfp-drawer open>
        <h2 btfpDrawerHeader style="font-size:20px">หัวข้อ Drawer</h2>
        <p>เนื้อหาใน Drawer</p>
        <div btfpDrawerFooter style="display:flex; justify-content:flex-end; width:100%">ปุ่มด้านล่าง</div>
      </btfp-drawer>`,
  }),
};
