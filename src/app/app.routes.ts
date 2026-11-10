import { Routes } from '@angular/router';
import { PublicLayout } from './layout/public-layout/public-layout';
import { StaffLayout } from './layout/staff-layout/staff-layout';

const SITE = 'ระบบบริหารจัดการทุน กทปส.';

/** เมนูของเว็บไซต์สาธารณะที่ยังไม่ได้ขึ้นโครง (ไปหน้า placeholder ฝั่งหน้าบ้าน) */
const PUBLIC_PENDING = ['grants', 'results', 'news', 'faq', 'guide', 'contact', 'register', 'login/verify', 'login/staff', 'forgot-password', 'policy', 'sitemap'];

export const routes: Routes = [
  {
    // ===== เข้าสู่ระบบ (เต็มจอ ไม่มีแถบบน) =====
    // F-10 เข้าสู่ระบบ ขั้นที่ 1: อีเมลหรือเบอร์มือถือ  Figma 42:9007
    path: 'login',
    pathMatch: 'full',
    title: `เข้าสู่ระบบ | ${SITE}`,
    loadComponent: () => import('./pages/auth/login/login').then((m) => m.LoginPage),
  },
  {
    // ===== เว็บไซต์สาธารณะ (ผู้เยี่ยมชม / ผู้ขอรับทุนที่ยังไม่เข้าสู่ระบบ) =====
    path: '',
    component: PublicLayout,
    children: [
      {
        // หน้าแรก "ระบบประกาศทุนและผลงานทุน กทปส."  Figma 50:6410
        path: '',
        pathMatch: 'full',
        title: `ระบบประกาศทุนและผลงานทุน กทปส. | ${SITE}`,
        loadComponent: () => import('./pages/public/landing/landing').then((m) => m.LandingPage),
      },
      ...PUBLIC_PENDING.map((path) => ({
        path,
        title: `ยังไม่ได้ขึ้นโครง | ${SITE}`,
        loadComponent: () => import('./pages/public/placeholder/public-placeholder').then((m) => m.PublicPlaceholderPage),
      })),
    ],
  },
  {
    // ===== ระบบหลังบ้าน (เจ้าหน้าที่) =====
    path: '',
    component: StaffLayout,
    children: [
      {
        // B-21.3 ตัวอย่างสถานะยังไม่มีข้อมูล
        path: 'proposals/empty',
        title: `ข้อเสนอโครงการ | ${SITE}`,
        loadComponent: () => import('./pages/proposals/proposal-list-empty/proposal-list-empty').then((m) => m.ProposalListEmptyPage),
      },
      {
        // B-21 ข้อเสนอโครงการ (เจ้าหน้าที่)
        path: 'proposals',
        title: `ข้อเสนอโครงการ | ${SITE}`,
        loadComponent: () => import('./pages/proposals/proposal-list/proposal-list').then((m) => m.ProposalListPage),
        children: [
          {
            // B-21.2 ตัวกรองเพิ่มเติม (Drawer) เปิดทับหน้า B-21
            path: 'filters',
            title: `ตัวกรองเพิ่มเติม | ${SITE}`,
            loadComponent: () =>
              import('./pages/proposals/proposal-filter-drawer/proposal-filter-drawer').then((m) => m.ProposalFilterDrawer),
          },
        ],
      },
      {
        // เมนูเจ้าหน้าที่ที่ยังไม่ได้ขึ้นโครง
        path: '**',
        title: `ยังไม่ได้ขึ้นโครง | ${SITE}`,
        loadComponent: () => import('./pages/placeholder/placeholder').then((m) => m.PlaceholderPage),
      },
    ],
  },
];
