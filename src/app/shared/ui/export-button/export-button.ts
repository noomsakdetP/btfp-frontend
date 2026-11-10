import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UiIcon } from '../icon/icon';

export type ExportFormat = 'xlsx' | 'pdf' | 'csv';

/**
 * p-export-button : ปุ่ม "ส่งออก" พร้อมเมนูรูปแบบไฟล์ (Figma: Actions/Export Menu Button 369:103570)
 *
 * ใช้ปุ่มนี้ตัวเดียวทั้งระบบ เพื่อให้ตัวเลือกส่งออกเหมือนกันทุกหน้า
 *
 * @example
 * <p-export-button (export)="onExport($event)" />
 */
@Component({
  selector: 'p-export-button',
  imports: [Button, Menu, UiIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-button [outlined]="true" severity="secondary" (onClick)="menu.toggle($event)" [ariaLabel]="label()">
      <p-ui-icon name="pi-download" size="18" />
      <span class="export__label">{{ label() }}</span>
      <p-ui-icon name="pi-chevron-down" size="16" />
    </p-button>
    <p-menu #menu [model]="items" [popup]="true" appendTo="body" />
  `,
  styles: `
    :host { display: inline-flex; }
    .export__label { font-weight: 500; }
  `,
})
export class ExportButton {
  readonly label = input('ส่งออก');
  readonly export = output<ExportFormat>();

  protected readonly items: MenuItem[] = [
    { label: 'Excel (.xlsx)', command: () => this.export.emit('xlsx') },
    { label: 'PDF (.pdf)', command: () => this.export.emit('pdf') },
    { label: 'CSV (.csv)', command: () => this.export.emit('csv') },
  ];
}
