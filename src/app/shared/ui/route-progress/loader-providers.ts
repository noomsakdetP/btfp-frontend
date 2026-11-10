import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

/**
 * ค่าหน้าตาของ ngx-ui-loader ที่ BA เลือก (สีผูก token ใน _tokens.scss แทนรหัสสี)
 * - เปลี่ยนเมนู (foreground): แถบบน 3px + ชั้นทับเทาเข้ม เบลอหน้าเดิม 3px + แท่งเด้ง 80px กลางจอ
 * - เรียก API (background): แถบบน + วงหมุน 60px มุมขวาล่าง โปร่ง 50%
 * - แสดงอย่างน้อย 300 ms ไม่มีหน่วงก่อนขึ้น
 */
export const BTFP_LOADER_CONFIG: NgxUiLoaderConfig = {
  bgsColor: 'var(--p-loading-background)',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
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
 * - เปลี่ยนเมนู = foreground (แถบ + ชั้นทับ + แท่งเด้งกลางจอ)
 * - เรียก API = background (แถบ + วงหมุนมุมขวาล่าง) ต้องมี provideHttpClient(withInterceptorsFromDi()) ด้วย
 *   ถ้า API ไหนไม่ต้องแสดงโหลด (เช่น เช็กแจ้งเตือนทุก 30 วินาที) ใส่ใน exclude
 */
export function btfpLoaderProviders(): EnvironmentProviders {
  return importProvidersFrom(
    NgxUiLoaderModule.forRoot(BTFP_LOADER_CONFIG),
    NgxUiLoaderRouterModule.forRoot({ showForeground: true }),
    NgxUiLoaderHttpModule.forRoot({ showForeground: false, exclude: [] }),
  );
}
