import { Routes } from '@angular/router';
import { BtfpStaffLayout } from './layout/staff-layout/staff-layout';

export const routes: Routes = [
  {
    path: '',
    component: BtfpStaffLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'proposals' },
      {
        // B-01 ข้อเสนอโครงการ (เจ้าหน้าที่)
        path: 'proposals',
        title: 'ข้อเสนอโครงการ | ระบบบริหารจัดการทุน กทปส.',
        loadComponent: () => import('./pages/proposals/proposal-list/proposal-list').then((m) => m.ProposalListPage),
      },
      {
        // B-01E ตัวอย่างสถานะยังไม่มีข้อมูล
        path: 'proposals/empty',
        title: 'ข้อเสนอโครงการ | ระบบบริหารจัดการทุน กทปส.',
        loadComponent: () => import('./pages/proposals/proposal-list-empty/proposal-list-empty').then((m) => m.ProposalListEmptyPage),
      },
      {
        // เมนูอื่นที่ยังไม่ได้ขึ้นโครง
        path: '**',
        title: 'ยังไม่ได้ขึ้นโครง | ระบบบริหารจัดการทุน กทปส.',
        loadComponent: () => import('./pages/placeholder/placeholder').then((m) => m.PlaceholderPage),
      },
    ],
  },
];
