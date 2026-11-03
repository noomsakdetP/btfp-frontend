import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { BtfpIcon } from '../icon/icon';

export type BtfpExportFormat = 'xlsx' | 'pdf' | 'csv';

/**
 * btfp-export-button : ปุ่ม "ส่งออก" พร้อมเมนูรูปแบบไฟล์ (Figma: Actions/Export Menu Button 369:103570)
 *
 * ใช้ปุ่มนี้ตัวเดียวทั้งระบบ เพื่อให้ตัวเลือกส่งออกเหมือนกันทุกหน้า
 *
 * @example
 * <btfp-export-button (export)="onExport($event)" />
 */
@Component({
  selector: 'btfp-export-button',
  imports: [Button, Menu, BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-button [outlined]="true" (onClick)="menu.toggle($event)" [ariaLabel]="label()">
      <btfp-icon name="download" size="18" />
      <span class="export__label">{{ label() }}</span>
      <btfp-icon name="chevron-down" size="16" />
    </p-button>
    <p-menu #menu [model]="items" [popup]="true" appendTo="body" />
  `,
  styles: `
    :host { display: inline-flex; }
    .export__label { font-weight: 500; }
  `,
})
export class BtfpExportButton {
  readonly label = input('ส่งออก');
  readonly export = output<BtfpExportFormat>();

  protected readonly items: MenuItem[] = [
    { label: 'Excel (.xlsx)', command: () => this.export.emit('xlsx') },
    { label: 'PDF (.pdf)', command: () => this.export.emit('pdf') },
    { label: 'CSV (.csv)', command: () => this.export.emit('csv') },
  ];
}
