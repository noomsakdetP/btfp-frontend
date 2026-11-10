import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng-buddhist-year-datepicker';
import { Drawer } from 'primeng/drawer';
import { DrawerDefaults, UiIcon, DatePickerDefaults } from '../../../shared/ui';

/**
 * B-21.2 ตัวกรองเพิ่มเติม (Drawer)  Figma: 479:132339
 * หุ่นจำลอง: เปิดที่ /proposals/filters ไม่มีตัวแปรและ logic
 */
@Component({
  selector: 'p-proposal-filter-drawer',
  imports: [
    RouterLink,
    Button,
    IconField,
    InputIcon,
    InputGroup,
    InputGroupAddon,
    InputText,
    MultiSelect,
    Select,
    DatePicker,
    Drawer,
    DatePickerDefaults,
    DrawerDefaults,
    UiIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './proposal-filter-drawer.html',
  styles: `
    .filter-title h2 { font-size: var(--p-typography-h3-size); line-height: 28px; }
    .filter-title p { margin: 4px 0 0; color: var(--p-text-secondary); font-weight: 400; }
    .close-link {
      display: grid; place-items: center; width: 32px; height: 32px; flex-shrink: 0;
      border-radius: var(--p-radius-button); color: var(--p-icon-default);
    }
    .close-link:hover { background: var(--p-gray-100); }
    .filter-group { margin: 0; padding: 0; border: 0; }
    .filter-group legend { padding: 0; margin-bottom: 10px; font-weight: 600; color: var(--p-text-heading); }
    .sub-label { font-size: var(--p-typography-caption-size); line-height: var(--p-line-height-compact); color: var(--p-text-secondary); }
  `,
})
export class ProposalFilterDrawer {}
