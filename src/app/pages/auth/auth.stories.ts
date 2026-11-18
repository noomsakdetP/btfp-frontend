import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { LoginPage } from './login/login';
import { LoginNewPage } from './login-new/login-new';

const meta: Meta = {
  title: 'Pages/เข้าสู่ระบบ',
  id: 'pages-auth',
  decorators: [moduleMetadata({ imports: [LoginPage, LoginNewPage] })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'หน้าเข้าสู่ระบบของผู้ขอรับทุน (Figma: F-10 42:9007) เปิดจากปุ่ม "เข้าสู่ระบบ" ในแถบบนของหน้าแรก หุ่นจำลอง markup + CSS รองรับ Responsive',
      },
    },
  },
};
export default meta;

export const Login: StoryObj = {
  name: 'เข้าสู่ระบบ ① อีเมลหรือเบอร์มือถือ',
  render: () => ({ template: `<p-login-page />` }),
};

export const LoginNew: StoryObj = {
  name: 'เข้าสู่ระบบ แนวใหม่ (ทดลอง)',
  parameters: { docs: { description: { story: 'Figma 967:2965 ภาพฝั่งซ้ายเป็น Rive ฟอนต์ ThaiSans Neue (เดโมเท่านั้น รออนุญาตใช้บนเว็บ)' } } },
  render: () => ({ template: `<p-login-new-page />` }),
};
