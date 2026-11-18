import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

/**
 * p-auto-rotate : เปลี่ยนสไลด์อัตโนมัติ (สไลด์ข่าว ขั้นตอนการสมัคร ฯลฯ)
 *
 * PrimeNG มี Carousel แต่ต้องส่งข้อมูลผ่าน binding ซึ่งหน้าหุ่นจำลองใช้ไม่ได้
 * component นี้จึงรับเนื้อหาเป็น markup ธรรมดา แล้วจัดการสถานะให้เอง
 *
 * - ลูกที่มี attribute `data-slide` คือสไลด์ สไลด์ที่แสดงอยู่ได้ attribute `data-active` (หน้ากำหนดหน้าตาเองด้วย CSS)
 * - ทุกสไลด์ได้ `data-pos` = ลำดับนับจากสไลด์ที่แสดง (0 = แสดงอยู่, 1 = ถัดไป, ...) ใช้ทำสไลด์ที่ภาพสลับตำแหน่งกัน
 * - ปุ่มที่มี `data-rotate="next"` หรือ `data-rotate="prev"` เลื่อนสไลด์ (อยู่ในสไลด์หรือนอกสไลด์ก็ได้)
 * - ปุ่มที่มี `data-goto="2"` ไปสไลด์ที่ 2 (เริ่มนับ 1) ใช้กับรายการขั้นตอนที่กดได้
 * - ข้อความที่มี `data-rotate-count` แสดง "1 / 3" ให้อัตโนมัติ
 * - หยุดเปลี่ยนเองเมื่อเมาส์ชี้หรือโฟกัสอยู่ข้างใน และเมื่อผู้ใช้ตั้งเครื่องให้ลดการเคลื่อนไหว
 *
 * @example
 * <p-auto-rotate interval="4000">
 *   <article data-slide>...</article>
 *   <article data-slide>...</article>
 *   <button data-rotate="next">ถัดไป</button>
 * </p-auto-rotate>
 */
@Component({
  selector: 'p-auto-rotate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  styles: `
    :host {
      display: block;
    }
  `,
  host: {
    '(click)': 'onClick($event)',
    '(mouseenter)': 'paused = true',
    '(mouseleave)': 'paused = false',
    '(focusin)': 'paused = true',
    '(focusout)': 'paused = false',
  },
})
export class AutoRotate {
  /** เวลาต่อสไลด์ (มิลลิวินาที) ใส่ 0 = ไม่เปลี่ยนเอง เปลี่ยนเฉพาะเมื่อกดปุ่ม */
  readonly interval = input(4000, { transform: numberAttribute });
  /** หยุดเปลี่ยนเองตอนเมาส์ชี้หรือโฟกัสอยู่ข้างใน */
  readonly pauseOnHover = input(true, { transform: booleanAttribute });

  protected paused = false;
  private index = 0;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.show(0);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!this.interval() || reduce) return;
      const timer = setInterval(() => {
        if (this.paused && this.pauseOnHover()) return;
        this.show(this.index + 1);
      }, this.interval());
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  protected onClick(event: Event): void {
    const target = (event.target as HTMLElement).closest<HTMLElement>('[data-rotate], [data-goto]');
    if (!target) return;
    const goto = target.dataset['goto'];
    if (goto) this.show(Number(goto) - 1);
    else this.show(this.index + (target.dataset['rotate'] === 'prev' ? -1 : 1));
  }

  private slides(): HTMLElement[] {
    return Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('[data-slide]'));
  }

  private show(i: number): void {
    const slides = this.slides();
    if (!slides.length) return;
    this.index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      s.toggleAttribute('data-active', n === this.index);
      s.toggleAttribute('inert', n !== this.index);
      s.dataset['pos'] = String((n - this.index + slides.length) % slides.length);
    });
    this.host.nativeElement.querySelectorAll<HTMLElement>('[data-goto]').forEach((b) => {
      b.toggleAttribute('data-active', Number(b.dataset['goto']) - 1 === this.index);
    });
    this.host.nativeElement.querySelectorAll<HTMLElement>('[data-rotate-count]').forEach((c) => {
      c.textContent = `${this.index + 1} / ${slides.length}`;
    });
  }
}
