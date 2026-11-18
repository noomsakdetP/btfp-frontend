import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * pReveal : ใส่ `data-revealed` ให้ลูกที่มี `data-reveal` เมื่อเลื่อนมาเห็นครั้งแรก
 *
 * หน้ากำหนดหน้าตาตอนก่อนและหลังเห็นเองด้วย CSS เช่น เส้นใต้ค่อย ๆ ปรากฏ
 * ผู้ใช้ที่ตั้งเครื่องให้ลดการเคลื่อนไหวเห็นสถานะสุดท้ายทันที
 *
 * @example
 * <main pReveal><span class="p-wavy" data-reveal>ทุน</span></main>
 */
@Directive({ selector: '[pReveal]' })
export class Reveal {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const items = Array.from(host.querySelectorAll<HTMLElement>('[data-reveal]'));
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach((el) => el.setAttribute('data-revealed', ''));
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.setAttribute('data-revealed', '');
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '0px 0px -15% 0px' },
      );
      items.forEach((el) => observer.observe(el));
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
