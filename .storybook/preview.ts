// สไตล์ส่วนกลางชุดเดียวกับ angular.json (ฟอนต์, token, base)
import '@fontsource/sarabun/400.css';
import '@fontsource/sarabun/500.css';
import '@fontsource/sarabun/600.css';
import '@fontsource/ibm-plex-sans-thai/500.css';
import '@fontsource/ibm-plex-sans-thai/600.css';
import '@fontsource/ibm-plex-sans-thai/700.css';
import '../src/tailwind.css';
import '../src/styles.scss';

import type { Preview } from '@storybook/angular-vite';
import { applicationConfig } from '@storybook/angular-vite';
import { provideRouter, withHashLocation } from '@angular/router';
import { btfpUiProviders } from '../src/app/app.config';

const preview: Preview = {
  decorators: [
    // ใช้ธีม PrimeNG, ภาษาไทย, ไอคอน และ ConfirmationService ชุดเดียวกับแอปจริง
    applicationConfig({
      providers: [...btfpUiProviders, provideRouter([], withHashLocation())],
    }),
  ],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'subtle', options: { subtle: { name: 'subtle', value: '#f8fafc' }, white: { name: 'white', value: '#ffffff' } } },
    controls: { expanded: true },
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
