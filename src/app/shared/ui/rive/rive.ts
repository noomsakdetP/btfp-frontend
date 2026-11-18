import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Alignment, Fit, Layout, Rive, RuntimeLoader } from '@rive-app/canvas-lite';

/** ไฟล์ wasm ของ Rive เสิร์ฟจากเว็บเราเอง (angular.json และ .storybook/main.ts คัดลอกไว้ที่ /rive-wasm) ไม่โหลดจาก CDN */
RuntimeLoader.setWasmUrl('/rive-wasm/rive.wasm');

/**
 * p-rive : แสดงภาพเคลื่อนไหวจากไฟล์ Rive (.riv)
 *
 * PrimeNG ไม่มี component นี้ ใช้ runtime @rive-app/canvas-lite
 * - แสดงภาพสำรอง (fallback) ก่อนไฟล์ Rive โหลดเสร็จ และเมื่อโหลดไม่สำเร็จ
 * - ผู้ใช้ที่ตั้งเครื่องให้ลดการเคลื่อนไหว (prefers-reduced-motion) เห็นแค่ภาพสำรอง ไม่โหลด Rive
 * - ภาพเป็นภาพประกอบ ไม่ใช่เนื้อหา ถ้าไม่ใส่ alt จะซ่อนจากโปรแกรมอ่านหน้าจอ
 *
 * @example
 * <p-rive src="rive/login-art.riv" fallback="images/login-new/login-illustration.svg" />
 */
@Component({
  selector: 'p-rive',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'alt() ? "img" : null',
    '[attr.aria-label]': 'alt() || null',
    '[attr.aria-hidden]': 'alt() ? null : "true"',
  },
  template: `
    <div class="rive__frame">
      @if (fallback() && !ready()) {
        <img class="rive__fallback" [src]="fallback()" alt="" />
      }
      <canvas #canvas class="rive__canvas" [class.rive__canvas--ready]="ready()"></canvas>
    </div>
  `,
  styles: `
    /* ไม่ตั้ง position ที่ :host เพื่อให้หน้าใช้ class ของ Tailwind (absolute ฯลฯ) จัดวางได้ */
    :host {
      display: block;
    }
    .rive__frame {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .rive__fallback,
    .rive__canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    .rive__fallback {
      object-fit: contain;
    }
    :host([fit='cover']) .rive__fallback {
      object-fit: cover;
    }
    :host([align='bottom']) .rive__fallback {
      object-position: bottom;
    }
    .rive__canvas {
      opacity: 0;
      transition: opacity 0.3s ease-out;
    }
    .rive__canvas--ready {
      opacity: 1;
    }
  `,
})
export class RiveView {
  /** path ของไฟล์ .riv เทียบกับโฟลเดอร์ public เช่น rive/login-art.riv */
  readonly src = input.required<string>();
  /** ชื่อ Artboard ที่จะแสดง ไม่ใส่ = Artboard แรกในไฟล์ */
  readonly artboard = input<string>();
  /** ชื่อ State Machine ที่จะเล่น ไม่ใส่ = State Machine ค่าเริ่มต้นของ Artboard */
  readonly stateMachine = input<string>();
  /** ภาพนิ่งสำรอง (svg หรือ png) แสดงก่อนโหลดเสร็จ เมื่อโหลดไม่สำเร็จ และเมื่อผู้ใช้ตั้งเครื่องให้ลดการเคลื่อนไหว */
  readonly fallback = input<string>();
  /** วางภาพในกรอบแบบไหน: contain (ทั้งภาพอยู่ในกรอบ) หรือ cover (เต็มกรอบ ตัดส่วนเกิน) */
  readonly fit = input<'contain' | 'cover'>('contain');
  /** ผูก View Model เริ่มต้นของ Artboard (data binding) ใส่เมื่อไฟล์มี View Model เช่น ปุ่มที่รับค่า isHover */
  readonly autoBind = input(false);
  /** จัดภาพในกรอบ: กลางกรอบ หรือชิดล่าง (ใช้กับภาพที่มีพื้นดินด้านล่าง) */
  readonly align = input<'center' | 'bottom'>('center');
  /** คำอธิบายภาพสำหรับโปรแกรมอ่านหน้าจอ ไม่ใส่ = ภาพประกอบที่ซ่อนจากโปรแกรมอ่านหน้าจอ */
  readonly alt = input<string>();

  protected readonly ready = signal(false);
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private rive?: Rive;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const canvas = this.canvas().nativeElement;
      this.rive = new Rive({
        src: this.src(),
        canvas,
        artboard: this.artboard(),
        stateMachine: this.stateMachine(),
        autoplay: true,
        autoBind: this.autoBind(),
        layout: new Layout({ fit: this.fit() === 'cover' ? Fit.Cover : Fit.Contain, alignment: this.align() === 'bottom' ? Alignment.BottomCenter : Alignment.Center }),
        onLoad: () => {
          this.rive?.resizeDrawingSurfaceToCanvas();
          this.ready.set(true);
        },
        onLoadError: () => this.ready.set(false),
      });

      const resize = new ResizeObserver(() => this.rive?.resizeDrawingSurfaceToCanvas());
      resize.observe(this.host.nativeElement);

      destroyRef.onDestroy(() => {
        resize.disconnect();
        this.rive?.cleanup();
      });
    });
  }
}
