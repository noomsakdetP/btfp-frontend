import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from 'primeng/button';
import { BtfpIcon } from '../../shared/ui/icon/icon';

/**
 * btfp-public-topbar : แถบบนของเว็บไซต์สาธารณะ (Figma: Navigation/TopBar Type=front-office-guest)
 *
 * Responsive (ไม่มี logic)
 * - จอ xl (1280px) ขึ้นไป: เมนูเรียงแนวนอน
 * - จอเล็กกว่า: กดปุ่มเมนูเพื่อเปิดรายการ ใช้ checkbox ที่ซ่อน (#btfp-public-nav) + peer-checked ของ Tailwind
 */
@Component({
  selector: 'btfp-public-topbar',
  imports: [RouterLink, RouterLinkActive, Button, BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block sticky top-0 z-40' },
  template: `
    <header class="topbar">
      <div class="mx-auto flex h-16 max-w-[1920px] items-center gap-4 px-4 md:px-6 2xl:px-6">
        <!-- Figma: โลโก้ 2 ตัวห่าง 12px มีเส้นคั่นสูง 28px แล้วเส้นคั่นสูง 32px ก่อนชื่อระบบ (ห่าง 16px) -->
        <a class="flex min-w-0 items-center gap-4" routerLink="/" aria-label="ระบบบริหารจัดการทุน กทปส. หน้าแรก">
          <span class="flex shrink-0 items-center gap-3">
            <img src="brand/logo-nbtc.png" alt="กสทช." width="27" height="40" />
            <span class="logo-divider hidden sm:block"></span>
            <img class="hidden sm:block" src="brand/logo-btfp.png" alt="กทปส." width="29" height="40" />
          </span>
          <span class="logo-divider logo-divider--lg hidden sm:block"></span>
          <span class="flex min-w-0 flex-col">
            <span class="brand-title truncate">ระบบบริหารจัดการทุน กทปส.</span>
            <span class="brand-sub">สำหรับผู้ขอรับทุน</span>
          </span>
        </a>

        <!-- เมนูหลัก จอ xl ขึ้นไป (Figma: ห่างจากชื่อระบบ 32px) -->
        <nav class="ml-4 hidden h-full items-stretch gap-1 xl:flex" aria-label="เมนูหลัก">
          <a class="nav-link" routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">หน้าแรก</a>
          <a class="nav-link" routerLink="/grants" routerLinkActive="is-active">ประกาศทุน</a>
          <a class="nav-link" routerLink="/results" routerLinkActive="is-active">ผลงานทุน</a>
          <a class="nav-link" routerLink="/news" routerLinkActive="is-active">ข่าวสาร</a>
          <a class="nav-link" routerLink="/faq" routerLinkActive="is-active">คำถามที่พบบ่อย</a>
          <a class="nav-link" routerLink="/guide" routerLinkActive="is-active">คู่มือ</a>
          <a class="nav-link" routerLink="/contact" routerLinkActive="is-active">ติดต่อเรา</a>
        </nav>

        <div class="ml-auto flex shrink-0 items-center gap-2 md:gap-3">
          <p-button outlined severity="secondary" label="ลงทะเบียน" routerLink="/register" styleClass="hidden sm:inline-flex" />
          <p-button label="เข้าสู่ระบบ" routerLink="/login" />
          <label for="btfp-public-nav" class="menu-button grid place-items-center xl:hidden" aria-label="เปิดเมนู">
            <btfp-icon name="menu" size="22" />
          </label>
        </div>
      </div>
    </header>

    <!-- เมนูบนจอเล็ก -->
    <input id="btfp-public-nav" type="checkbox" class="peer sr-only" aria-label="เปิดปิดเมนู" />
    <nav class="mobile-nav hidden flex-col px-4 py-2 peer-checked:flex xl:peer-checked:hidden" aria-label="เมนูหลัก">
      <a routerLink="/">หน้าแรก</a>
      <a routerLink="/grants">ประกาศทุน</a>
      <a routerLink="/results">ผลงานทุน</a>
      <a routerLink="/news">ข่าวสาร</a>
      <a routerLink="/faq">คำถามที่พบบ่อย</a>
      <a routerLink="/guide">คู่มือ</a>
      <a routerLink="/contact">ติดต่อเรา</a>
      <a class="sm:hidden" routerLink="/register">ลงทะเบียน</a>
    </nav>
  `,
  styles: `
    .topbar {
      background: var(--p-surface-raised);
      border-bottom: 1px solid var(--p-border-default);
    }
    .logo-divider {
      width: 1px;
      height: 28px;
      background: var(--p-border-default);
    }
    .logo-divider--lg {
      height: 32px;
    }
    .brand-title {
      font-family: var(--p-font-heading);
      font-size: var(--p-typography-h4-size);
      font-weight: var(--p-typography-h4-weight);
      line-height: 1.35;
      color: var(--p-text-heading);
    }
    .brand-sub {
      font-size: var(--p-typography-caption-size);
      line-height: 18px;
      color: var(--p-text-secondary);
    }
    .nav-link {
      display: flex;
      align-items: center;
      padding: 0 12px;
      border-bottom: 2px solid transparent;
      font-size: var(--p-typography-body-s-size);
      color: var(--p-text-secondary);
      text-decoration: none;
    }
    .nav-link:hover {
      color: var(--p-text-primary);
    }
    .nav-link.is-active {
      border-bottom-color: var(--p-action-primary);
      color: var(--p-action-primary);
      font-weight: 500;
    }
    .menu-button {
      width: 40px;
      height: 40px;
      border-radius: var(--p-radius-button);
      color: var(--p-icon-default);
      cursor: pointer;
    }
    .menu-button:hover {
      background: var(--p-gray-100);
    }
    .mobile-nav {
      background: var(--p-surface-raised);
      border-bottom: 1px solid var(--p-border-default);
      box-shadow: var(--p-shadow-2);
    }
    .mobile-nav a {
      padding: 12px 4px;
      border-bottom: 1px solid var(--p-border-default);
      color: var(--p-text-primary);
      text-decoration: none;
    }
    .mobile-nav a:last-child {
      border-bottom: 0;
    }
  `,
})
export class BtfpPublicTopbar {}
