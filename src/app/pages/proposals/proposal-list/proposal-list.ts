import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Chip } from 'primeng/chip';
import { Drawer } from 'primeng/drawer';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { Paginator } from 'primeng/paginator';
import { Select } from 'primeng/select';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { BtfpIcon } from '../../../shared/ui/icon/icon';
import { BtfpDatepicker, BtfpExportButton, BtfpKpiCard, BtfpRowActions, BtfpStatusTag } from '../../../shared/ui';

/**
 * B-01 ข้อเสนอโครงการ (มุมมองเจ้าหน้าที่)
 * Figma: 60:7997 และ Drawer ตัวกรองเพิ่มเติม 479:132339
 *
 * หน้านี้เป็นโครง HTML ข้อความพิมพ์ตรงใน template
 * state เดียวที่มีคือเปิดปิด Drawer
 */
@Component({
  selector: 'btfp-proposal-list-page',
  imports: [
    FormsModule,
    RouterLink,
    Button,
    Checkbox,
    Chip,
    Drawer,
    IconField,
    InputIcon,
    InputGroup,
    InputGroupAddon,
    InputNumber,
    InputText,
    MultiSelect,
    Paginator,
    Select,
    Tabs,
    TabList,
    Tab,
    BtfpIcon,
    BtfpDatepicker,
    BtfpExportButton,
    BtfpKpiCard,
    BtfpRowActions,
    BtfpStatusTag,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './proposal-list.html',
  styleUrl: './proposal-list.scss',
})
export class ProposalListPage {
  protected readonly filterDrawerOpen = signal(false);
}
