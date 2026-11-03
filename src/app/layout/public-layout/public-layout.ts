import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { BtfpIcon } from '../../shared/ui/icon/icon';
import { BtfpPublicFooter } from './public-footer';
import { BtfpPublicTopbar } from './public-topbar';

/**
 * btfp-public-layout : โครงหน้าเว็บไซต์สาธารณะ (ผู้เยี่ยมชม / ผู้ขอรับทุนที่ยังไม่เข้าสู่ระบบ)
 *
 * แถบคุกกี้ (Figma: Public/Cookie Consent) กดยอมรับหรือปฏิเสธแล้วแถบหาย (ติ๊ก checkbox #btfp-cookie ที่ซ่อนไว้)
 * แถบกลับมาเมื่อโหลดหน้าใหม่ ตอนต่อระบบจริงต้องบันทึกการเลือก (เช่น cookie) และไม่แสดงซ้ำ
 */
@Component({
  selector: 'btfp-public-layout',
  imports: [RouterOutlet, RouterLink, Button, BtfpIcon, BtfpPublicTopbar, BtfpPublicFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-h-screen flex-col bg-[var(--btfp-surface-raised)]' },
  template: `
    <btfp-public-topbar />
    <main class="flex-1">
      <router-outlet />
    </main>
    <btfp-public-footer />

    <input id="btfp-cookie" type="checkbox" class="peer sr-only" aria-hidden="true" tabindex="-1" />
    <section
      class="cookie fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-[1120px] flex-col gap-4 p-5 peer-checked:hidden md:flex-row md:items-center md:gap-6 md:px-6"
      aria-label="การใช้คุกกี้"
    >
      <span class="cookie__icon hidden md:grid"><btfp-icon name="cookie" size="22" /></span>
      <div class="min-w-0 flex-1">
        <h2 class="cookie__title">เว็บไซต์นี้ใช้คุกกี้</h2>
        <p class="cookie__text">
          เราใช้คุกกี้ที่จำเป็นเพื่อให้เว็บไซต์ทำงานได้ และคุกกี้วิเคราะห์เพื่อปรับปรุงบริการ
          ท่านเลือกยอมรับหรือปฏิเสธคุกกี้ที่ไม่จำเป็นได้ ตามนโยบายคุ้มครองข้อมูลส่วนบุคคล
        </p>
      </div>
      <div class="flex shrink-0 flex-wrap items-center gap-2">
        <a routerLink="/policy" class="cookie__link">ตั้งค่าคุกกี้</a>
        <p-button outlined severity="secondary" label="ปฏิเสธที่ไม่จำเป็น" (onClick)="dismiss()" />
        <p-button label="ยอมรับทั้งหมด" (onClick)="dismiss()" />
      </div>
    </section>
  `,
  styles: `
    .cookie {
      background: var(--btfp-surface-raised);
      border: 1px solid var(--btfp-border-default);
      border-radius: var(--btfp-radius-card);
      box-shadow: var(--btfp-shadow-3);
    }
    .cookie__icon {
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: var(--btfp-radius-full);
      background: var(--btfp-info-bg);
      color: var(--btfp-icon-action);
    }
    .cookie__title {
      font-size: 16px;
    }
    .cookie__text {
      margin: 4px 0 0;
      font-size: 14px;
      color: var(--btfp-text-secondary);
    }
    .cookie__link {
      padding: 0 8px;
      font-weight: 500;
      color: var(--btfp-action-link);
      text-decoration: none;
    }
  `,
})
export class BtfpPublicLayout {
  /** ปิดแถบคุกกี้: ติ๊ก checkbox ที่ซ่อน (layout ไม่ใช่ไฟล์ของหน้า จึงมีโค้ดเล็กน้อยได้) */
  protected dismiss(): void {
    const box = document.getElementById('btfp-cookie') as HTMLInputElement | null;
    if (box) box.checked = true;
  }
}
