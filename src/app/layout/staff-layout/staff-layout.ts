import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { BtfpSidebar } from '../sidebar/sidebar';
import { BtfpTopbar } from '../topbar/topbar';

/**
 * btfp-staff-layout : โครงหน้าของเจ้าหน้าที่ (เมนูซ้าย + แถบบน + เนื้อหา)
 * p-confirmdialog วางไว้ที่นี่ที่เดียว ใช้ร่วมกันทุกหน้า (เช่น ป๊อปอัปยืนยันการลบของ btfp-row-actions)
 */
@Component({
  selector: 'btfp-staff-layout',
  imports: [RouterOutlet, BtfpSidebar, BtfpTopbar, ConfirmDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <btfp-sidebar />
    <div class="layout__main">
      <btfp-topbar />
      <main class="layout__content">
        <router-outlet />
      </main>
    </div>
    <p-confirmdialog [style]="{ width: '440px' }" />
  `,
  styles: `
    :host {
      display: flex;
      min-height: 100vh;
    }
    .layout__main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    .layout__content {
      flex: 1;
      padding: 24px 40px 48px;
    }
  `,
})
export class BtfpStaffLayout {}
