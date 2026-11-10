import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiIcon } from '../../shared/ui/icon/icon';

/** p-sidebar : เมนูด้านซ้ายของเจ้าหน้าที่ */
@Component({
  selector: 'p-sidebar',
  imports: [RouterLink, RouterLinkActive, UiIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {}
