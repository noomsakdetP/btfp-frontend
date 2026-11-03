import { create } from 'storybook/theming';

/**
 * ธีมของ Storybook (แถบเมนูซ้ายและหน้า Docs) ใช้ค่าเดียวกับ Design Token ใน src/styles/_tokens.scss
 * ใส่เป็นรหัสสีเพราะ Storybook คำนวณสีอ่อนเข้มจากค่านี้ ใช้ CSS variable ไม่ได้
 * ถ้า token เปลี่ยนให้แก้ที่นี่ด้วย
 */
export const btfpTheme = create({
  base: 'light',
  brandTitle: 'ระบบบริหารจัดการทุน กทปส.',
  fontBase: "'Sarabun', sans-serif", // --btfp-font-body
  fontCode: "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace",
  colorPrimary: '#0077b6', // --btfp-action-primary
  colorSecondary: '#0077b6',
  appBg: '#f8fafc', // --btfp-bg-subtle
  appContentBg: '#ffffff', // --btfp-surface-raised
  appPreviewBg: '#ffffff',
  appBorderColor: '#e2e8f0', // --btfp-border-default
  appBorderRadius: 8, // --btfp-radius-button
  textColor: '#1e293b', // --btfp-text-primary
  textMutedColor: '#475569', // --btfp-text-secondary
  textInverseColor: '#ffffff',
  barTextColor: '#475569',
  barSelectedColor: '#0077b6',
  barHoverColor: '#005e91',
  barBg: '#ffffff',
  inputBg: '#ffffff',
  inputBorder: '#94a3b8', // --btfp-border-strong
  inputTextColor: '#1e293b',
  inputBorderRadius: 4, // --btfp-radius-input
});
