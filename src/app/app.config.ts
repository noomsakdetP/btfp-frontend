import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService } from 'primeng/api';

import { routes } from './app.routes';
import { BtfpPreset } from './theme/btfp-preset';
import { TH_LOCALE } from './theme/th-locale';

/** ตั้งค่า PrimeNG ที่ใช้ร่วมกันทั้งแอปและ Storybook */
export const btfpUiProviders = [
  providePrimeNG({
    theme: {
      preset: BtfpPreset,
      options: {
        darkModeSelector: false, // ระบบราชการ ใช้โหมดสว่างอย่างเดียว
        cssLayer: { name: 'primeng', order: 'tailwind-base, primeng, btfp' },
      },
    },
    translation: TH_LOCALE,
    ripple: false,
  }),
  ConfirmationService,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    ...btfpUiProviders,
  ],
};
