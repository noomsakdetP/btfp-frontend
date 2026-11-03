import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BtfpIcon } from '../../shared/ui/icon/icon';

/** btfp-sidebar : เมนูด้านซ้ายของเจ้าหน้าที่ */
@Component({
  selector: 'btfp-sidebar',
  imports: [RouterLink, RouterLinkActive, BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class BtfpSidebar {}
