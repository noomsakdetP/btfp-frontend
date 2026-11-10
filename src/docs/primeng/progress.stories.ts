import type { Meta, StoryObj } from '@storybook/angular-vite';
import { primengParameters, primengStoryImports, rowOf } from './_shared';

const meta: Meta = {
  title: "PrimeNG (ธีม กทปส.)/Feedback/Progress และ Spinner",
  id: 'primeng-progress',
  tags: ['autodocs'],
  decorators: [primengStoryImports],
  parameters: primengParameters(`**Figma:** \`Feedback/Progress Bar\`, \`Feedback/Loading Spinner\`  
**PrimeNG:** [\`p-progressbar\`](https://primeng.org/progressbar), [\`p-progressspinner\`](https://primeng.org/progressspinner)

**วิธีใช้** ทำข้อ 1 และ 2 ครั้งเดียวต่อหน้า แล้วใส่แท็กใน \`.html\` ได้กี่ที่ก็ได้

\`\`\`ts
// 1. import ด้านบนของไฟล์ .ts ของหน้า
import { ProgressBar } from 'primeng/progressbar';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  // 2. ใส่ในรายการ imports ของหน้า (ถ้ามีตัวอื่นอยู่แล้วให้ต่อท้าย)
  imports: [ProgressBar, ProgressSpinner],
  templateUrl: './my-page.html',
})
export class MyPage {}
\`\`\`

3. ใส่แท็กในไฟล์ \`.html\` ตามตารางด้านล่าง หรือกด **Show code** ใต้ตัวอย่างแล้วกด **Copy code**

| Figma | ในโค้ด |
| --- | --- |
| Progress Bar Type=determinate (รู้เปอร์เซ็นต์ เช่น อัปโหลดไฟล์) | \`<p-progressbar value="60" />\` |
| Progress Bar Type=indeterminate (ไม่รู้เวลา) | \`<p-progressbar mode="indeterminate" />\` |
| Loading Spinner | \`<p-progressspinner strokeWidth="4" ariaLabel="กำลังโหลด" />\` |

สีตั้งไว้ใน \`theme-preset.ts\` แล้ว (แถบ primary 600 บนพื้น primary 100, วงกลมใช้สีน้ำเงินของระบบแทนสีรุ้งของ Aura) ไม่ต้องใส่สีเอง

**โหลดตอนเปลี่ยนเมนู** ไม่ต้องใส่ในหน้า ใช้ \`p-route-progress\` ที่ใส่ไว้ใน \`app.ts\` แล้ว (ดู Components > Feedback > Route Progress)

**โหลดตอนเรียก API** ไม่มีตัวโหลดกลาง ให้แสดงที่ component ที่ผู้ใช้กด (ดูตัวอย่าง "ระหว่างเรียก API" ด้านล่าง)

| สถานการณ์ | ในโค้ด |
| --- | --- |
| กดบันทึก ส่ง ค้นหา | \`<p-button label="กำลังบันทึก" loading />\` ไอคอนหมุนในปุ่ม กดซ้ำไม่ได้ |
| โหลดข้อมูลตาราง | แถว \`<p-skeleton />\` ใน \`p-simple-table\` จำนวนเท่าแถวต่อหน้า (ต้อง import \`Skeleton\` จาก \`primeng/skeleton\`) |
| อัปโหลดไฟล์ | \`<p-progressbar value="60" />\` |
`),
};
export default meta;

export const Determinate: StoryObj = {
  name: 'Progress Bar รู้เปอร์เซ็นต์',
  render: () => ({ template: `<div style="width:360px;display:grid;gap:16px"><p-progressbar value="30" /><p-progressbar value="60" /><p-progressbar value="100" /></div>` }),
};

export const Indeterminate: StoryObj = {
  name: 'Progress Bar ไม่รู้เวลา',
  render: () => ({ template: `<div style="width:360px"><p-progressbar mode="indeterminate" /></div>` }),
};

export const Spinner: StoryObj = {
  name: 'Loading Spinner',
  render: () => ({ template: rowOf(`<p-progressspinner strokeWidth="4" ariaLabel="กำลังโหลด" style="width:32px;height:32px" /><p-progressspinner strokeWidth="4" ariaLabel="กำลังโหลด" style="width:48px;height:48px" /><p-progressspinner strokeWidth="4" ariaLabel="กำลังโหลด" />`) }),
};

export const ApiLoading: StoryObj = {
  name: 'ระหว่างเรียก API',
  parameters: { docs: { description: { story: 'ปุ่มที่กดแสดง loading และกดซ้ำไม่ได้ ตารางแสดงแถว skeleton แทนข้อมูลจนกว่าจะโหลดเสร็จ' } } },
  render: () => ({
    template: `
<div style="display:grid;gap:24px;max-width:880px">
  <div style="display:flex;gap:12px;justify-content:flex-end">
    <p-button outlined severity="secondary" label="ยกเลิก" disabled />
    <p-button label="กำลังบันทึก" loading />
  </div>
  <table class="p-simple-table">
    <thead><tr><th>ลำดับ</th><th>เลขที่คำขอ</th><th>ชื่อโครงการ</th><th>หน่วยงาน</th><th>มาตรา</th><th class="p-simple-table__money">วงเงิน (บาท)</th></tr></thead>
    <tbody><tr><td><p-skeleton width="24px" height="16px" /></td><td><p-skeleton width="96px" height="16px" /></td><td><p-skeleton width="70%" height="16px" /></td><td><p-skeleton width="60%" height="16px" /></td><td><p-skeleton width="56px" height="16px" /></td><td class="p-simple-table__money"><p-skeleton width="96px" height="16px" styleClass="ml-auto" /></td></tr><tr><td><p-skeleton width="24px" height="16px" /></td><td><p-skeleton width="96px" height="16px" /></td><td><p-skeleton width="70%" height="16px" /></td><td><p-skeleton width="60%" height="16px" /></td><td><p-skeleton width="56px" height="16px" /></td><td class="p-simple-table__money"><p-skeleton width="96px" height="16px" styleClass="ml-auto" /></td></tr><tr><td><p-skeleton width="24px" height="16px" /></td><td><p-skeleton width="96px" height="16px" /></td><td><p-skeleton width="70%" height="16px" /></td><td><p-skeleton width="60%" height="16px" /></td><td><p-skeleton width="56px" height="16px" /></td><td class="p-simple-table__money"><p-skeleton width="96px" height="16px" styleClass="ml-auto" /></td></tr><tr><td><p-skeleton width="24px" height="16px" /></td><td><p-skeleton width="96px" height="16px" /></td><td><p-skeleton width="70%" height="16px" /></td><td><p-skeleton width="60%" height="16px" /></td><td><p-skeleton width="56px" height="16px" /></td><td class="p-simple-table__money"><p-skeleton width="96px" height="16px" styleClass="ml-auto" /></td></tr><tr><td><p-skeleton width="24px" height="16px" /></td><td><p-skeleton width="96px" height="16px" /></td><td><p-skeleton width="70%" height="16px" /></td><td><p-skeleton width="60%" height="16px" /></td><td><p-skeleton width="56px" height="16px" /></td><td class="p-simple-table__money"><p-skeleton width="96px" height="16px" styleClass="ml-auto" /></td></tr></tbody>
  </table>
</div>`,
  }),
};
