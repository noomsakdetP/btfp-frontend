import { ChangeDetectionStrategy, Component, computed, input, isDevMode, numberAttribute } from '@angular/core';
import { BTFP_CENTRAL_ICONS } from '../../../theme/central-icons';
import { BTFP_ICONS } from '../../../theme/icons';

/**
 * btfp-icon : Icon กลาง (ไอคอนที่ PrimeIcons ไม่มี) และไอคอน Lucide เดิมที่ยังรอย้ายเป็น PrimeIcons
 *
 * ไอคอนที่ PrimeIcons มี ให้ใช้ <i class="pi pi-ชื่อ"></i> แทน
 *
 * @example
 * <btfp-icon name="file-text" size="16" />   Icon กลาง (src/app/theme/central-icons.ts) วาดให้เข้ากับ PrimeIcons
 * <btfp-icon name="eye" size="20" />          ไอคอนเดิม (src/app/theme/icons.ts) เส้น 1.5 (16px ลงมา 1.25)
 *
 * สีของไอคอนใช้ currentColor ตามสีตัวอักษรของตัวที่ครอบอยู่
 */
@Component({
  selector: 'btfp-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
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
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      line-height: 0;
    }
  `,
})
export class BtfpIcon {
  /** ชื่อไอคอนแบบ kebab-case ต้องลงทะเบียนใน src/app/theme/icons.ts ก่อน */
  readonly name = input.required<string>();
  readonly size = input(20, { transform: numberAttribute });
  /** ความหนาเส้น ไม่ใส่ = ตาม Figma: 1.5 และ 1.25 เมื่อไอคอนเล็กกว่าหรือเท่ากับ 16px */
  readonly strokeWidth = input<number | undefined, unknown>(undefined, {
    transform: (v: unknown) => (v === undefined || v === null || v === '' ? undefined : numberAttribute(v)),
  });

  private readonly central = computed(() => BTFP_CENTRAL_ICONS[this.name()]);

  /** Icon กลางตัด viewBox ให้รูปเต็มกรอบแบบ PrimeIcons ไอคอนเดิมใช้กรอบ 24 ของ Lucide */
  protected readonly viewBox = computed(() => this.central()?.viewBox ?? '0 0 24 24');

  /** Icon กลางเส้น 1.5 คงที่ (ย่อขยายตามรูปเหมือน PrimeIcons) ไอคอนเดิม 1.5 และ 1.25 เมื่อ 16px ลงมา */
  protected readonly stroke = computed(
    () => this.strokeWidth() ?? (this.central() ? 1.5 : this.size() <= 16 ? 1.25 : 1.5),
  );

  protected readonly nodes = computed(() => {
    const icon = this.central()?.nodes ?? BTFP_ICONS[this.name()];
    if (!icon && isDevMode()) {
      console.warn(`[btfp-icon] ไม่พบไอคอน "${this.name()}" ให้ใช้ PrimeIcons หรือเพิ่มใน src/app/theme/central-icons.ts`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (icon ?? []) as [string, Record<string, any>][];
  });
}
