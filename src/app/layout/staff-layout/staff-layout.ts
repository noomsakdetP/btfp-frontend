import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

/**
 * p-staff-layout : โครงหน้าของเจ้าหน้าที่ (เมนูซ้าย + แถบบน + เนื้อหา)
 *
 * Responsive (ไม่มี logic ใน TypeScript)
 * - จอ lg (1024px) ขึ้นไป: เมนูซ้ายแสดงตลอด
 * - จอเล็กกว่า: เมนูซ่อน กดปุ่มเมนูบนแถบบนเพื่อเลื่อนเมนูออกมา
 *   ใช้ checkbox ที่ซ่อนอยู่ (#p-nav-toggle) + class peer-checked ของ Tailwind ล้วน
 *
 * p-confirmdialog วางไว้ที่นี่ที่เดียว ใช้ร่วมกันทุกหน้า (เช่น ป๊อปอัปยืนยันการลบของ p-row-actions)
 */
@Component({
  selector: 'p-staff-layout',
  imports: [RouterOutlet, Sidebar, Topbar, ConfirmDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-h-screen' },
  template: `
    <input id="p-nav-toggle" type="checkbox" class="peer sr-only" aria-label="เปิดปิดเมนู" />

    <!-- ฉากหลังมืดตอนเปิดเมนูบนจอเล็ก กดเพื่อปิด -->
    <label
      for="p-nav-toggle"
      class="fixed inset-0 z-30 hidden bg-black/40 peer-checked:block lg:peer-checked:hidden"
      aria-hidden="true"
    ></label>

    <p-sidebar
      class="fixed inset-y-0 left-0 z-40 -translate-x-full overflow-y-auto transition-transform duration-200 peer-checked:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0"
    />

    <div class="flex min-w-0 flex-1 flex-col">
      <p-topbar />
      <main class="flex-1 px-4 pt-4 pb-10 md:px-6 md:pt-6 xl:px-10 xl:pb-12">
        <router-outlet />
      </main>
    </div>

    <p-confirmdialog styleClass="w-[440px] max-w-[calc(100vw-32px)]" />
  `,
})
export class StaffLayout {}
