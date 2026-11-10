import type { StorybookConfig } from '@storybook/angular-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    // remark-gfm ทำให้ตารางในไฟล์ .mdx แสดงเป็นตาราง
    { name: '@storybook/addon-docs', options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
  ],
  // compodoc อ่านโค้ด Angular แล้วสร้างตาราง input/output ของ component ในหน้า Docs (เขียนไฟล์ documentation.json ไว้ที่ root ไม่ต้อง commit)
  // ซ่อน member ที่เป็น private/protected ให้ตารางเหลือแค่ input/output ที่ dev ใช้
  framework: {
    name: '@storybook/angular-vite',
    options: {
      compodoc: true,
      compodocArgs: ['-e', 'json', '-d', '.', '--disablePrivate', '--disableProtected', '--disableInternal', '--disableLifeCycleHooks'],
    },
  },
  // ปิด docgen server: ช่อง Controls ในหน้า Docs ของหมวด PrimeNG (ไม่มี component ให้อ่าน) จะได้แสดง
  // และ Show code ใช้ template ของ story ตรง ๆ
  features: { experimentalDocgenServer: false },
  // ไม่ส่งสถิติการใช้งานไปที่ Storybook
  core: { disableTelemetry: true },
  staticDirs: ['../public', { from: './fonts', to: '/sb-fonts' }],
};
export default config;
