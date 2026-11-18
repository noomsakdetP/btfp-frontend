import type { Meta, StoryObj } from '@storybook/angular-vite';
import { RiveView } from './rive';

const meta: Meta<RiveView> = {
  title: 'Components/Media/Rive',
  component: RiveView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ภาพเคลื่อนไหวจากไฟล์ Rive (.riv) ใช้ runtime `@rive-app/canvas-lite` แสดงภาพสำรองก่อนโหลดเสร็จ และเมื่อผู้ใช้ตั้งเครื่องให้ลดการเคลื่อนไหว ใช้กับภาพประกอบเท่านั้น ข้อความและปุ่มต้องเป็น HTML ปกติ',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 390px; height: 450px; background: var(--p-blue-50)"><p-rive [src]="src" [fallback]="fallback" [stateMachine]="stateMachine" [fit]="fit" [alt]="alt" /></div>`,
  }),
  argTypes: { fit: { control: 'inline-radio', options: ['contain', 'cover'] } },
};
export default meta;
type Story = StoryObj<RiveView>;

export const LoginArt: Story = {
  name: 'ภาพหน้าเข้าสู่ระบบ (แนวใหม่)',
  args: { src: 'rive/login-art.riv', stateMachine: 'Idle', fallback: 'images/login-new/login-illustration.svg', fit: 'contain' },
};

export const FallbackOnly: Story = {
  name: 'โหลดไม่สำเร็จ (แสดงภาพสำรอง)',
  args: { src: 'rive/not-found.riv', fallback: 'images/login-new/login-illustration.svg', fit: 'contain' },
};
