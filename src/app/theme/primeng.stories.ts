import { FormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular-vite';
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
import { BtfpIcon } from '../shared/ui/icon/icon';

/**
 * PrimeNG ที่ปรับธีมตาม Figma แล้ว (src/app/theme/btfp-preset.ts)
 * แต่ละ story บอกชื่อ component ใน Figma และวิธีเรียกใช้ที่ตรงกับ variant
 */
const meta: Meta = {
  title: 'PrimeNG (ธีม กทปส.)',
  id: 'primeng',
  decorators: [
    moduleMetadata({
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
    }),
  ],
  parameters: {
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'component ของ PrimeNG 21 ที่ปรับหน้าตาตาม Figma (หน้า Design System) ผ่าน preset ใช้ PrimeNG ตรง ๆ ได้เลย ไม่ต้องเขียน CSS ทับ ตารางด้านล่างของแต่ละ story บอกว่า variant ใน Figma ตรงกับ attribute ไหน',
      },
    },
  },
};
export default meta;

const row = (title: string, body: string) =>
  `<div style="display:grid;grid-template-columns:200px 1fr;gap:16px;align-items:center;padding:12px 0;border-bottom:1px solid var(--btfp-border-default)">
     <code style="font-size:12px;color:var(--btfp-text-secondary)">${title}</code><div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">${body}</div>
   </div>`;

const OPTIONS = [
  { label: 'ทุนประเภท 1', value: 1 },
  { label: 'ทุนประเภท 2', value: 2 },
  { label: 'ทุนประเภท 3', value: 3 },
  { label: 'ทุนประเภท 4', value: 4 },
];

export const Buttons: StoryObj = {
  name: 'Button (Actions/Button)',
  parameters: {
    docs: {
      description: {
        story:
          'Type: primary = ค่าเริ่มต้น, secondary = `outlined severity="secondary"`, tertiary = `text`, danger = `severity="danger"` (พื้นอ่อนตาม Figma) Size: S = `size="small"` 32px, M = ค่าเริ่มต้น 40px, L = `size="large"` 48px ไอคอนใน M และ L ใช้ 20px ใน S ใช้ 16px',
      },
    },
  },
  render: () => ({
    template:
      row('primary', `<p-button size="small" label="ดำเนินการ" /><p-button label="ดำเนินการ" /><p-button size="large" label="ดำเนินการ" /><p-button><btfp-icon name="plus" size="20" /><span>เพิ่มข้อเสนอ</span></p-button><p-button label="ดำเนินการ" [disabled]="true" /><p-button label="กำลังบันทึก" [loading]="true" />`) +
      row('outlined severity="secondary"', `<p-button size="small" outlined severity="secondary" label="ดำเนินการ" /><p-button outlined severity="secondary" label="ดำเนินการ" /><p-button size="large" outlined severity="secondary" label="ดำเนินการ" /><p-button outlined severity="secondary"><btfp-icon name="file-text" size="20" /><span>รายงาน</span></p-button><p-button outlined severity="secondary" label="ดำเนินการ" [disabled]="true" />`) +
      row('text', `<p-button size="small" text label="ดำเนินการ" /><p-button text label="ดำเนินการ" /><p-button size="large" text label="ดำเนินการ" /><p-button text label="ดำเนินการ" [disabled]="true" />`) +
      row('severity="danger"', `<p-button size="small" severity="danger" label="ลบ" /><p-button severity="danger"><btfp-icon name="trash" size="20" /><span>ลบรายการ</span></p-button><p-button size="large" severity="danger" label="ลบ" />`),
  }),
};

export const IconButtons: StoryObj = {
  name: 'Icon Button (Actions/IconButton)',
  parameters: {
    docs: { description: { story: 'ปุ่มไอคอนอย่างเดียวต้องใส่ `ariaLabel` และ `pTooltip` เสมอ ghost = `text`' } },
  },
  render: () => ({
    template:
      row('primary', `<p-button size="small" ariaLabel="เพิ่ม" pTooltip="เพิ่ม"><btfp-icon name="plus" size="16" /></p-button><p-button ariaLabel="เพิ่ม" pTooltip="เพิ่ม"><btfp-icon name="plus" size="20" /></p-button><p-button size="large" ariaLabel="เพิ่ม" pTooltip="เพิ่ม"><btfp-icon name="plus" size="20" /></p-button>`) +
      row('outlined severity="secondary"', `<p-button size="small" outlined severity="secondary" ariaLabel="เพิ่ม"><btfp-icon name="plus" size="16" /></p-button><p-button outlined severity="secondary" ariaLabel="เพิ่ม"><btfp-icon name="plus" size="20" /></p-button><p-button size="large" outlined severity="secondary" ariaLabel="เพิ่ม"><btfp-icon name="plus" size="20" /></p-button>`) +
      row('text (ghost)', `<p-button size="small" text ariaLabel="เพิ่ม"><btfp-icon name="plus" size="16" /></p-button><p-button text ariaLabel="เพิ่ม"><btfp-icon name="plus" size="20" /></p-button><p-button size="large" text ariaLabel="เพิ่ม"><btfp-icon name="plus" size="20" /></p-button>`),
  }),
};

const field = (label: string, control: string, foot = '<p class="btfp-field__helper">กรอกข้อมูลให้ครบถ้วนตามเอกสาร</p>', required = true) =>
  `<div class="btfp-field" style="width:336px"><label>${label}${required ? '<span class="btfp-required" aria-hidden="true">*</span>' : ''}</label>${control}${foot}</div>`;
const err = '<p class="btfp-field__error"><btfp-icon name="circle-alert" size="16" />กรุณาตรวจสอบข้อมูลอีกครั้ง</p>';

export const Inputs: StoryObj = {
  name: 'ช่องกรอก (Forms/*)',
  parameters: {
    docs: {
      description: {
        story:
          'ครอบด้วย `.btfp-field` ได้ป้ายชื่อ Medium 16 ตาม Figma ใส่ `.btfp-required` สำหรับเครื่องหมาย * ข้อความช่วยใช้ `.btfp-field__helper` ข้อความผิดพลาดใช้ `.btfp-field__error` และใส่ `class="ng-invalid ng-dirty"` (ฟอร์มจริงใส่ให้อัตโนมัติ) วันที่ใช้ `btfp-datepicker` ดูใน Components',
      },
    },
  },
  args: { options: OPTIONS, selected: null, multi: [1, 2], amount: 1250000, suggestions: OPTIONS, otp: '' },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:32px 24px">
        ${field('ชื่อโครงการ (TextInput)', '<input pInputText placeholder="กรอกชื่อโครงการ" />')}
        ${field('ชื่อโครงการ (error)', '<input pInputText placeholder="กรอกชื่อโครงการ" class="ng-invalid ng-dirty" />', err)}
        ${field('ชื่อโครงการ (disabled)', '<input pInputText placeholder="กรอกชื่อโครงการ" disabled />')}
        ${field('หลักการและเหตุผล (Textarea)', '<textarea pTextarea rows="3" placeholder="อธิบายรายละเอียดโครงการ"></textarea>')}
        ${field('ประเภททุน (Select)', '<p-select [options]="options" [(ngModel)]="selected" optionLabel="label" optionValue="value" placeholder="เลือกประเภททุน" />')}
        ${field('ประเภททุน (disabled)', '<p-select [options]="options" placeholder="เลือกประเภททุน" [disabled]="true" />')}
        ${field('ประเภททุน (MultiSelect)', '<p-multiselect [options]="options" [(ngModel)]="multi" optionLabel="label" optionValue="value" display="chip" placeholder="เลือกประเภททุน" />')}
        ${field('หน่วยงาน (Autocomplete)', '<p-autocomplete [suggestions]="suggestions" optionLabel="label" placeholder="พิมพ์ชื่อหน่วยงาน" />')}
        ${field('งบประมาณที่ขอรับ (CurrencyInput)', '<p-inputgroup><p-inputnumber [(ngModel)]="amount" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="2" /><p-inputgroup-addon>THB</p-inputgroup-addon></p-inputgroup>', '<p class="btfp-field__helper">ระบุจำนวนเงินเป็นบาท พร้อมทศนิยม 2 ตำแหน่ง</p>')}
        ${field('ค้นหาโครงการ (SearchField)', '<p-iconfield><p-inputicon><btfp-icon name="search" size="20" /></p-inputicon><input pInputText placeholder="ค้นหาชื่อ เลขที่ หรือหน่วยงาน" /></p-iconfield>', '<p class="btfp-field__helper">ค้นหาได้ทั้งภาษาไทยและอังกฤษ</p>', false)}
        ${field('รหัส OTP (OtpInput)', '<p-inputotp [(ngModel)]="otp" [length]="6" [integerOnly]="true" />', '<p class="btfp-field__helper">รหัส 6 หลักที่ส่งไปทางอีเมล</p>')}
      </div>`,
  }),
};

export const Choices: StoryObj = {
  name: 'ตัวเลือก (Checkbox, Radio, Toggle, Segmented)',
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox และ Radio 24px Toggle 44x24 Segmented Control ใช้ `p-selectbutton` หน้าแบบหุ่นจำลองที่ไม่มี binding ใช้ `<input type="checkbox" class="btfp-checkbox">` แทน Checkbox',
      },
    },
  },
  args: { a: false, b: true, c: null, r: 'one', t1: false, t2: true, seg: 'applicant', segOptions: [{ label: 'สำหรับผู้ขอรับทุน', value: 'applicant' }, { label: 'สำหรับเจ้าหน้าที่', value: 'staff' }] },
  render: (args) => ({
    props: args,
    template:
      row('p-checkbox', `
        <label style="display:flex;gap:8px;align-items:center"><p-checkbox [(ngModel)]="a" [binary]="true" />ยอมรับเงื่อนไข</label>
        <label style="display:flex;gap:8px;align-items:center"><p-checkbox [(ngModel)]="b" [binary]="true" />ยอมรับเงื่อนไข</label>
        <label style="display:flex;gap:8px;align-items:center"><p-checkbox [binary]="true" [indeterminate]="true" />เลือกบางส่วน</label>
        <label style="display:flex;gap:8px;align-items:center;opacity:.5"><p-checkbox [binary]="true" [ngModel]="true" [disabled]="true" />ปิดใช้งาน</label>`) +
      row('.btfp-checkbox (หุ่นจำลอง)', `
        <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" class="btfp-checkbox" />ยอมรับเงื่อนไข</label>
        <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" class="btfp-checkbox" checked />ยอมรับเงื่อนไข</label>
        <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" class="btfp-checkbox is-indeterminate" />เลือกบางส่วน</label>`) +
      row('p-radiobutton', `
        <label style="display:flex;gap:8px;align-items:center"><p-radiobutton name="r" value="one" [(ngModel)]="r" />ตัวเลือกทุน 1</label>
        <label style="display:flex;gap:8px;align-items:center"><p-radiobutton name="r" value="two" [(ngModel)]="r" />ตัวเลือกทุน 2</label>`) +
      row('p-toggleswitch', `
        <label style="display:flex;gap:8px;align-items:center"><p-toggleswitch [(ngModel)]="t1" />ปิดอยู่</label>
        <label style="display:flex;gap:8px;align-items:center"><p-toggleswitch [(ngModel)]="t2" />เปิดใช้งาน</label>`) +
      row('p-selectbutton', `<p-selectbutton [options]="segOptions" [(ngModel)]="seg" optionLabel="label" optionValue="value" [allowEmpty]="false" />`),
  }),
};

export const DataDisplay: StoryObj = {
  name: 'Tag, Avatar, Tooltip',
  parameters: {
    docs: {
      description: {
        story:
          'DataDisplay/Tag: Tone neutral = `severity="secondary"` info success warn danger ตามชื่อ ป้ายสถานะ 14 แบบใช้ `btfp-status-tag` ตัวกรองที่ใช้อยู่ใช้ `p-chip removable` Avatar S = ค่าเริ่มต้น 32px, M = `size="large"` 40px, L = `size="xlarge"` 48px',
      },
    },
  },
  render: () => ({
    template:
      row('p-tag', `<p-tag severity="secondary" value="ทุนประเภท 1" /><p-tag severity="info" value="ทุนประเภท 1" /><p-tag severity="success" value="ทุนประเภท 1" /><p-tag severity="warn" value="ทุนประเภท 1" /><p-tag severity="danger" value="ทุนประเภท 1" />`) +
      row('p-chip removable', `<p-chip label="ปีงบประมาณ 2569" [removable]="true" /><p-chip label="ทุนประเภท 1" [removable]="true" />`) +
      row('p-avatar shape="circle"', `<p-avatar label="กท" shape="circle" /><p-avatar label="กท" shape="circle" size="large" /><p-avatar label="กท" shape="circle" size="xlarge" />`) +
      row('pTooltip', `<p-button outlined severity="secondary" label="ชี้ที่นี่" pTooltip="ข้อมูลเพิ่มเติม" tooltipPosition="top" /><p-button outlined severity="secondary" label="ด้านขวา" pTooltip="ข้อมูลเพิ่มเติม" tooltipPosition="right" />`),
  }),
};

export const Navigation: StoryObj = {
  name: 'Tabs, Pagination, Breadcrumb',
  parameters: {
    docs: {
      description: {
        story:
          'Tabs ตัวอักษร 16px แท็บที่เลือก Medium สี action/primary เส้นใต้ 3px Pagination ปุ่ม 32px มุม 8px Breadcrumb ในหน้าหุ่นจำลองเขียนเป็น HTML (p-breadcrumb ต้องส่งข้อมูลด้วย binding)',
      },
    },
  },
  render: () => ({
    template:
      row('p-tabs', `<p-tabs value="1" style="width:100%"><p-tablist><p-tab value="0">ทุกประเภท (128)</p-tab><p-tab value="1">ทุนประเภท 1 (84)</p-tab><p-tab value="2">ทุนประเภท 2 (44)</p-tab><p-tab value="3" [disabled]="true">ทุนประเภท 3</p-tab></p-tablist></p-tabs>`) +
      row('p-paginator', `<p-paginator [rows]="10" [totalRecords]="120" [showFirstLastIcon]="false" />`) +
      row('breadcrumb (HTML)', `
        <nav aria-label="เส้นทาง" class="btfp-text-body-s" style="display:flex;align-items:center;gap:8px;color:var(--btfp-text-secondary)">
          <a href="#" style="color:inherit;text-decoration:none">หน้าหลัก</a><btfp-icon name="chevron-right" size="16" />
          <a href="#" style="color:inherit;text-decoration:none">รายการทุน</a><btfp-icon name="chevron-right" size="16" />
          <span aria-current="page" style="color:var(--btfp-text-primary)">รายละเอียดโครงการ</span>
        </nav>`),
  }),
};
