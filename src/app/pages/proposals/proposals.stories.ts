import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { BtfpSidebar } from '../../layout/sidebar/sidebar';
import { BtfpTopbar } from '../../layout/topbar/topbar';
import { ProposalListPage } from './proposal-list/proposal-list';
import { ProposalListEmptyPage } from './proposal-list-empty/proposal-list-empty';

/** ประกอบหน้าเต็มเหมือนในแอป: เมนูซ้าย + แถบบน + เนื้อหา */
const shell = (page: string) => `
  <div style="display:flex; min-height:100vh; background:var(--btfp-bg-subtle)">
    <btfp-sidebar />
    <div style="flex:1; min-width:0">
      <btfp-topbar />
      <main style="padding:24px 40px 48px">${page}</main>
    </div>
  </div>
  <p-confirmdialog [style]="{ width: '440px' }" />`;

const meta: Meta = {
  title: 'Pages/B-01 ข้อเสนอโครงการ',
  decorators: [
    moduleMetadata({ imports: [BtfpSidebar, BtfpTopbar, ConfirmDialog, ProposalListPage, ProposalListEmptyPage] }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'หน้าตัวอย่างนำร่อง ข้อความพิมพ์ตรงใน HTML ทั้งหมด กดปุ่ม "ตัวกรองเพิ่มเติม (10)" เพื่อเปิด Drawer (B-01F) Figma: 60:7997',
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
