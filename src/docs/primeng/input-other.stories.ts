import type { Meta, StoryObj } from '@storybook/angular-vite';
import { OPTIONS, field, helper, primengParameters, primengStoryImports } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Forms/Autocomplete, Currency, Search, OTP",
  id: 'primeng-input-other',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Forms/Autocomplete, Forms/CurrencyInput, Forms/SearchField, Forms/OtpInput\`  
**PrimeNG:** [\`p-autocomplete\`](https://primeng.org/autocomplete)

\`\`\`ts
import { AutoComplete } from 'primeng/autocomplete';
import { InputNumber } from 'primeng/inputnumber';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputOtp } from 'primeng/inputotp';
\`\`\`

| Figma | ในโค้ด |
| --- | --- |
| Forms/Autocomplete | \`<p-autocomplete [suggestions]="..." (completeMethod)="..." />\` เช่น ค้นหาหน่วยงานจาก API |
| Forms/CurrencyInput | \`<p-inputgroup><p-inputnumber mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="2" /><p-inputgroup-addon>THB</p-inputgroup-addon></p-inputgroup>\` |
| Forms/SearchField | \`<p-iconfield><p-inputicon><btfp-icon name="search" size="20" /></p-inputicon><input pInputText /></p-iconfield>\` |
| Forms/OtpInput | \`<p-inputotp [length]="6" [integerOnly]="true" />\` |

**ป้ายชื่อ ข้อความช่วย ข้อความผิดพลาด** ครอบด้วย \`.btfp-field\` (กำหนดใน \`styles.scss\`)

\`\`\`html
<div class="btfp-field">
  <label for="name">ชื่อโครงการ<span class="btfp-required" aria-hidden="true">*</span></label>
  <input pInputText id="name" placeholder="กรอกชื่อโครงการ" />
  <p class="btfp-field__helper">กรอกข้อมูลให้ครบถ้วนตามเอกสาร</p>
</div>
\`\`\`

สถานะผิดพลาด: ฟอร์มจริงใส่ class \`ng-invalid ng-dirty\` ให้เอง แล้วแสดง \`<p class="btfp-field__error"><btfp-icon name="circle-alert" size="16" />ข้อความ</p>\` แทนข้อความช่วย
`),
};
export default meta;

export const All: StoryObj = {
  name: "ตัวอย่าง",
  args: { suggestions: OPTIONS, amount: 1250000, otp: '' },
  render: (args) => ({ props: args, template: `<div style="display:flex;flex-wrap:wrap;gap:24px">${field('หน่วยงาน', '<p-autocomplete [suggestions]="suggestions" optionLabel="label" placeholder="พิมพ์ชื่อหน่วยงาน" />', helper())}${field('งบประมาณที่ขอรับ', '<p-inputgroup><p-inputnumber [(ngModel)]="amount" mode="decimal" [minFractionDigits]="2" [maxFractionDigits]="2" /><p-inputgroup-addon>THB</p-inputgroup-addon></p-inputgroup>', helper('ระบุจำนวนเงินเป็นบาท พร้อมทศนิยม 2 ตำแหน่ง'))}${field('ค้นหาโครงการ', '<p-iconfield><p-inputicon><btfp-icon name="search" size="20" /></p-inputicon><input pInputText placeholder="ค้นหาชื่อ เลขที่ หรือหน่วยงาน" /></p-iconfield>', helper('ค้นหาได้ทั้งภาษาไทยและอังกฤษ'), false)}${field('รหัส OTP', '<p-inputotp [(ngModel)]="otp" [length]="6" [integerOnly]="true" />', helper('รหัส 6 หลักที่ส่งไปทางอีเมล'))}</div>` }),
};
