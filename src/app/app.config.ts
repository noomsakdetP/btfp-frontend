import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService } from 'primeng/api';

import { routes } from './app.routes';
import { ThemePreset } from './theme/theme-preset';
import { TH_LOCALE } from './theme/th-locale';
import { loaderProviders } from './shared/ui/route-progress/loader-providers';

/** ตั้งค่า PrimeNG ที่ใช้ร่วมกันทั้งแอปและ Storybook */
export const uiProviders = [
  providePrimeNG({
    theme: {
      preset: ThemePreset,
      options: {
        darkModeSelector: false, // ระบบราชการ ใช้โหมดสว่างอย่างเดียว
        cssLayer: { name: 'primeng', order: 'theme, base, primeng, app, components, utilities' },
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
    provideHttpClient(),
    loaderProviders(),
    ...uiProviders,
  ],
};
