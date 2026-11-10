import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { BtfpRouteProgress } from './shared/ui/route-progress/route-progress';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BtfpRouteProgress, NgxUiLoaderModule],
  // btfp-route-progress: แถบโหลดและชั้นทับตอนเปลี่ยนเมนู ใช้กับทุกหน้า
  // ngxUiLoaderBlurred: เบลอหน้าเดิมระหว่างโหลด (ค่า blur ใน loader-providers.ts)
  template: '<btfp-route-progress /><div ngxUiLoaderBlurred><router-outlet /></div>',
})
export class App {}
