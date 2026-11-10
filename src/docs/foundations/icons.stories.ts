import type { Meta, StoryObj } from '@storybook/angular-vite';
import { foundationImports, iconSizesTpl, iconsTpl, legacyIconsTpl, primeIconsTpl } from './_shared';

const meta: Meta = {
  title: 'Foundations/ไอคอน',
  id: 'foundations-icons',
  tags: ['autodocs'],
  decorators: [foundationImports],
  parameters: {
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component: `ไอคอนมีสองชุด ตรงกับหน้า Design System ใน Figma สีตามข้อความรอบข้าง ขนาด 16, 20, 24 px

| ชุด | ใน Figma | ในโค้ด | ใช้เมื่อ |
| --- | --- | --- | --- |
| **PrimeIcons 7.0.0** (313 ตัว สัญญาอนุญาต MIT) | \`pi-<ชื่อ>\` size 16/20/24 | \`<i class="pi pi-eye"></i>\` | ใช้ก่อนเสมอ |
| **Icon กลาง** (วาดใหม่ให้เข้ากับ PrimeIcons) | \`icon/<หมวด>/<ชื่อ>\` | \`<btfp-icon name="radio-tower" size="16" />\` | เฉพาะตัวที่ PrimeIcons ไม่มี |

\`\`\`html
<i class="pi pi-eye text-base"></i>   <!-- 16px -->
<i class="pi pi-eye text-xl"></i>     <!-- 20px -->
<i class="pi pi-eye text-2xl"></i>    <!-- 24px -->
\`\`\`

**ห้ามอัปเกรด \`primeicons\` เป็นเวอร์ชัน 8 ขึ้นไป** (สัญญาอนุญาตเชิงพาณิชย์) ใน \`package.json\` ล็อกไว้ที่ \`7.0.0\` ค้นชื่อได้ที่ [primeng.org/icons](https://primeng.org/icons)

**เพิ่ม Icon กลางตัวใหม่** เช็กใน PrimeIcons ก่อน ถ้าไม่มีจึงวาดเพิ่มใน \`src/app/theme/central-icons.ts\` และหัวข้อ "Icon กลาง" ของ Figma ตามหลักการวาด: กรอบ 24 เส้นกลาง 1.5 หัวมน มุมโค้ง 2 ไม่ใส่รายละเอียดเล็ก ตัด viewBox ให้รูปเต็มกรอบเหมือนฟอนต์ PrimeIcons

**ช่วงเปลี่ยนผ่าน:** Figma ใช้ PrimeIcons ทั้งไฟล์แล้ว แต่หน้าและ component ที่ทำไปแล้วในโค้ดยังใช้ \`btfp-icon\` (Lucide) อยู่ ดูรายการและชื่อใหม่ในหัวข้อ "ไอคอนเดิมที่รอย้าย" ด้านล่าง ย้ายเมื่อแก้หน้านั้น`,
      },
    },
  },
};
export default meta;

export const PrimeIcons: StoryObj = {
  name: 'PrimeIcons (ไอคอนหลัก)',
  parameters: { docs: { description: { story: 'PrimeIcons 7.0.0 ครบ 314 ตัว ชื่อใต้ไอคอนคือชื่อ class ที่ใช้ในโค้ด เช่น `pi pi-calendar`' } } },
  render: () => ({ template: primeIconsTpl() }),
};

export const All: StoryObj = {
  name: 'Icon กลาง (PrimeIcons ไม่มี)',
  parameters: { docs: { description: { story: 'ไอคอนที่ PrimeIcons ไม่มี วาดใหม่ให้ขนาด ความหนาเส้น และมุมโค้งเท่ากับ PrimeIcons ใช้ผ่าน `<btfp-icon name="..." />` ชื่อตรงกับ Figma' } } },
  render: () => ({ template: iconsTpl() }),
};

export const Legacy: StoryObj = {
  name: 'ไอคอนเดิมที่รอย้าย (Lucide > PrimeIcons)',
  parameters: { docs: { description: { story: 'ไอคอน Lucide ที่โค้ดเดิมยังใช้ผ่าน `btfp-icon` และ PrimeIcons ที่ต้องเปลี่ยนไปใช้ (ตรงกับที่ Figma เปลี่ยนแล้ว) ห้ามใช้ชื่อเหล่านี้กับ `btfp-icon` ในงานใหม่' } } },
  render: () => ({ template: legacyIconsTpl() }),
};

export const Sizes: StoryObj = {
  name: 'ขนาด',
  parameters: { docs: { description: { story: '16 ในตาราง ปุ่ม S และข้อความ, 20 ในเมนูและปุ่ม M L, 24 หัวข้อ' } } },
  render: () => ({ template: iconSizesTpl() }),
};
