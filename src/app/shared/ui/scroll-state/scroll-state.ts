import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';

/**
 * pScrollState : ใส่ attribute `data-scrolled` ให้ element เมื่อผู้ใช้เลื่อนหน้าลงเกินระยะที่กำหนด
 *
 * ใช้ทำแถบบนที่หุบเป็นโลโก้เล็กตอนเลื่อนลง (แบบ mozillafoundation.org) หน้ากำหนดหน้าตาเองด้วย class ของ Tailwind
 * เช่น `group/page` บน element นี้ แล้วใช้ `group-data-[scrolled]/page:hidden` กับลูก
 * มีระยะกันกระตุก: หุบเมื่อเลื่อนลงเกินค่าที่กำหนด และกางกลับเมื่อเลื่อนขึ้นจนเหลือน้อยกว่า 1 ใน 4 ของค่านั้น
 *
 * @example
 * <div pScrollState="160" class="group/page">...</div>
 */
@Directive({ selector: '[pScrollState]' })
export class ScrollState {
  /** ระยะเลื่อนลง (px) ที่เริ่มถือว่าเลื่อนแล้ว */
  readonly pScrollState = input(160, { transform: (v: unknown) => numberAttribute(v, 160) });

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      let scrolled = false;
      const update = () => {
        const y = window.scrollY;
        const next = scrolled ? y > this.pScrollState() / 4 : y > this.pScrollState();
        if (next !== scrolled) {
          scrolled = next;
          host.toggleAttribute('data-scrolled', scrolled);
        }
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
    });
  }
}
