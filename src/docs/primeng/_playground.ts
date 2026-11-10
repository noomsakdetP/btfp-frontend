import type { StoryObj } from '@storybook/angular-vite';
import { OPTIONS } from './_shared';

/**
 * ตัวอย่าง Playground ของแต่ละหน้าในหมวด PrimeNG
 * สร้าง HTML ธรรมดาจากค่าใน Controls (ไม่ใช้ binding) Show code จึงได้โค้ดที่ copy ไปใช้ได้ตรง ๆ
 * ชื่อตัวเลือกใน Controls ใช้ชื่อ variant ตาม Figma
 */

type Args = Record<string, any>;
const attr = (name: string, on: unknown) => (on ? ` ${name}` : '');
const val = (name: string, v: unknown) => (v === undefined || v === null || v === '' ? '' : ` ${name}="${v}"`);
const select = (options: string[]) => ({ control: 'select' as const, options });
const radio = (options: string[]) => ({ control: 'inline-radio' as const, options });
const text = { control: 'text' as const };
const bool = { control: 'boolean' as const };

const play = (args: Args, argTypes: Args, build: (a: Args) => string, desc: string, props: Args = {}): StoryObj => ({
  name: 'Playground',
  args,
  argTypes,
  parameters: { docs: { description: { story: desc } } },
  render: (a) => ({ props, template: build(a) }),
});

const DESC = 'เลือกค่าในตาราง Controls ด้านล่าง ตัวอย่างและ Show code จะเปลี่ยนตาม แล้วกด Copy code ไปใช้ได้เลย';

// ---------- Button ----------
const BUTTON_TYPE: Record<string, string> = {
  primary: '',
  secondary: ' outlined severity="secondary"',
  tertiary: ' text',
  danger: ' severity="danger"',
};
const SIZE: Record<string, string> = { S: ' size="small"', M: '', L: ' size="large"' };

export const buttonPlayground = play(
  { Type: 'primary', Size: 'M', label: 'บันทึก', icon: 'ไม่มี', disabled: false, loading: false },
  {
    Type: radio(['primary', 'secondary', 'tertiary', 'danger']),
    Size: radio(['S', 'M', 'L']),
    label: text,
    icon: select(['ไม่มี', 'pi-plus', 'pi-chart-bar', 'pi-download', 'pi-send', 'pi-trash', 'pi-pencil', 'pi-search']),
    disabled: bool,
    loading: bool,
  },
  (a) => {
    const base = `${BUTTON_TYPE[a['Type']]}${SIZE[a['Size']]}${attr('disabled', a['disabled'])}${attr('loading', a['loading'])}`;
    if (a['icon'] === 'ไม่มี') return `<p-button${base}${val('label', a['label'])} />`;
    const size = a['Size'] === 'S' ? 16 : 20;
    return `<p-button${base}><p-ui-icon name="${a['icon']}" size="${size}" /><span>${a['label']}</span></p-button>`;
  },
  DESC,
);

// ---------- Icon Button ----------
const ICON_TYPE: Record<string, string> = { primary: '', secondary: ' outlined severity="secondary"', ghost: ' text' };
export const iconButtonPlayground = play(
  { Type: 'secondary', Size: 'M', icon: 'pi-eye', ariaLabel: 'ดูรายละเอียด', disabled: false },
  {
    Type: radio(['primary', 'secondary', 'ghost']),
    Size: radio(['S', 'M', 'L']),
    icon: select(['pi-eye', 'pi-pencil', 'pi-trash', 'pi-plus', 'pi-download', 'pi-filter', 'pi-bell', 'pi-bars', 'pi-times']),
    ariaLabel: { ...text, description: 'ข้อความที่โปรแกรมอ่านหน้าจออ่าน และใช้เป็น tooltip' },
    disabled: bool,
  },
  (a) =>
    `<p-button${ICON_TYPE[a['Type']]}${SIZE[a['Size']]}${attr('disabled', a['disabled'])} ariaLabel="${a['ariaLabel']}" pTooltip="${a['ariaLabel']}"><ng-template #icon><p-ui-icon name="${a['icon']}" size="${a['Size'] === 'S' ? 16 : 20}" /></ng-template></p-button>`,
  DESC,
);

// ---------- ช่องกรอก ----------
const fieldWrap = (a: Args, id: string, control: string) => {
  const required = a['required'] ? '<span class="p-required" aria-hidden="true">*</span>' : '';
  const foot =
    a['State'] === 'error'
      ? `<p class="p-field__error"><p-ui-icon name="pi-exclamation-circle" size="16" />${a['error']}</p>`
      : a['helper']
        ? `<p class="p-field__helper">${a['helper']}</p>`
        : '';
  return `<div class="p-field" style="width:336px"><label for="${id}">${a['label']}${required}</label>${control}${foot}</div>`;
};
const stateAttr = (a: Args) => (a['State'] === 'error' ? ' class="ng-invalid ng-dirty"' : '') + attr('disabled', a['State'] === 'disabled');
const FIELD_TYPES = {
  label: text,
  placeholder: text,
  required: bool,
  State: radio(['default', 'error', 'disabled']),
  helper: { ...text, name: 'helper (ข้อความช่วย)' },
  error: { ...text, name: 'error (ข้อความผิดพลาด)' },
};

export const textInputPlayground = play(
  { Component: 'TextInput', label: 'ชื่อโครงการ', placeholder: 'กรอกชื่อโครงการ', required: true, State: 'default', helper: 'กรอกข้อมูลให้ครบถ้วนตามเอกสาร', error: 'กรุณาตรวจสอบข้อมูลอีกครั้ง' },
  { Component: radio(['TextInput', 'Textarea']), ...FIELD_TYPES },
  (a) =>
    fieldWrap(
      a,
      'project-name',
      a['Component'] === 'Textarea'
        ? `<textarea pTextarea id="project-name" rows="3"${val('placeholder', a['placeholder'])}${stateAttr(a)}></textarea>`
        : `<input pInputText id="project-name"${val('placeholder', a['placeholder'])}${stateAttr(a)} />`,
    ),
  DESC + ' สถานะ error ในฟอร์มจริง Angular ใส่ class ng-invalid ng-dirty ให้เอง',
);

export const selectPlayground = play(
  { Component: 'Select', label: 'ประเภททุน', placeholder: 'เลือกประเภททุน', required: true, State: 'default', helper: '', error: 'กรุณาเลือกประเภททุน', inDrawer: false },
  { Component: radio(['Select', 'MultiSelect']), ...FIELD_TYPES, inDrawer: { ...bool, name: 'inDrawer (อยู่ใน Drawer)' } },
  (a) => {
    const tag = a['Component'] === 'MultiSelect' ? 'p-multiselect' : 'p-select';
    const chip = a['Component'] === 'MultiSelect' ? ' display="chip"' : '';
    const state = a['State'] === 'error' ? ' class="ng-invalid ng-dirty"' : a['State'] === 'disabled' ? ' [disabled]="true"' : '';
    return fieldWrap(
      a,
      'grant-type',
      `<${tag} inputId="grant-type" [options]="options" optionLabel="label" optionValue="value"${chip}${val('placeholder', a['placeholder'])}${a['inDrawer'] ? ' appendTo="body"' : ''}${state} />`,
    );
  },
  DESC + ' options คือรายการตัวเลือกจากข้อมูลของหน้า (หน้าหุ่นจำลองใช้ placeholder แทน ดูตัวอย่างด้านล่าง)',
  { options: OPTIONS },
);

// ---------- Checkbox Radio Toggle ----------
export const choicesPlayground = play(
  { Component: 'Checkbox', label: 'ยอมรับเงื่อนไข', checked: true, disabled: false, mockup: false },
  {
    Component: radio(['Checkbox', 'Radio', 'Toggle']),
    label: text,
    checked: bool,
    disabled: bool,
    mockup: { ...bool, name: 'mockup (หน้าหุ่นจำลอง)', description: 'Checkbox แบบไม่มี binding ใช้ในหน้า src/app/pages' },
  },
  (a) => {
    const dis = a['disabled'] ? ' [disabled]="true"' : '';
    let control: string;
    if (a['Component'] === 'Checkbox' && a['mockup']) {
      control = `<input type="checkbox" class="p-native-checkbox"${attr('checked', a['checked'])}${attr('disabled', a['disabled'])} />`;
    } else if (a['Component'] === 'Checkbox') {
      control = `<p-checkbox [binary]="true" [ngModel]="${a['checked']}"${dis} />`;
    } else if (a['Component'] === 'Radio') {
      control = `<p-radiobutton name="choice" value="1" [ngModel]="${a['checked'] ? "'1'" : 'null'}"${dis} />`;
    } else {
      control = `<p-toggleswitch [ngModel]="${a['checked']}"${dis} />`;
    }
    return `<label style="display:flex;gap:8px;align-items:center">${control}${a['label']}</label>`;
  },
  DESC + ' ในหน้าจริงเปลี่ยน [ngModel]="true" เป็น [(ngModel)] ที่ผูกกับข้อมูลของหน้า',
);

// ---------- Tag ----------
const TONE: Record<string, string> = { neutral: 'secondary', info: 'info', success: 'success', warning: 'warn', danger: 'danger' };
export const tagPlayground = play(
  { Tone: 'info', value: 'ทุนประเภท 1', removable: false },
  { Tone: radio(['neutral', 'info', 'success', 'warning', 'danger']), value: text, removable: { ...bool, name: 'removable (ตัวกรองที่ใช้อยู่)', description: 'มีปุ่มลบ ใช้ p-chip' } },
  (a) =>
    a['removable']
      ? `<p-chip label="${a['value']}" removable="true"><ng-template #removeicon><p-ui-icon name="pi-times" size="14" /></ng-template></p-chip>`
      : `<p-tag severity="${TONE[a['Tone']]}" value="${a['value']}" />`,
  DESC + ' ตัวกรองที่ใช้อยู่ (removable) ใช้สี info เสมอตาม Figma',
);

// ---------- Avatar ----------
const AVATAR_SIZE: Record<string, string> = { S: '', M: ' size="large"', L: ' size="xlarge"' };
export const avatarPlayground = play(
  { Size: 'M', label: 'กท' },
  { Size: radio(['S', 'M', 'L']), label: { ...text, name: 'label (อักษรย่อ)' } },
  (a) => `<p-avatar label="${a['label']}" shape="circle"${AVATAR_SIZE[a['Size']]} />`,
  DESC,
);

// ---------- Tooltip ----------
export const tooltipPlayground = play(
  { Position: 'top', text: 'ข้อมูลเพิ่มเติม' },
  { Position: radio(['top', 'right', 'bottom', 'left']), text },
  (a) => `<p-button outlined severity="secondary" label="ชี้ที่นี่" pTooltip="${a['text']}" tooltipPosition="${a['Position']}" />`,
  DESC + ' ชี้เมาส์ที่ปุ่มเพื่อดู tooltip',
);

// ---------- Tabs ----------
export const tabsPlayground = play(
  { tabs: 'ทุกประเภท (128), ทุนประเภท 1 (86), ทุนประเภท 2 (31)', selected: 1 },
  { tabs: { ...text, name: 'tabs (คั่นด้วย ,)' }, selected: { control: { type: 'number', min: 0, max: 9 }, name: 'selected (ลำดับที่เลือก เริ่ม 0)' } },
  (a) => {
    const items = String(a['tabs'])
      .split(',')
      .map((t: string) => t.trim())
      .filter(Boolean);
    return `<p-tabs value="${a['selected']}"><p-tablist>${items.map((t, i) => `<p-tab value="${i}">${t}</p-tab>`).join('')}</p-tablist></p-tabs>`;
  },
  DESC,
);

// ---------- Pagination ----------
export const paginationPlayground = play(
  { rows: 10, totalRecords: 120 },
  { rows: { control: 'select', options: [10, 20, 50], name: 'rows (แถวต่อหน้า)' }, totalRecords: { control: 'number', name: 'totalRecords (จำนวนทั้งหมด)' } },
  (a) => `<p-paginator rows="${a['rows']}" totalRecords="${a['totalRecords']}" showFirstLastIcon="false" />`,
  DESC + ' ในหน้าจริงผูก (onPageChange) เพื่อโหลดข้อมูลหน้าถัดไป',
);
