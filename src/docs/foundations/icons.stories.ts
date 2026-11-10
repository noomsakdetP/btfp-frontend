import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { SbIconGallery } from './icon-gallery';

const meta: Meta = {
  title: 'Foundations/ไอคอน',
  id: 'foundations-icons',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [SbIconGallery] })],
  parameters: {
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component: `ไอคอนมีสองชุด ตรงกับหน้า Design System ใน Figma สีตามข้อความรอบข้าง ขนาด 16, 20, 24 px

| ชุด | ใน Figma | ในโค้ด | ใช้เมื่อ |
| --- | --- | --- | --- |
| **PrimeIcons 7.0.0** (313 ตัว สัญญาอนุญาต MIT) | \`pi-<ชื่อ>\` size 16/20/24 | \`<i class="pi pi-eye"></i>\` | ใช้ก่อนเสมอ |
| **Icon กลาง** (วาดใหม่ให้เข้ากับ PrimeIcons) | \`icon/<หมวด>/<ชื่อ>\` | \`<p-ui-icon name="radio-tower" size="16" />\` | เฉพาะตัวที่ PrimeIcons ไม่มี |

\`\`\`html
<i class="pi pi-eye text-base"></i>   <!-- 16px -->
<i class="pi pi-eye text-xl"></i>     <!-- 20px -->
<i class="pi pi-eye text-2xl"></i>    <!-- 24px -->
\`\`\`

**ห้ามอัปเกรด \`primeicons\` เป็นเวอร์ชัน 8 ขึ้นไป** (สัญญาอนุญาตเชิงพาณิชย์) ใน \`package.json\` ล็อกไว้ที่ \`7.0.0\` ค้นชื่อได้ที่ [primeng.org/icons](https://primeng.org/icons)

**เพิ่ม Icon กลางตัวใหม่** เช็กใน PrimeIcons ก่อน ถ้าไม่มีจึงวาดเพิ่มใน \`src/app/theme/central-icons.ts\` และหัวข้อ "Icon กลาง" ของ Figma ตามหลักการวาด: กรอบ 24 เส้นกลาง 1.5 หัวมน มุมโค้ง 2 ไม่ใส่รายละเอียดเล็ก ตัด viewBox ให้รูปเต็มกรอบเหมือนฟอนต์ PrimeIcons

**ขนาดที่ไม่ใช่ 16/20/24** (เช่น 14, 18, 22 ตาม Figma) หรือชื่อไอคอนมาจากข้อมูล ใช้ \`p-ui-icon\` ได้ทั้งสองชุด ชื่อขึ้นต้น \`pi-\` จะแสดงเป็น PrimeIcons

\`\`\`html
<p-ui-icon name="pi-trash" size="18" />    <!-- PrimeIcons 18px -->
<p-ui-icon name="radio-tower" size="16" /> <!-- Icon กลาง -->
\`\`\``,
      },
    },
  },
};
export default meta;

export const All: StoryObj = {
  name: 'ไอคอนทั้งหมด',
  parameters: {
    docs: {
      description: {
        story: 'กดหัวข้อเพื่อหุบหรือขยาย ค้นหา PrimeIcons ได้ด้วยชื่อภาษาอังกฤษ กดที่ไอคอนเพื่อคัดลอกโค้ด',
      },
    },
  },
  render: () => ({ template: '<sb-icon-gallery />' }),
};
