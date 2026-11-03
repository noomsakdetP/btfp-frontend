import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { BtfpIcon } from '../../shared/ui/icon/icon';

/** btfp-topbar : แถบด้านบน (Figma: Navigation/TopBar) */
@Component({
  selector: 'btfp-topbar',
  imports: [RouterLink, Avatar, Button, BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="topbar px-4 md:px-6">
      <div class="flex min-w-0 items-center gap-2">
        <!-- ปุ่มเมนูบนจอเล็ก: สั่งเปิดปิด checkbox #btfp-nav-toggle ใน btfp-staff-layout -->
        <label for="btfp-nav-toggle" class="topbar__menu grid place-items-center lg:hidden" aria-label="เปิดเมนู">
          <btfp-icon name="menu" size="22" />
        </label>
      <a class="topbar__brand min-w-0" routerLink="/" aria-label="ไปหน้าแรก">
        <span class="topbar__logos">
          <!-- โลโก้จาก Figma (Brand/Logo) -->
          <img src="brand/logo-nbtc.png" alt="กสทช." width="27" height="40" />
          <span class="topbar__logo-divider hidden sm:block"></span>
          <img class="hidden sm:block" src="brand/logo-btfp.png" alt="กทปส." width="29" height="40" />
        </span>
        <span class="topbar__divider hidden sm:block"></span>
        <span class="topbar__title min-w-0">
          <span class="topbar__system truncate">ระบบบริหารจัดการทุน กทปส.</span>
          <span class="topbar__org hidden sm:block">สำนักงาน กสทช.</span>
        </span>
      </a>
      </div>

      <div class="topbar__actions shrink-0 gap-2 md:gap-4">
        <span class="topbar__bell">
          <p-button text severity="secondary" ariaLabel="การแจ้งเตือน มีรายการใหม่">
            <btfp-icon name="bell" size="20" />
          </p-button>
          <span class="topbar__unread" aria-hidden="true"></span>
        </span>
        <span class="topbar__divider topbar__divider--short hidden md:block"></span>
        <button type="button" class="topbar__user" aria-haspopup="menu">
          <p-avatar label="กม" shape="circle" />
          <span class="topbar__user-text hidden md:flex">
            <span class="topbar__user-name">กมลวรรณ ศรีสุข</span>
            <span class="topbar__user-role">เจ้าหน้าที่ฝ่ายพิจารณาทุน</span>
          </span>
          <btfp-icon class="hidden md:inline-flex" name="chevron-down" size="16" />
        </button>
      </div>
    </header>
  `,
  styleUrl: './topbar.scss',
})
export class BtfpTopbar {}
