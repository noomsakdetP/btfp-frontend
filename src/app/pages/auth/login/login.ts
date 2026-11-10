import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { BtfpIcon } from '../../../shared/ui';

/** F-10 เข้าสู่ระบบ (ผู้ขอรับทุน) ขั้นที่ 1 อีเมลหรือเบอร์มือถือ  Figma 42:9007 */
@Component({
  selector: 'btfp-login-page',
  imports: [RouterLink, Button, InputText, BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginPage {}
