import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { PublicFooter } from '../../layout/public-layout/public-footer';
import { PublicTopbar } from '../../layout/public-layout/public-topbar';
import { LandingPage } from './landing/landing';
import { LandingNewPage } from './landing-new/landing-new';

const meta: Meta = {
  title: 'Pages/หน้าแรกสาธารณะ',
  id: 'pages-public-landing',
  decorators: [moduleMetadata({ imports: [PublicTopbar, PublicFooter, LandingPage, LandingNewPage] })],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'หน้าแรก "ระบบประกาศทุนและผลงานทุน กทปส." สำหรับผู้เยี่ยมชม (Figma: 50:6410) หุ่นจำลอง markup + CSS รองรับ Responsive ลองเปลี่ยนขนาดจอด้วยปุ่ม Viewport',
      },
    },
  },
};
export default meta;

export const Landing: StoryObj = {
  name: 'หน้าแรก',
  render: () => ({
    template: `
      <div style="background:var(--p-surface-raised)">
        <p-public-topbar />
        <p-landing-page />
        <p-public-footer />
      </div>`,
  }),
};

export const LandingNew: StoryObj = {
  name: 'หน้าแรก แนวใหม่ (ทดลอง)',
  parameters: { docs: { description: { story: 'Figma 827:61 สไลด์อัตโนมัติใช้ p-auto-rotate' } } },
  render: () => ({ template: `<p-landing-new-page />` }),
};
