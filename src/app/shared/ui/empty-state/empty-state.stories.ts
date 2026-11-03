import type { Meta, StoryObj } from '@storybook/angular-vite';
import { BtfpEmptyState } from './empty-state';

const meta: Meta<BtfpEmptyState> = {
  title: 'Components/Empty State',
  component: BtfpEmptyState,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'white' },
    docs: { description: { component: 'สถานะไม่พบข้อมูล (Figma: Empty State 13:3184) มี 4 แบบตาม `type`' } },
  },
  argTypes: { type: { control: 'select', options: ['general', 'no-results', 'no-files', 'error'] } },
};
export default meta;
type Story = StoryObj<BtfpEmptyState>;

export const General: Story = {
  name: 'ยังไม่มีข้อมูล',
  args: {
    type: 'general',
    title: 'ยังไม่มีข้อเสนอโครงการ',
    description: 'เมื่อผู้ขอรับทุนยื่นข้อเสนอในประกาศที่เปิดรับ รายการจะแสดงที่นี่',
  },
};
export const NoResults: Story = {
  name: 'ค้นหาไม่พบ',
  args: {
    type: 'no-results',
    title: 'ไม่พบข้อเสนอที่ตรงกับเงื่อนไข',
    description: 'ลองเปลี่ยนคำค้นหา หรือล้างตัวกรองบางรายการ',
    actionLabel: 'ล้างตัวกรองทั้งหมด',
  },
};
export const NoFiles: Story = {
  name: 'ยังไม่มีไฟล์',
  args: { type: 'no-files', title: 'ยังไม่มีเอกสารแนบ', description: 'เอกสารที่ผู้ขอรับทุนแนบจะแสดงที่นี่' },
};
export const LoadError: Story = {
  name: 'โหลดไม่สำเร็จ',
  args: {
    type: 'error',
    title: 'โหลดข้อมูลไม่สำเร็จ',
    description: 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง',
    actionLabel: 'ลองอีกครั้ง',
  },
};
