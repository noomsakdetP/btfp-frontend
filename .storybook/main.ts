import type { StorybookConfig } from '@storybook/angular-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    // remark-gfm ทำให้ตารางในไฟล์ .mdx แสดงเป็นตาราง
    { name: '@storybook/addon-docs', options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
  ],
  framework: '@storybook/angular-vite',
  // ปิด docgen server: ช่อง Controls ในหน้า Docs ของหมวด PrimeNG (ไม่มี component ให้อ่าน) จะได้แสดง
  // และ Show code ใช้ template ของ story ตรง ๆ
  features: { experimentalDocgenServer: false },
  staticDirs: ['../public', { from: './fonts', to: '/sb-fonts' }],
};
export default config;
