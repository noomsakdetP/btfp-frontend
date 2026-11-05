import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BtfpRouteProgress } from './shared/ui/route-progress/route-progress';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BtfpRouteProgress],
  // btfp-route-progress: แถบโหลดและวงกลมหมุนตอนเปลี่ยนเมนู ใช้กับทุกหน้า
  template: '<btfp-route-progress /><router-outlet />',
})
export class App {}
