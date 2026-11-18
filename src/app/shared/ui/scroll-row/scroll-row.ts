import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * pScrollRow : แถวการ์ดเลื่อนซ้ายขวาพร้อมปุ่มลูกศรและจุดบอกตำแหน่ง
 *
 * - ลูกที่มี `data-scroll-track` คือแถวที่เลื่อนได้ (overflow-x-auto)
 * - ปุ่ม `data-scroll="prev"` / `data-scroll="next"` เลื่อนทีละหน้า (เท่าจำนวนการ์ดที่เห็นเต็มใบ)
 * - จุด `data-scroll-dot` (ใส่กี่จุดก็ได้) จุดที่ตรงกับตำแหน่งปัจจุบันได้ `data-active`
 * - element นี้ได้ `data-at-start` เมื่ออยู่ซ้ายสุด และ `data-at-end` เมื่ออยู่ขวาสุด
 *   หน้าใช้ซ่อนลูกศรเอง เช่น `group/row` แล้ว `group-data-[at-start]/row:hidden`
 *
 * @example
 * <div pScrollRow class="group/row relative">
 *   <div data-scroll-track class="flex overflow-x-auto">...</div>
 *   <button data-scroll="prev" class="group-data-[at-start]/row:hidden">ก่อนหน้า</button>
 * </div>
 */
@Directive({ selector: '[pScrollRow]' })
export class ScrollRow {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const track = host.querySelector<HTMLElement>('[data-scroll-track]');
      if (!track) return;
      const dots = Array.from(host.querySelectorAll<HTMLElement>('[data-scroll-dot]'));

      const update = () => {
        const max = track.scrollWidth - track.clientWidth;
        host.toggleAttribute('data-at-start', track.scrollLeft <= 2);
        host.toggleAttribute('data-at-end', track.scrollLeft >= max - 2);
        const progress = max > 0 ? track.scrollLeft / max : 0;
        const active = Math.round(progress * (dots.length - 1));
        dots.forEach((d, i) => d.toggleAttribute('data-active', i === active));
      };

      const step = () => {
        const first = track.firstElementChild as HTMLElement | null;
        if (!first) return track.clientWidth;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const card = first.offsetWidth + gap;
        return card * Math.max(1, Math.floor((track.clientWidth + gap) / card));
      };

      const onClick = (event: Event) => {
        const btn = (event.target as HTMLElement).closest<HTMLElement>('[data-scroll]');
        if (!btn || !host.contains(btn)) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        track.scrollBy({ left: (btn.dataset['scroll'] === 'prev' ? -1 : 1) * step(), behavior: reduce ? 'auto' : 'smooth' });
      };

      update();
      track.addEventListener('scroll', update, { passive: true });
      host.addEventListener('click', onClick);
      const resize = new ResizeObserver(update);
      resize.observe(track);
      destroyRef.onDestroy(() => {
        track.removeEventListener('scroll', update);
        host.removeEventListener('click', onClick);
        resize.disconnect();
      });
    });
  }
}
