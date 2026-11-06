import { ChangeDetectionStrategy, Component, booleanAttribute, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { BTFP_DATE_FORMAT, BtfpBuddhistEra } from './buddhist-era.directive';

/**
 * btfp-datepicker : ช่องเลือกวันที่ แสดงปีเป็น พ.ศ. (Figma: Forms/DatePicker 4:1571)
 *
 * ใช้แทน p-datepicker ทุกที่ในระบบ
 * - ค่าที่ได้จาก ngModel / formControl เป็น Date ปกติ (ค.ศ.)
 * - ผู้ใช้เห็นเป็นรูปแบบราชการ เช่น 1 ม.ค. 2569 (ปี พ.ศ.)
 * - พิมพ์เองได้ทั้ง 1 ม.ค. 2569 และ 1/1/2569
 *
 * @example
 * <btfp-datepicker [(ngModel)]="submittedFrom" />
 * <btfp-datepicker formControlName="startDate" [minDate]="today" />
 */
@Component({
  selector: 'btfp-datepicker',
  imports: [DatePicker, FormsModule, BtfpBuddhistEra],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BtfpDatepicker), multi: true }],
  template: `
    <p-datepicker
      btfpBuddhistEra
      [dateFormat]="format"
      [placeholder]="placeholder()"
      [showIcon]="true"
      iconDisplay="input"
      [showButtonBar]="true"
      [minDate]="minDate() ?? null"
      [maxDate]="maxDate() ?? null"
      [disabled]="disabled()"
      [inputId]="inputId()"
      appendTo="body"
      [ngModel]="value()"
      (ngModelChange)="onModelChange($event)"
      (onBlur)="onTouched()"
      styleClass="w-full"
    />
  `,
  styles: `
    :host { display: block; }
    :host ::ng-deep .p-datepicker { width: 100%; }
  `,
})
export class BtfpDatepicker implements ControlValueAccessor {
  readonly placeholder = input('เลือกวันที่');

  /** รูปแบบของ PrimeNG: d = วันไม่มี 0 นำหน้า, M = ชื่อเดือนย่อ (ม.ค.), yy = ปี 4 หลัก */
  protected readonly format = BTFP_DATE_FORMAT;
  readonly minDate = input<Date | null>();
  readonly maxDate = input<Date | null>();
  readonly inputId = input<string>();
  readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });

  protected readonly value = signal<Date | null>(null);
  private readonly formDisabled = signal(false);
  protected readonly disabled = computed(() => this.disabledInput() || this.formDisabled());

  private onChange: (value: Date | null) => void = () => {};
  protected onTouched: () => void = () => {};

  protected onModelChange(value: Date | null): void {
    this.value.set(value);
    this.onChange(value);
  }

  writeValue(value: Date | null): void {
    this.value.set(value ?? null);
  }
  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
