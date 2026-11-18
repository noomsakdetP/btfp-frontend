import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { RiveView, UiIcon } from '../../../shared/ui';

/** เข้าสู่ระบบ แนวใหม่ (ทดลอง รอลูกค้าเลือก)  Figma: แนวใหม่ (ทดลอง) > เข้าสู่ระบบ (แนวใหม่) 967:2965 */
@Component({
  selector: 'p-login-new-page',
  imports: [RouterLink, Button, InputText, UiIcon, RiveView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-new.html',
  styleUrl: './login-new.scss',
})
export class LoginNewPage {}
