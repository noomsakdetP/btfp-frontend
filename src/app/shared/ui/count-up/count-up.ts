import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';

/**
 * pCountUp : ตัวเลขนับขึ้นจาก 0 เมื่อเลื่อนมาเห็น (สถิติ ตัวเลขสำคัญ)
 *
 * อ่านตัวเลขจากข้อความที่เขียนไว้ในหน้า เช่น "1,240 ล้าน" นับเฉพาะตัวเลข คงคอมมาและข้อความต่อท้ายไว้
 * โปรแกรมอ่านหน้าจออ่านค่าจริงเสมอ (ใส่ aria-label เป็นข้อความเดิม) ผู้ใช้ที่ตั้งเครื่องให้ลดการเคลื่อนไหวเห็นค่าจริงทันที
 *
 * @example
 * <dd pCountUp>1,240 ล้าน</dd>
 */
@Directive({ selector: '[pCountUp]' })
export class CountUp {
  /** เวลานับ (มิลลิวินาที) */
  readonly pCountUp = input(1400, { transform: (v: unknown) => numberAttribute(v, 1400) });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const original = el.textContent?.trim() ?? '';
      const match = original.match(/^([\d,]+)(.*)$/);
      if (!match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const target = Number(match[1].replace(/,/g, ''));
      const suffix = match[2];
      const format = (n: number) => n.toLocaleString('en-US') + suffix;
      el.setAttribute('aria-label', original);
      el.textContent = format(0);

      let frame = 0;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / this.pCountUp());
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = format(Math.round(target * eased));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        },
        { threshold: 0.4 },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }
}
