import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { BtfpPublicFooter } from '../../layout/public-layout/public-footer';
import { BtfpPublicTopbar } from '../../layout/public-layout/public-topbar';
import { LandingPage } from './landing/landing';

const meta: Meta = {
  title: 'Pages/หน้าแรกสาธารณะ',
  id: 'pages-public-landing',
  decorators: [moduleMetadata({ imports: [BtfpPublicTopbar, BtfpPublicFooter, LandingPage] })],
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
        <btfp-public-topbar />
        <btfp-landing-page />
        <btfp-public-footer />
      </div>`,
  }),
};
