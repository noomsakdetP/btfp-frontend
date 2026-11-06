import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { BtfpSidebar } from '../../layout/sidebar/sidebar';
import { BtfpTopbar } from '../../layout/topbar/topbar';
import { ProposalListPage } from './proposal-list/proposal-list';
import { ProposalListEmptyPage } from './proposal-list-empty/proposal-list-empty';
import { ProposalFilterDrawer } from './proposal-filter-drawer/proposal-filter-drawer';

/** ประกอบหน้าเต็มเหมือน btfp-staff-layout: เมนูซ้าย (ซ่อนบนจอเล็ก) + แถบบน + เนื้อหา */
const shell = (page: string) => `
  <div class="flex min-h-screen bg-[var(--p-bg-subtle)]">
    <input id="btfp-nav-toggle" type="checkbox" class="peer sr-only" aria-label="เปิดปิดเมนู" />
    <label for="btfp-nav-toggle" class="fixed inset-0 z-30 hidden bg-black/40 peer-checked:block lg:peer-checked:hidden" aria-hidden="true"></label>
    <btfp-sidebar class="fixed inset-y-0 left-0 z-40 -translate-x-full overflow-y-auto transition-transform duration-200 peer-checked:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0" />
    <div class="min-w-0 flex-1">
      <btfp-topbar />
      <main class="px-4 pt-4 pb-10 md:px-6 md:pt-6 xl:px-10 xl:pb-12">${page}</main>
    </div>
  </div>
  <p-confirmdialog [style]="{ width: '440px' }" />`;

const meta: Meta = {
  title: 'Pages/B-01 ข้อเสนอโครงการ',
  id: 'pages-b01-proposals',
  decorators: [
    moduleMetadata({ imports: [BtfpSidebar, BtfpTopbar, ConfirmDialog, ProposalListPage, ProposalListEmptyPage, ProposalFilterDrawer] }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'หน้าหุ่นจำลอง markup + CSS ล้วน ไม่มีตัวแปรและ binding รองรับ Responsive ด้วย Tailwind ลองเปลี่ยนขนาดจอด้วยปุ่ม Viewport ด้านบน Figma: 60:7997',
      },
    },
  },
};
export default meta;

export const B01: StoryObj = {
  name: 'B-01 มีข้อมูล',
  render: () => ({ template: shell('<btfp-proposal-list-page />') }),
};

export const B01Empty: StoryObj = {
  name: 'B-01E ยังไม่มีข้อมูล',
  render: () => ({ template: shell('<btfp-proposal-list-empty-page />') }),
};

export const B01F: StoryObj = {
  name: 'B-01F ตัวกรองเพิ่มเติม (Drawer)',
  render: () => ({ template: shell('<btfp-proposal-list-page /><btfp-proposal-filter-drawer />') }),
};
