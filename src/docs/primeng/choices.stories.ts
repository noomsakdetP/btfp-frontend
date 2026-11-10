import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports, rowOf } from './_shared';
import { choicesPlayground } from './_playground';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Forms/Checkbox, Radio, Toggle",
  id: 'primeng-choices',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Forms/Checkbox, Forms/Radio, Forms/Toggle\`  
**PrimeNG:** [\`p-checkbox\`](https://primeng.org/checkbox)

**วิธีใช้** ทำข้อ 1 และ 2 ครั้งเดียวต่อหน้า แล้วใส่แท็กใน \`.html\` ได้กี่ที่ก็ได้

\`\`\`ts
// 1. import ด้านบนของไฟล์ .ts ของหน้า
import { Checkbox } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
  // 2. ใส่ในรายการ imports ของหน้า (ถ้ามีตัวอื่นอยู่แล้วให้ต่อท้าย)
  imports: [Checkbox, RadioButton, ToggleSwitch],
  templateUrl: './my-page.html',
})
export class MyPage {}
\`\`\`

3. ใส่แท็กในไฟล์ \`.html\` ตามตารางด้านล่าง หรือกด **Show code** ใต้ตัวอย่างแล้วกด **Copy code**

| Figma | ในโค้ด |
| --- | --- |
| Checkbox Value=unchecked / checked | \`<p-checkbox [binary]="true" [(ngModel)]="..." />\` 24px |
| Checkbox Value=indeterminate | \`[indeterminate]="true"\` (พื้น primary ขีดขาวตาม Figma) |
| Radio | \`<p-radiobutton name="..." value="..." [(ngModel)]="..." />\` 24px |
| Toggle Value=off / on | \`<p-toggleswitch [(ngModel)]="..." />\` 44x24 |
| State=disabled | \`[disabled]="true"\` (ทั้งชิ้นจาง 50% ตาม Figma ป้ายข้อความเป็นสี text/disabled) |
| หน้าหุ่นจำลอง (ไม่มี binding) | \`<input type="checkbox" class="p-native-checkbox" checked>\` หัวตารางใช้ \`class="p-native-checkbox is-indeterminate"\` |

ข้อความป้ายวางคู่ด้วย \`<label>\` ห่าง 8px คลิกที่ข้อความแล้วติ๊กได้
`),
};
export default meta;

/** ตัวแรกของหน้า Docs มีช่อง Controls ให้ลองเปลี่ยนค่า */
export const Playground: StoryObj = choicesPlayground;

export const Checkbox: StoryObj = {
  name: "Checkbox",
  args: { a: false, b: true },
  render: (args) => ({ props: args, template: rowOf(`<label style="display:flex;gap:8px;align-items:center"><p-checkbox [(ngModel)]="a" [binary]="true" />ยอมรับเงื่อนไข</label><label style="display:flex;gap:8px;align-items:center"><p-checkbox [(ngModel)]="b" [binary]="true" />ยอมรับเงื่อนไข</label><label style="display:flex;gap:8px;align-items:center"><p-checkbox [binary]="true" [indeterminate]="true" />เลือกบางส่วน</label><label style="display:flex;gap:8px;align-items:center"><p-checkbox [binary]="true" [ngModel]="true" [disabled]="true" />ติ๊กไว้ ปิดใช้งาน</label><label style="display:flex;gap:8px;align-items:center"><p-checkbox [binary]="true" [ngModel]="false" [disabled]="true" />ปิดใช้งาน</label>`) }),
};

export const Mock: StoryObj = {
  name: "Checkbox ในหน้าหุ่นจำลอง",
  parameters: { docs: { description: { story: `\`.p-native-checkbox\` เป็น HTML ธรรมดา หน้าตาเหมือน \`p-checkbox\`` } } },
  render: () => ({ template: rowOf(`<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" class="p-native-checkbox" />ยอมรับเงื่อนไข</label><label style="display:flex;gap:8px;align-items:center"><input type="checkbox" class="p-native-checkbox" checked />ยอมรับเงื่อนไข</label><label style="display:flex;gap:8px;align-items:center"><input type="checkbox" class="p-native-checkbox is-indeterminate" />เลือกบางส่วน</label><label style="display:flex;gap:8px;align-items:center"><input type="checkbox" class="p-native-checkbox" checked disabled />ติ๊กไว้ ปิดใช้งาน</label>`) }),
};

export const Radio: StoryObj = {
  name: "Radio",
  args: { r: 'one', r3: 'x' },
  render: (args) => ({ props: args, template: rowOf(`<label style="display:flex;gap:8px;align-items:center"><p-radiobutton name="r" value="one" [(ngModel)]="r" />ตัวเลือกทุน 1</label><label style="display:flex;gap:8px;align-items:center"><p-radiobutton name="r" value="two" [(ngModel)]="r" />ตัวเลือกทุน 2</label><label style="display:flex;gap:8px;align-items:center"><p-radiobutton name="r2" value="x" [(ngModel)]="r3" [disabled]="true" />เลือกไว้ ปิดใช้งาน</label>`) }),
};

export const Toggle: StoryObj = {
  name: "Toggle",
  args: { t1: false, t2: true },
  render: (args) => ({ props: args, template: rowOf(`<label style="display:flex;gap:8px;align-items:center"><p-toggleswitch [(ngModel)]="t1" />ปิดอยู่</label><label style="display:flex;gap:8px;align-items:center"><p-toggleswitch [(ngModel)]="t2" />เปิดใช้งาน</label><label style="display:flex;gap:8px;align-items:center"><p-toggleswitch [ngModel]="true" [disabled]="true" />เปิดอยู่ ปิดใช้งาน</label>`) }),
};
