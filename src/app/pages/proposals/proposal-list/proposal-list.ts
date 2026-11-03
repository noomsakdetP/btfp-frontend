import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Paginator } from 'primeng/paginator';
import { Select } from 'primeng/select';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { BtfpExportButton, BtfpIcon, BtfpKpiCard, BtfpRowActions, BtfpStatusTag } from '../../../shared/ui';

/**
 * B-01 ข้อเสนอโครงการ (มุมมองเจ้าหน้าที่)  Figma: 60:7997
 *
 * หุ่นจำลอง: markup + CSS เท่านั้น ไม่มีตัวแปรและ logic ในคลาสนี้
 * Drawer ตัวกรองเพิ่มเติมเป็นหน้าลูก (ProposalFilterDrawer) แสดงใน <router-outlet>
 */
@Component({
  selector: 'btfp-proposal-list-page',
  imports: [
    RouterLink,
    RouterOutlet,
    Button,
    Chip,
    IconField,
    InputIcon,
    InputText,
    Paginator,
    Select,
    Tabs,
    TabList,
    Tab,
    BtfpIcon,
    BtfpExportButton,
    BtfpKpiCard,
    BtfpRowActions,
    BtfpStatusTag,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './proposal-list.html',
  styleUrl: './proposal-list.scss',
})
export class ProposalListPage {}
