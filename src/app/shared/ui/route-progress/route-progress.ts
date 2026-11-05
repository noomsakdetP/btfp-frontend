import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, numberAttribute, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ProgressBar } from 'primeng/progressbar';
import { ProgressSpinner } from 'primeng/progressspinner';

export type BtfpRouteProgressDemo = '' | 'bar' | 'spinner';

/**
 * btfp-route-progress : แสดงว่ากำลังเปลี่ยนเมนู (Figma: Feedback/Progress Bar, Feedback/Loading Spinner)
 *
 * ใส่ครั้งเดียวที่ app.ts ทุกหน้าได้ทันที หน้าหุ่นจำลองไม่ต้องทำอะไร
 * 1. แถบวิ่งสูง 3px ติดขอบบนของจอ ขึ้นเมื่อรอเกิน barDelay (ค่าเริ่มต้น 150 ms) เปิดเร็วกว่านั้นจะไม่เห็นแถบกระพริบ
 * 2. วงกลมหมุนกลางจอบนชั้นทับโปร่ง ขึ้นเมื่อรอเกิน spinnerDelay (ค่าเริ่มต้น 800 ms) ใช้กรณีเน็ตช้า
 *
 * ใช้ p-progressbar และ p-progressspinner ของ PrimeNG สีตั้งไว้ใน btfp-preset.ts
 * PrimeNG ไม่มีตัวที่รู้ว่ากำลังเปลี่ยนเมนู component นี้จึงฟัง event ของ Router แล้วแสดงหรือซ่อนให้
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
          <p-progressspinner strokeWidth="4" [style]="{ width: '48px', height: '48px' }" ariaLabel="กำลังโหลด" />
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
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 1100;
      display: grid;
      place-items: center;
      background: var(--btfp-loading-overlay);
    }
    .box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--btfp-space-sm);
      padding: var(--btfp-space-lg) var(--btfp-space-xl);
      border: 1px solid var(--btfp-border-default);
      border-radius: var(--btfp-radius-card);
      background: var(--btfp-surface-raised);
      box-shadow: var(--btfp-shadow-2);
      font-size: var(--btfp-typography-body-s-medium-size);
      font-weight: var(--btfp-typography-body-s-medium-weight);
      line-height: var(--btfp-line-height-body);
      color: var(--btfp-text-heading);
    }
    .box ::ng-deep .p-progressspinner {
      margin: 0;
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

  protected readonly showBar = signal(false);
  protected readonly showSpinner = signal(false);
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    const router = inject(Router, { optional: true });
    const sub = router?.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.clear();
        this.timers.push(setTimeout(() => this.showBar.set(true), this.barDelay()));
        this.timers.push(setTimeout(() => this.showSpinner.set(true), this.spinnerDelay()));
      } else if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        this.clear();
        this.showBar.set(false);
        this.showSpinner.set(false);
      }
    });
    inject(DestroyRef).onDestroy(() => {
      sub?.unsubscribe();
      this.clear();
    });
  }

  private clear(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}
