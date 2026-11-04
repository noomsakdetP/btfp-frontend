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
  framework: '@storybook/angular-vite',
  // ปิด docgen server: ช่อง Controls ในหน้า Docs ของหมวด PrimeNG (ไม่มี component ให้อ่าน) จะได้แสดง
  // และ Show code ใช้ template ของ story ตรง ๆ
  // componentsManifest: รายการ component และ props ที่ MCP ส่งให้ AI
  features: { experimentalDocgenServer: true, componentsManifest: true },
  staticDirs: ['../public', { from: './fonts', to: '/sb-fonts' }],
};
export default config;
