import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input } from '@angular/core';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

export type BtfpRouteProgressDemo = '' | 'foreground' | 'background';

/**
 * btfp-route-progress : แสดงว่ากำลังโหลด (Figma: Feedback/Progress Bar, Feedback/Loading Spinner)
 *
 * ใส่ครั้งเดียวที่ app.ts ทุกหน้าได้ทันที หน้าหุ่นจำลองไม่ต้องทำอะไร
 * ภายในคือ <ngx-ui-loader> หน้าตาตั้งค่าใน loader-providers.ts (BTFP_LOADER_CONFIG) สีจาก token --p-loading-*
 *
 * - เปลี่ยนเมนู (NgxUiLoaderRouterModule) = foreground: แถบบน + ชั้นทับพื้นเข้ม + แท่งเด้งกลางจอ
 *   หน้าเดิมเบลอเมื่อครอบด้วย ngxUiLoaderBlurred (ทำไว้แล้วใน app.ts)
 * - เรียก API ผ่าน HttpClient (NgxUiLoaderHttpModule) = background: วงหมุนมุมขวาล่างอย่างเดียว ไม่บังหน้าจอ
 * - หยุดหรือเริ่มเองได้ผ่าน NgxUiLoaderService เช่น loader.start('save') และ loader.stop('save')
 *
 * @example
 * <btfp-route-progress />
 */
@Component({
  selector: 'btfp-route-progress',
  imports: [NgxUiLoaderModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ngx-ui-loader />`,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class BtfpRouteProgress {
  /** สำหรับ Storybook: บังคับแสดงค้าง 'foreground' (เปลี่ยนเมนู) หรือ 'background' (เรียก API) */
  readonly demo = input<BtfpRouteProgressDemo>('');

  constructor() {
    const loader = inject(NgxUiLoaderService);
    const id = 'btfp-demo';
    let shown: BtfpRouteProgressDemo = '';
    // หยุดเฉพาะเมื่อเคยสั่งแสดง (สั่ง stop ก่อน loader ถูกสร้างจะมีคำเตือนใน console)
    const clear = () => {
      if (shown === 'foreground') loader.stop(id);
      if (shown === 'background') loader.stopBackground(id);
      shown = '';
    };
    effect(() => {
      const d = this.demo();
      clear();
      if (d === 'foreground') loader.start(id);
      if (d === 'background') loader.startBackground(id);
      shown = d;
    });
    inject(DestroyRef).onDestroy(clear);
  }
}
