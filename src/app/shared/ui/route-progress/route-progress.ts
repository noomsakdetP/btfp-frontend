import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, numberAttribute, signal } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProgressBar } from 'primeng/progressbar';
import { ProgressSpinner } from 'primeng/progressspinner';

export type BtfpRouteProgressDemo = '' | 'bar' | 'spinner';
/** ตัวเลือกวงหมุน (ให้ BA เลือก เลือกแล้วจะลบแบบที่ไม่ใช้ออก) */
export type BtfpSpinnerVariant = 'primeng' | 'wave' | 'bars' | 'orbit' | 'logo';

/**
 * btfp-route-progress : แสดงว่ากำลังเปลี่ยนเมนู (Figma: Feedback/Progress Bar, Feedback/Loading Spinner)
 *
 * ใส่ครั้งเดียวที่ app.ts ทุกหน้าได้ทันที หน้าหุ่นจำลองไม่ต้องทำอะไร
 * 1. แถบวิ่งสูง 3px ติดขอบบนของจอ ขึ้นเมื่อรอเกิน barDelay (ค่าเริ่มต้น 150 ms) เปิดเร็วกว่านั้นจะไม่เห็นแถบกระพริบ
 * 2. วงกลมหมุนกลางจอบนชั้นทับโปร่ง ขึ้นเมื่อรอเกิน spinnerDelay (ค่าเริ่มต้น 800 ms) ใช้กรณีเน็ตช้า
 *
 * ใช้ p-progressbar และ p-progressspinner ของ PrimeNG สีตั้งไว้ใน btfp-preset.ts
 *
 * ตัวจับว่ากำลังโหลดคือ ngx-ui-loader (ตั้งค่าใน app.config.ts ด้วย btfpLoaderProviders)
 * - เปลี่ยนเมนู (NgxUiLoaderRouterModule) = foreground: แถบด้านบน แล้วตามด้วยวงกลมหมุนถ้ารอนาน
 * - เรียก API ผ่าน HttpClient (NgxUiLoaderHttpModule) = background: แถบด้านบนอย่างเดียว ไม่บังหน้าจอ
 * - หยุดหรือเริ่มเองได้ผ่าน NgxUiLoaderService เช่น loader.start('save') และ loader.stop('save')
 * ไม่ได้ใช้หน้าตาของ ngx-ui-loader (<ngx-ui-loader>) เพราะต้องการหน้าตาตามธีมของระบบ
 *
 * @example
 * <btfp-route-progress />
 */
@Component({
  selector: 'btfp-route-progress',
  imports: [ProgressBar, ProgressSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (demo() === 'bar' || demo() === 'spinner' || showBar()) {
      <div class="bar" role="progressbar" aria-label="กำลังโหลดหน้า">
        <p-progressbar mode="indeterminate" [style]="{ height: '3px', borderRadius: '0' }" />
      </div>
    }
    @if (demo() === 'spinner' || showSpinner()) {
      <div class="overlay" role="status" aria-live="polite">
        <div class="box">
          @switch (variant()) {
            @case ('wave') {
              <div class="sp sp-wave" aria-hidden="true"><i></i><i></i><b></b></div>
            }
            @case ('bars') {
              <div class="sp sp-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
            }
            @case ('orbit') {
              <div class="sp sp-orbit" aria-hidden="true"><i></i><i></i></div>
            }
            @case ('logo') {
              <div class="sp sp-logo" aria-hidden="true"><img src="brand/logo-btfp.png" alt="" width="29" height="40" /></div>
            }
            @default {
              <p-progressspinner strokeWidth="4" [style]="{ width: '72px', height: '72px' }" ariaLabel="กำลังโหลด" />
            }
          }
          <span>กำลังโหลด</span>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: contents;
    }
    .bar {
      position: fixed;
      inset: 0 0 auto;
      z-index: 1200;
    }
    .bar :is(.p-progressbar) {
      background: transparent;
    }
    /* ชั้นทับดำโปร่ง วงหมุนและข้อความวางบนชั้นทับตรง ๆ ไม่มีกล่อง */
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 1100;
      display: grid;
      place-items: center;
      background: var(--btfp-loading-overlay);
      /* สีของ p-progressspinner บนพื้นเข้ม */
      --p-progressspinner-color-one: var(--btfp-loading-spinner);
      --p-progressspinner-color-two: var(--btfp-loading-spinner-soft);
      --p-progressspinner-color-three: var(--btfp-loading-spinner);
      --p-progressspinner-color-four: var(--btfp-loading-spinner-soft);
    }
    .box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--btfp-space-md);
      font-size: var(--btfp-typography-body-medium-size);
      font-weight: var(--btfp-typography-body-medium-weight);
      line-height: var(--btfp-line-height-body);
      color: var(--btfp-loading-text);
    }
    .box ::ng-deep .p-progressspinner {
      margin: 0;
    }

    /* ---------- ตัวเลือกวงหมุน (Figma: section-Feedback-Loading > ตัวเลือกวงหมุน) ---------- */
    .sp {
      position: relative;
      width: 72px;
      height: 72px;
    }
    /* แบบ 3 คลื่นสัญญาณ */
    .sp-wave i {
      position: absolute;
      inset: 0;
      border: 4px solid var(--btfp-loading-spinner);
      border-radius: 50%;
      opacity: 0;
      animation: btfp-wave 1.6s ease-out infinite;
    }
    .sp-wave i:nth-child(2) {
      animation-delay: 0.8s;
    }
    .sp-wave b {
      position: absolute;
      inset: 27px;
      border-radius: 50%;
      background: var(--btfp-loading-spinner);
    }
    @keyframes btfp-wave {
      0% { transform: scale(0.3); opacity: 1; }
      100% { transform: scale(1); opacity: 0; }
    }
    /* แบบ 4 แท่งสัญญาณ */
    .sp-bars {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 6px;
      padding: 6px 0;
    }
    .sp-bars i {
      width: 9px;
      height: 100%;
      border-radius: 5px;
      background: var(--btfp-loading-spinner);
      transform-origin: bottom;
      animation: btfp-bars 1s ease-in-out infinite;
    }
    .sp-bars i:nth-child(2) { animation-delay: 0.12s; }
    .sp-bars i:nth-child(3) { animation-delay: 0.24s; }
    .sp-bars i:nth-child(4) { animation-delay: 0.36s; }
    .sp-bars i:nth-child(5) { animation-delay: 0.48s; }
    @keyframes btfp-bars {
      0%, 100% { transform: scaleY(0.35); }
      50% { transform: scaleY(1); }
    }
    /* แบบ 5 ดาวเทียมโคจร */
    .sp-orbit {
      border: 3px solid var(--btfp-loading-spinner-soft);
      border-radius: 50%;
      animation: btfp-spin 1.4s linear infinite;
    }
    .sp-orbit i {
      position: absolute;
      left: 50%;
      width: 18px;
      height: 18px;
      margin-left: -9px;
      border-radius: 50%;
      background: var(--btfp-loading-spinner);
    }
    .sp-orbit i:first-child { top: -10px; }
    .sp-orbit i:last-child { bottom: -10px; background: var(--btfp-text-inverse); }
    @keyframes btfp-spin {
      to { transform: rotate(360deg); }
    }
    /* แบบ 6 โลโก้ + แถบวิ่ง */
    .sp-logo {
      display: grid;
      place-items: center;
      overflow: hidden;
      border-radius: var(--btfp-radius-card);
      background: var(--btfp-info-bg);
    }
    .sp-logo img {
      animation: btfp-fade 1.4s ease-in-out infinite;
    }
    .sp-logo::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -40%;
      width: 40%;
      height: 4px;
      background: var(--btfp-action-primary);
      animation: btfp-run 1.2s ease-in-out infinite;
    }
    @keyframes btfp-fade {
      0%, 100% { opacity: 0.45; }
      50% { opacity: 1; }
    }
    @keyframes btfp-run {
      to { left: 100%; }
    }
    @media (prefers-reduced-motion: reduce) {
      .sp, .sp *, .sp::after { animation-duration: 3s !important; }
    }
  `,
})
export class BtfpRouteProgress {
  /** รอนานเท่าไร (ms) ถึงแสดงแถบด้านบน */
  readonly barDelay = input(150, { transform: numberAttribute });
  /** รอนานเท่าไร (ms) ถึงแสดงวงกลมหมุนกลางจอ */
  readonly spinnerDelay = input(800, { transform: numberAttribute });
  /** สำหรับ Storybook: บังคับแสดง 'bar' หรือ 'spinner' (แถบ + วงกลม) */
  readonly demo = input<BtfpRouteProgressDemo>('');
  /** ตัวเลือกวงหมุน (ชั่วคราว ให้ BA เลือก) ค่าเริ่มต้น primeng = p-progressspinner เดิม */
  readonly variant = input<BtfpSpinnerVariant>('primeng');

  protected readonly showBar = signal(false);
  protected readonly showSpinner = signal(false);
  private fgTimers: ReturnType<typeof setTimeout>[] = [];
  private bgTimer?: ReturnType<typeof setTimeout>;
  private foreground = false;
  private background = false;

  constructor() {
    const loader = inject(NgxUiLoaderService, { optional: true });
    if (!loader) return;
    const master = loader.getDefaultConfig().masterLoaderId ?? 'master';
    // ผูก loader หลักแทน <ngx-ui-loader> (เราแสดงหน้าตาเอง)
    if (!loader.getLoader(master)?.isBound) loader.bindLoaderData(master);

    const fg = loader.showForeground$.subscribe(({ loaderId, isShow }) => {
      if (loaderId !== master) return;
      this.foreground = isShow;
      this.fgTimers.forEach(clearTimeout);
      this.fgTimers = [];
      if (isShow) {
        this.fgTimers.push(setTimeout(() => this.showBar.set(true), this.barDelay()));
        this.fgTimers.push(setTimeout(() => this.showSpinner.set(true), this.spinnerDelay()));
      } else {
        this.showSpinner.set(false);
        if (!this.background) this.showBar.set(false);
      }
    });
    const bg = loader.showBackground$.subscribe(({ loaderId, isShow }) => {
      if (loaderId !== master) return;
      this.background = isShow;
      clearTimeout(this.bgTimer);
      if (isShow) this.bgTimer = setTimeout(() => this.showBar.set(true), this.barDelay());
      else if (!this.foreground) this.showBar.set(false);
    });

    inject(DestroyRef).onDestroy(() => {
      fg.unsubscribe();
      bg.unsubscribe();
      this.fgTimers.forEach(clearTimeout);
      clearTimeout(this.bgTimer);
      loader.destroyLoaderData(master);
    });
  }
}
