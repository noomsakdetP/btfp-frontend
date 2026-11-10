import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { LoginPage } from './login/login';

const meta: Meta = {
  title: 'Pages/เข้าสู่ระบบ',
  id: 'pages-auth',
  decorators: [moduleMetadata({ imports: [LoginPage] })],
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
  render: () => ({ template: `<btfp-login-page />` }),
};
