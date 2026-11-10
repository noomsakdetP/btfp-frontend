import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { Drawer } from 'primeng/drawer';
import { BtfpDrawer } from '../../app/shared/ui/drawer/drawer';
import { primengParameters } from './_shared';

const meta: Meta = {
  title: 'PrimeNG (ธีม กทปส.)/Overlay/Drawer',
  id: 'primeng-drawer',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Drawer, BtfpDrawer] })],
  parameters: {
    ...primengParameters(`**Figma:** แผงตัวกรองเพิ่มเติม (B-21.2)  
**PrimeNG:** [\`p-drawer\`](https://primeng.org/drawer) + \`btfpDrawer\` ของเรา

ใช้ \`p-drawer\` ของ PrimeNG ตรง ๆ แล้วใส่ attribute \`btfpDrawer\` เพิ่ม ส่วนที่ตั้งค่าตามระบบ

- กว้าง 480px บนจอ sm ขึ้นไป เต็มจอบนมือถือ
- มีชั้นทับ ล็อกการเลื่อนหน้า ไม่ปิดเองเมื่อกดนอกแผงหรือกด Esc ใส่ปุ่มหรือลิงก์ปิดเองในหัว
- attribute \`open\` เปิดค้างไว้ สำหรับหน้าหุ่นจำลองที่ห้ามมี binding ตอนต่อ API ใช้ \`[(visible)]\` ของ PrimeNG แทน

\`\`\`ts
import { Drawer } from 'primeng/drawer';
import { BtfpDrawer } from '../../shared/ui';

@Component({ imports: [Drawer, BtfpDrawer] })
\`\`\`

\`\`\`html
<p-drawer btfpDrawer open position="right">
  <ng-template #header>หัวข้อ และลิงก์ปิด</ng-template>
  เนื้อหา
  <ng-template #footer>แถบปุ่มด้านล่าง</ng-template>
</p-drawer>
\`\`\`

\`p-select\` \`p-multiselect\` \`p-datepicker\` ใน Drawer ใส่ \`appendTo="body"\` ไม่งั้นรายการโดนตัด
`),
    layout: 'fullscreen',
  },
};
// Drawer มีชั้นทับเต็มจอ ในหน้า Docs ต้องแสดงในกรอบแยก (iframe) ไม่งั้นชั้นทับจะคลุมทั้งหน้า Docs
meta.parameters = { ...meta.parameters, docs: { ...meta.parameters!['docs'], story: { inline: false, height: '520px' } } };
export default meta;

export const Open: StoryObj = {
  name: 'เปิดอยู่ (หน้าหุ่นจำลอง)',
  render: () => ({
    template: `
      <div style="height:100vh"></div>
      <p-drawer btfpDrawer open position="right">
        <ng-template #header><h2 style="font-size:20px">หัวข้อ Drawer</h2></ng-template>
        <p>เนื้อหาใน Drawer</p>
        <ng-template #footer><div style="display:flex; justify-content:flex-end; width:100%">ปุ่มด้านล่าง</div></ng-template>
      </p-drawer>`,
  }),
};
