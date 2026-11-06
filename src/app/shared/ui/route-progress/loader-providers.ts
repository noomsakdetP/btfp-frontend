import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

/**
 * ตั้งค่า ngx-ui-loader ให้ btfp-route-progress ใช้ (ใส่ใน app.config.ts ครั้งเดียว)
 *
 * - minTime 0 เพราะ btfp-route-progress มีหน่วงเวลาเอง (แถบ 150 ms, วงกลม 800 ms) หน้าเปิดเร็วจึงไม่กระพริบ
 * - เปลี่ยนเมนู = foreground (แถบ + วงกลมหมุนถ้ารอนาน)
 * - เรียก API = background (แถบอย่างเดียว) ต้องมี provideHttpClient(withInterceptorsFromDi()) ด้วย
 *   ถ้า API ไหนไม่ต้องแสดงโหลด (เช่น เช็กแจ้งเตือนทุก 30 วินาที) ใส่ใน exclude
 */
export function btfpLoaderProviders(): EnvironmentProviders {
  return importProvidersFrom(
    NgxUiLoaderModule.forRoot({ minTime: 0, fastFadeOut: true }),
    NgxUiLoaderRouterModule.forRoot({ showForeground: true }),
    NgxUiLoaderHttpModule.forRoot({ showForeground: false, minTime: 0, exclude: [] }),
  );
}
