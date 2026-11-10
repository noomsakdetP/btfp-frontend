import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

/**
 * ค่าหน้าตาของ ngx-ui-loader ที่ BA เลือก สีใช้ token --p-loading-* ใน _tokens.scss ซึ่งผูกกับ semantic ของระบบ
 * (ค่าตัวเลขเป็น px ที่ ngx-ui-loader รับได้เท่านั้น gap 24 = --p-space-lg)
 * - เปลี่ยนเมนู (foreground): แถบบน 3px + ชั้นทับพื้นเข้มของระบบ เบลอหน้าเดิม 3px + แท่งเด้ง 80px กลางจอ
 * - แสดงอย่างน้อย 300 ms ไม่มีหน่วงก่อนขึ้น
 */
export const BTFP_LOADER_CONFIG: NgxUiLoaderConfig = {
  blur: 3,
  delay: 0,
  fastFadeOut: true,
  fgsColor: 'var(--p-loading-spinner)',
  fgsPosition: 'center-center',
  fgsSize: 80,
  fgsType: 'rectangle-bounce-pulse-out-rapid',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'var(--p-loading-overlay)',
  pbColor: 'var(--p-loading-spinner)',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: 'var(--p-loading-text)',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
};

/**
 * ตั้งค่า ngx-ui-loader ให้ btfp-route-progress ใช้ (ใส่ใน app.config.ts ครั้งเดียว)
 *
 * แสดงเฉพาะตอนเปลี่ยนเมนู (foreground: แถบบน + ชั้นทับ + แท่งเด้งกลางจอ)
 * การเรียก API ไม่ใช้ตัวโหลดกลาง ให้แสดงสถานะที่ component ที่ผู้ใช้กด เช่น <p-button loading> หรือแถว p-skeleton ในตาราง
 */
export function btfpLoaderProviders(): EnvironmentProviders {
  return importProvidersFrom(NgxUiLoaderModule.forRoot(BTFP_LOADER_CONFIG), NgxUiLoaderRouterModule.forRoot({ showForeground: true }));
}
