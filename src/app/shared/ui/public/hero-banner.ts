import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { BtfpIcon } from '../icon/icon';

/**
 * btfp-hero-slide : สไลด์หนึ่งแผ่นใน btfp-hero-banner (Figma: Domain/Hero Banner, Slide=1/2/3)
 *
 * ตามกฎหลังบ้าน CT-01 (เนื้อหาเว็บไซต์: Banner) ที่ยืนยันแล้ว
 * - รูปเดียวใช้ทั้งคอมพิวเตอร์และมือถือ ขนาด 1920x720 จอที่สัดส่วนต่างไปจะครอปช่วงกลางของรูป (object-fit: cover)
 * - รูปห้ามมีตัวหนังสือ หัวข้อ คำอธิบาย ป้ายกำกับ และปุ่มเป็นข้อความ HTML ที่ระบบวางทับ
 * ใส่ overlay เพื่อทับสีน้ำเงินไล่ระดับให้อ่านตัวหนังสือสีขาวได้ ใส่ h1/h2 (หัวข้อ) p (คำอธิบาย) และปุ่มไว้ข้างใน ตัวอักษรจัดให้แล้ว
 *
 * @example
 * <btfp-hero-slide image="images/landing/hero-slide-2.jpg" overlay tag="ทุนประเภท 2 เปิดรับแล้ว" tagSeverity="success">
 *   <h2>ทุนวิจัยและพัฒนา<br />เพื่อประโยชน์สาธารณะ</h2>
 *   <p>ยื่นข้อเสนอได้ถึงวันที่ 31 ต.ค. 2569</p>
 *   <p-button size="large" routerLink="/login">...</p-button>
 * </btfp-hero-slide>
 */
@Component({
  selector: 'btfp-hero-slide',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'btfp-hero-slide',
    role: 'group',
    'aria-roledescription': 'สไลด์',
    '[class.is-active]': 'active()',
    '[attr.aria-label]': 'label()',
    '[attr.inert]': 'active() ? null : ""',
    '[attr.aria-hidden]': 'active() ? null : "true"',
  },
  template: `
    <img class="btfp-hero-slide__img" [src]="image()" [alt]="alt()" draggable="false" />
    @if (overlay()) {
      <div class="btfp-hero-slide__overlay"></div>
    }
    <div class="btfp-hero-slide__frame">
      <div class="btfp-hero-slide__content">
        @if (tag()) {
          <span class="btfp-hero-slide__tag" [attr.data-severity]="tagSeverity()">{{ tag() }}</span>
        }
        <ng-content />
      </div>
    </div>
  `,
  styles: `
    @layer btfp {
      .btfp-hero-slide {
        position: absolute;
        inset: 0;
        display: block;
        opacity: 0;
        transition: opacity 600ms ease;
      }
      .btfp-hero-slide.is-active {
        opacity: 1;
        z-index: 1;
      }
      .btfp-hero-slide__img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        user-select: none;
      }
      .btfp-hero-slide__overlay {
        position: absolute;
        inset: 0;
        background: var(--p-hero-overlay-mobile);
      }
      .btfp-hero-slide__frame {
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
        padding: 24px 16px 56px;
      }
      .btfp-hero-slide__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
      }
      .btfp-hero-slide__tag {
        display: inline-flex;
        align-items: center;
        height: 32px;
        padding: 0 12px;
        border: 1px solid var(--p-info-border);
        border-radius: var(--p-radius-tag);
        background: var(--p-info-bg);
        font-size: var(--p-typography-body-s-size);
        color: var(--p-info-text);
      }
      .btfp-hero-slide__tag[data-severity='success'] {
        border-color: var(--p-success-border);
        background: var(--p-success-bg);
        color: var(--p-success-text);
      }
      .btfp-hero-slide__tag[data-severity='warn'] {
        border-color: var(--p-warning-border);
        background: var(--p-warning-bg);
        color: var(--p-warning-text);
      }
      .btfp-hero-slide__content :is(h1, h2) {
        margin: 0;
        font-family: var(--p-font-heading);
        /* หัวข้อ: มือถือ H1, แท็บเล็ต Display, จอใหญ่ Display/XL */
        font-size: var(--p-typography-h1-size);
        font-weight: var(--p-typography-h1-weight);
        line-height: var(--p-line-height-heading);
        color: var(--p-text-inverse);
      }
      .btfp-hero-slide__content p {
        margin: 0;
        font-size: var(--p-typography-body-size);
        line-height: var(--p-line-height-body);
        color: var(--p-text-inverse);
      }

      @media (min-width: 768px) {
        /* Figma: เนื้อหาเริ่มที่ y190 สูงกว่ากึ่งกลาง 10px */
        .btfp-hero-slide__frame {
          padding: 0 96px 20px;
        }
        .btfp-hero-slide__overlay {
          background: var(--p-hero-overlay);
        }
        .btfp-hero-slide__content :is(h1, h2) {
          font-size: var(--p-typography-display-size);
        }
        .btfp-hero-slide__content p {
          font-size: var(--p-typography-body-l-size);
        }
      }
      @media (min-width: 1280px) {
        .btfp-hero-slide__content :is(h1, h2) {
          font-size: var(--p-typography-display-xl-size);
          line-height: var(--p-line-height-display-xl);
        }
      }
    }
  `,
})
export class BtfpHeroSlide {
  readonly image = input.required<string>();
  readonly alt = input('');
  /** ทับสีน้ำเงินไล่ระดับจากซ้าย เพื่อให้อ่านข้อความสีขาวได้ */
  readonly overlay = input(false, { transform: booleanAttribute });
  readonly tag = input('');
  readonly tagSeverity = input<'info' | 'success' | 'warn'>('info');
  /** ตั้งโดย btfp-hero-banner */
  readonly active = signal(false);
  readonly label = signal('');
}

/**
 * btfp-hero-banner : ป้ายสไลด์ด้านบนของหน้าเว็บไซต์สาธารณะ (Figma: Domain/Hero Banner)
 *
 * - สูง 720px ที่จอ 1920 (สัดส่วน 8:3) จอเล็กสูงอย่างน้อย 440px ภาพตัดขอบให้เต็มกรอบ
 * - เลื่อนอัตโนมัติทุก 4 วินาที (interval="0" เพื่อปิด) หยุดเมื่อชี้เมาส์หรือโฟกัสอยู่ในป้าย
 *   และไม่เลื่อนเองถ้าผู้ใช้ตั้งค่าลดการเคลื่อนไหว (prefers-reduced-motion)
 * - ลูกศรซ้ายขวา (ซ่อนบนจอเล็กกว่า 768px) ปัดซ้ายขวาบนจอสัมผัส จุดด้านล่างบอกและเลือกสไลด์
 *
 * ทำไมไม่ใช้ p-carousel / p-galleria: สองตัวนี้ต้องส่งรายการผ่าน [value] (binding)
 * แต่หน้าหุ่นจำลองห้ามมี binding จึงรับสไลด์เป็น btfp-hero-slide ที่ใส่ attribute ธรรมดา
 *
 * @example
 * <btfp-hero-banner label="ประกาศและผลงานเด่น">
 *   <btfp-hero-slide image="..." overlay tag="...">...</btfp-hero-slide>
 * </btfp-hero-banner>
 */
@Component({
  selector: 'btfp-hero-banner',
  imports: [BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'btfp-hero-banner',
    role: 'region',
    'aria-roledescription': 'สไลด์โชว์',
    '[attr.aria-label]': 'label()',
    '(mouseenter)': 'hovered.set(true)',
    '(mouseleave)': 'hovered.set(false)',
    '(focusin)': 'focused.set(true)',
    '(focusout)': 'onFocusOut($event)',
    '(keydown.arrowleft)': 'prev()',
    '(keydown.arrowright)': 'next()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointerup)': 'onPointerUp($event)',
  },
  template: `
    <div class="viewport" aria-live="off">
      <ng-content />
    </div>

    @if (count() > 1) {
      <button type="button" class="arrow arrow--prev" aria-label="สไลด์ก่อนหน้า" (click)="prev()">
        <btfp-icon name="pi-chevron-left" size="24" />
      </button>
      <button type="button" class="arrow arrow--next" aria-label="สไลด์ถัดไป" (click)="next()">
        <btfp-icon name="pi-chevron-right" size="24" />
      </button>

      <div class="dots">
        @for (s of slides(); track $index) {
          <button
            type="button"
            class="dot"
            [class.is-active]="$index === index()"
            [attr.aria-label]="'ไปสไลด์ที่ ' + ($index + 1)"
            [attr.aria-current]="$index === index() ? 'true' : null"
            (click)="go($index)"
          ></button>
        }
      </div>
    }
  `,
  styles: `
    :host {
      --p-hero-h: max(37.5cqw, 440px);
      position: relative;
      display: block;
      container-type: inline-size;
      overflow: hidden;
      background: var(--p-navy-900);
      touch-action: pan-y;
    }
    .viewport {
      position: relative;
      height: var(--p-hero-h);
    }
    .arrow {
      position: absolute;
      top: 50%;
      z-index: 2;
      display: none;
      place-items: center;
      width: 48px;
      height: 48px;
      margin-top: -24px;
      border: 0;
      border-radius: 24px;
      background: var(--p-hero-control-bg);
      box-shadow: var(--p-hero-control-shadow);
      color: var(--p-icon-default);
      cursor: pointer;
    }
    .arrow:hover {
      background: var(--p-surface-raised);
    }
    .arrow:focus-visible,
    .dot:focus-visible {
      outline: 2px solid var(--p-surface-raised);
      outline-offset: 2px;
    }
    .arrow--prev {
      left: 40px;
    }
    .arrow--next {
      right: 40px;
    }
    @media (min-width: 768px) {
      .arrow {
        display: grid;
      }
    }
    .dots {
      position: absolute;
      bottom: 30px;
      left: 50%;
      z-index: 2;
      display: flex;
      gap: 8px;
      transform: translateX(-50%);
    }
    .dot {
      width: 10px;
      height: 10px;
      padding: 0;
      border: 0;
      border-radius: 5px;
      background: var(--p-hero-dot);
      box-shadow: var(--p-hero-control-shadow);
      cursor: pointer;
      transition: width 300ms ease;
    }
    .dot.is-active {
      width: 32px;
      background: var(--p-action-primary);
    }
  `,
})
export class BtfpHeroBanner {
  /** ชื่อของป้ายสำหรับโปรแกรมอ่านหน้าจอ */
  readonly label = input('ข่าวเด่น');
  /** เวลาเลื่อนอัตโนมัติ (มิลลิวินาที) ใส่ 0 เพื่อปิด */
  readonly interval = input(4000, { transform: numberAttribute });

  protected readonly slides = contentChildren(BtfpHeroSlide);
  protected readonly count = computed(() => this.slides().length);
  protected readonly index = signal(0);
  protected readonly hovered = signal(false);
  protected readonly focused = signal(false);

  private readonly host = inject(ElementRef<HTMLElement>);
  private timer: ReturnType<typeof setInterval> | undefined;
  private pointerX: number | null = null;

  constructor() {
    effect(() => {
      const list = this.slides();
      const current = this.index();
      list.forEach((s, i) => {
        s.active.set(i === current);
        s.label.set(`${i + 1} จาก ${list.length}`);
      });
    });

    afterNextRender(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (this.interval() > 0 && !reduce) {
        this.timer = setInterval(() => {
          if (!this.hovered() && !this.focused() && !document.hidden) this.next();
        }, this.interval());
      }
    });
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
  }

  next(): void {
    const n = this.count();
    if (n) this.index.update((i) => (i + 1) % n);
  }

  prev(): void {
    const n = this.count();
    if (n) this.index.update((i) => (i - 1 + n) % n);
  }

  go(i: number): void {
    this.index.set(i);
  }

  protected onFocusOut(e: FocusEvent): void {
    if (!this.host.nativeElement.contains(e.relatedTarget as Node | null)) this.focused.set(false);
  }

  protected onPointerDown(e: PointerEvent): void {
    this.pointerX = e.pointerType === 'mouse' ? null : e.clientX;
  }

  protected onPointerUp(e: PointerEvent): void {
    if (this.pointerX === null) return;
    const dx = e.clientX - this.pointerX;
    this.pointerX = null;
    if (Math.abs(dx) > 40) (dx < 0 ? this.next() : this.prev());
  }
}
