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
    <header class="topbar">
      <a class="topbar__brand" routerLink="/" aria-label="ไปหน้าแรก">
        <span class="topbar__logos">
          <!-- โลโก้ตัวแทน ให้แทนที่ไฟล์ใน public/brand ด้วยโลโก้จริง -->
          <img src="brand/logo-nbtc.svg" alt="กสทช." width="27" height="40" />
          <span class="topbar__logo-divider"></span>
          <img src="brand/logo-btfp.svg" alt="กทปส." width="29" height="40" />
        </span>
        <span class="topbar__divider"></span>
        <span class="topbar__title">
          <span class="topbar__system">ระบบบริหารจัดการทุน กทปส.</span>
          <span class="topbar__org">สำนักงาน กสทช.</span>
        </span>
      </a>

      <div class="topbar__actions">
        <span class="topbar__bell">
          <p-button [text]="true" severity="secondary" ariaLabel="การแจ้งเตือน มีรายการใหม่">
            <btfp-icon name="bell" size="20" />
          </p-button>
          <span class="topbar__unread" aria-hidden="true"></span>
        </span>
        <span class="topbar__divider topbar__divider--short"></span>
        <button type="button" class="topbar__user" aria-haspopup="menu">
          <p-avatar label="กม" shape="circle" />
          <span class="topbar__user-text">
            <span class="topbar__user-name">กมลวรรณ ศรีสุข</span>
            <span class="topbar__user-role">เจ้าหน้าที่ฝ่ายพิจารณาทุน</span>
          </span>
          <btfp-icon name="chevron-down" size="16" />
        </button>
      </div>
    </header>
  `,
  styleUrl: './topbar.scss',
})
export class BtfpTopbar {}
