import { FormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular-vite';
import { AutoComplete } from 'primeng/autocomplete';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Chip } from 'primeng/chip';
import { IconField } from 'primeng/iconfield';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputIcon } from 'primeng/inputicon';
import { InputNumber } from 'primeng/inputnumber';
import { InputOtp } from 'primeng/inputotp';
import { InputText } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { Paginator } from 'primeng/paginator';
import { RadioButton } from 'primeng/radiobutton';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { Tag } from 'primeng/tag';
import { Textarea } from 'primeng/textarea';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Tooltip } from 'primeng/tooltip';
import { BtfpIcon } from '../../app/shared/ui/icon/icon';

/** import ทุกตัวที่ story ในหมวด PrimeNG ใช้ (ใช้เฉพาะใน Storybook) */
export const primengStoryImports = moduleMetadata({
  imports: [
    FormsModule,
    AutoComplete,
    Avatar,
    Button,
    Checkbox,
    Chip,
    IconField,
    InputGroup,
    InputGroupAddon,
    InputIcon,
    InputNumber,
    InputOtp,
    InputText,
    MultiSelect,
    Paginator,
    RadioButton,
    Select,
    SelectButton,
    Tabs,
    TabList,
    Tab,
    Tag,
    Textarea,
    ToggleSwitch,
    Tooltip,
    BtfpIcon,
  ],
});

export const OPTIONS = [
  { label: 'ทุนประเภท 1', value: 1 },
  { label: 'ทุนประเภท 2', value: 2 },
  { label: 'ทุนประเภท 3', value: 3 },
  { label: 'ทุนประเภท 4', value: 4 },
];

/** วางตัวอย่างเรียงแนวนอน */
export const rowOf = (body: string) => `<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">${body}</div>`;

/** ช่องกรอกพร้อมป้ายชื่อตาม Figma Forms/* */
export const field = (label: string, control: string, foot = '', required = true) =>
  `<div class="btfp-field" style="width:336px;max-width:100%"><label>${label}${required ? '<span class="btfp-required" aria-hidden="true">*</span>' : ''}</label>${control}${foot}</div>`;

export const helper = (t = 'กรอกข้อมูลให้ครบถ้วนตามเอกสาร') => `<p class="btfp-field__helper">${t}</p>`;
export const error = (t = 'กรุณาตรวจสอบข้อมูลอีกครั้ง') => `<p class="btfp-field__error"><btfp-icon name="circle-alert" size="16" />${t}</p>`;

/** ค่า parameters ที่ทุก story ในหมวดนี้ใช้ */
export const primengParameters = (component: string) => ({
  backgrounds: { default: 'white' },
  docs: { description: { component } },
});
