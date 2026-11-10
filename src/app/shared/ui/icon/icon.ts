import { ChangeDetectionStrategy, Component, computed, input, isDevMode, numberAttribute } from '@angular/core';
import { BTFP_CENTRAL_ICONS } from '../../../theme/central-icons';

/**
 * p-ui-icon : แสดงไอคอนชุดเดียวกับ Figma ด้วยขนาดเป็น px ตรงตามแบบ
 *
 * - ชื่อขึ้นต้นด้วย pi- = PrimeIcons 7.0.0 (แสดงเป็น <i class="pi pi-ชื่อ">) เช่น pi-eye, pi-trash
 * - ชื่ออื่น = Icon กลาง ไอคอนที่ PrimeIcons ไม่มี วาดให้เข้ากับ PrimeIcons (src/app/theme/central-icons.ts)
 *
 * ใช้เมื่อต้องการขนาดตรงตาม Figma (14, 16, 18, 20, 22, 24 ฯลฯ) หรือชื่อไอคอนมาจากข้อมูล
 * ไอคอน PrimeIcons ทั่วไปเขียน <i class="pi pi-ชื่อ"></i> ตรง ๆ ได้
 *
 * @example
 * <p-ui-icon name="pi-eye" size="20" />
 * <p-ui-icon name="file-text" size="16" />
 *
 * สีของไอคอนใช้ currentColor ตามสีตัวอักษรของตัวที่ครอบอยู่
 */
@Component({
  selector: 'p-ui-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    @if (prime()) {
      <i [class]="'pi ' + name()" [style.font-size.px]="size()" [style.width.px]="size()" [style.height.px]="size()"></i>
    } @else {
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.viewBox]="viewBox()"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.stroke-width]="stroke()"
    >
      @for (node of nodes(); track $index) {
        @let a = node[1];
        @switch (node[0]) {
          @case ('path') {
            <svg:path [attr.d]="a['d']" />
          }
          @case ('circle') {
            <svg:circle [attr.cx]="a['cx']" [attr.cy]="a['cy']" [attr.r]="a['r']" />
          }
          @case ('rect') {
            <svg:rect [attr.x]="a['x']" [attr.y]="a['y']" [attr.width]="a['width']" [attr.height]="a['height']" [attr.rx]="a['rx']" [attr.ry]="a['ry']" />
          }
          @case ('line') {
            <svg:line [attr.x1]="a['x1']" [attr.y1]="a['y1']" [attr.x2]="a['x2']" [attr.y2]="a['y2']" />
          }
          @case ('polyline') {
            <svg:polyline [attr.points]="a['points']" />
          }
          @case ('polygon') {
            <svg:polygon [attr.points]="a['points']" />
          }
          @case ('ellipse') {
            <svg:ellipse [attr.cx]="a['cx']" [attr.cy]="a['cy']" [attr.rx]="a['rx']" [attr.ry]="a['ry']" />
          }
        }
      }
    </svg>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      line-height: 0;
    }
    i {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
  `,
})
export class UiIcon {
  /** pi-ชื่อ (PrimeIcons) หรือชื่อ Icon กลางใน src/app/theme/central-icons.ts */
  readonly name = input.required<string>();
  readonly size = input(20, { transform: numberAttribute });
  /** ความหนาเส้นของ Icon กลาง ไม่ใส่ = 1.5 (ย่อขยายตามรูปเหมือน PrimeIcons) */
  readonly strokeWidth = input<number | undefined, unknown>(undefined, {
    transform: (v: unknown) => (v === undefined || v === null || v === '' ? undefined : numberAttribute(v)),
  });

  protected readonly prime = computed(() => this.name().startsWith('pi-'));
  private readonly central = computed(() => BTFP_CENTRAL_ICONS[this.name()]);

  /** viewBox ตัดให้รูปเต็มกรอบแบบฟอนต์ PrimeIcons */
  protected readonly viewBox = computed(() => this.central()?.viewBox ?? '0 0 24 24');

  protected readonly stroke = computed(() => this.strokeWidth() ?? 1.5);

  protected readonly nodes = computed(() => {
    if (this.prime()) return [];
    const icon = this.central()?.nodes;
    if (!icon && isDevMode()) {
      console.warn(`[p-ui-icon] ไม่พบไอคอน "${this.name()}" ให้ใช้ PrimeIcons หรือเพิ่มใน src/app/theme/central-icons.ts`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (icon ?? []) as [string, Record<string, any>][];
  });
}
