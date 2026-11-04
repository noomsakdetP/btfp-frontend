// สไตล์ส่วนกลางชุดเดียวกับ angular.json (ฟอนต์, token, base)
import '@fontsource/sarabun/400.css';
import '@fontsource/sarabun/500.css';
import '@fontsource/sarabun/600.css';
import '@fontsource/ibm-plex-sans-thai/500.css';
import '@fontsource/ibm-plex-sans-thai/600.css';
import '@fontsource/ibm-plex-sans-thai/700.css';
import 'primeicons/primeicons.css';
import '../src/tailwind.css';
import '../src/styles.scss';
import './docs.css';

import type { Preview } from '@storybook/angular-vite';

import { applicationConfig } from '@storybook/angular-vite';
import { provideRouter, withHashLocation } from '@angular/router';
import { uiProviders } from '../src/app/app.config';
import { loaderProviders } from '../src/app/shared/ui/route-progress/loader-providers';
import { storybookTheme } from './theme';
import { htmlSnippetTransform } from './source-snippet';
// documentation.json สร้างโดย Compodoc ตอนเปิด/build Storybook (ไม่ต้อง commit) ใช้ทำตาราง input/output ในหน้า Docs
import compodocJson from '../documentation.json';

// docgen server เปิดไว้ใน main.ts เพื่อให้ MCP (addon-mcp) ส่งรายการ component และ props ให้ AI ได้
// แต่ในหน้า Docs ให้กลับไปใช้ตาราง Controls แบบเดิม ไม่งั้นหน้า PrimeNG (ไม่มี component ให้อ่าน) จะไม่มี Controls
const features = (globalThis as { FEATURES?: Record<string, unknown> }).FEATURES;
if (features) features['experimentalDocgenServer'] = false;

(globalThis as { __STORYBOOK_COMPODOC_JSON__?: unknown }).__STORYBOOK_COMPODOC_JSON__ = compodocJson;

/** output (event) ของ component ไม่มีค่าให้ลอง ซ่อนช่อง Control ไว้ เหลือแค่ชื่อและคำอธิบายในตาราง */
const hideOutputControls: NonNullable<Preview['argTypesEnhancers']>[number] = ({ argTypes }) =>
  Object.fromEntries(
    Object.entries(argTypes).map(([name, argType]) => [name, argType.table?.category === 'outputs' ? { ...argType, control: false } : argType]),
  );

const preview: Preview = {
  argTypesEnhancers: [hideOutputControls],
  decorators: [
    // ใช้ธีม PrimeNG, ภาษาไทย, ไอคอน, ConfirmationService และตัวโหลด ชุดเดียวกับแอปจริง
    applicationConfig({
      // loaderProviders: ตัวโหลดใน Storybook ใช้ค่าเดียวกับแอปจริง (BTFP_LOADER_CONFIG)
      providers: [...uiProviders, loaderProviders(), provideRouter([], withHashLocation())],
    }),
  ],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'subtle', options: { subtle: { name: 'subtle', value: '#f8fafc' }, white: { name: 'white', value: '#ffffff' } } },
    controls: { expanded: true },
    // Show code แสดง HTML ที่ copy ไปใช้ได้ (ดู source-snippet.ts)
    docs: { theme: storybookTheme, source: { language: 'html', transform: htmlSnippetTransform } },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'เริ่มต้น',
          'Foundations',
          ['สี', 'ตัวอักษร', 'ระยะ มุมโค้ง เงา', 'ไอคอน'],
          'PrimeNG (ธีม กทปส.)',
          [
            'ภาพรวม',
            'Actions',
            ['Button', 'Icon Button'],
            'Forms',
            ['Text Input และ Textarea', 'Select และ MultiSelect', 'Autocomplete, Currency, Search, OTP', 'Checkbox, Radio, Toggle', 'Segmented Control'],
            'Data Display',
            ['Tag และ Chip', 'Avatar'],
            'Feedback',
            'Navigation',
            ['Tabs', 'Pagination', 'Breadcrumb'],
          ],
          'Components',
          ['ภาพรวม', 'Actions', 'Forms', 'Data Display', 'Feedback', 'Overlay', 'Public website'],
          'Layout',
          'Pages',
        ],
      },
    },
  },
};

export default preview;
