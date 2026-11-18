import type { StorybookConfig } from '@storybook/angular-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    // remark-gfm ทำให้ตารางในไฟล์ .mdx แสดงเป็นตาราง
    { name: '@storybook/addon-docs', options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
    // MCP server ให้ AI (Claude Code, Cursor ฯลฯ) อ่าน component และ Docs ได้ที่ http://localhost:6006/mcp
    '@storybook/addon-mcp',
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
  // docgen server และ componentsManifest: รายการ component และ props ที่ MCP (addon-mcp) ส่งให้ AI
  // ตาราง Controls ในหน้า Docs ยังใช้แบบเดิม (ปิด docgen server ฝั่ง preview ใน preview.ts)
  features: { experimentalDocgenServer: true, componentsManifest: true },
  // ไม่ส่งสถิติการใช้งานไปที่ Storybook
  core: { disableTelemetry: true },
  staticDirs: ['../public', { from: './fonts', to: '/sb-fonts' }, { from: '../node_modules/@rive-app/canvas-lite', to: '/rive-wasm' }],
};
export default config;
