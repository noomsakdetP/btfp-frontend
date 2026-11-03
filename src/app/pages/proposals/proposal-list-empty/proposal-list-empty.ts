import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { BtfpIcon } from '../../../shared/ui/icon/icon';
import { BtfpEmptyState, BtfpExportButton, BtfpKpiCard } from '../../../shared/ui';

/**
 * B-01E ข้อเสนอโครงการ: ยังไม่มีข้อมูล (Figma: 480:66623)
 *
 * ตัวอย่างการวาง btfp-empty-state ในตาราง ตอนต่อ API ไม่ต้องแยกหน้า
 * ให้ใช้ @if (proposals().length === 0) ในหน้า B-01 แทน
 */
@Component({
  selector: 'btfp-proposal-list-empty-page',
  imports: [RouterLink, Button, Tabs, TabList, Tab, BtfpIcon, BtfpEmptyState, BtfpExportButton, BtfpKpiCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-header">
      <div>
        <h1>ข้อเสนอโครงการ</h1>
        <p>ประกาศทุนประจำปีงบประมาณ 2569 ครั้งที่ 1 แสดงเฉพาะข้อเสนอใน TOR ของสำนักท่าน</p>
      </div>
      <div class="page-header__actions">
        <p-button [outlined]="true" routerLink="/reports">
          <btfp-icon name="chart-column" size="18" />
          <span>รายงาน</span>
        </p-button>
        <btfp-export-button />
      </div>
    </header>

    <p-tabs value="type-1">
      <p-tablist>
        <p-tab value="all">ทุกประเภท (0)</p-tab>
        <p-tab value="type-1">ทุนประเภท 1 (0)</p-tab>
        <p-tab value="type-2">ทุนประเภท 2 (0)</p-tab>
        <p-tab value="type-3">ทุนประเภท 3 (0)</p-tab>
        <p-tab value="other">ทุนอื่นๆ (MOU/USO)</p-tab>
      </p-tablist>
    </p-tabs>

    <section class="kpis">
      <btfp-kpi-card label="1. ยื่นเสนอโครงการ" value="0" caption="รอเจ้าหน้าที่รับเรื่อง" icon="send" />
      <btfp-kpi-card label="2. ตรวจสอบคุณสมบัติ" value="0" caption="ส่งกลับแก้ไข 0 รายการ" icon="clipboard-check" active />
      <btfp-kpi-card label="3. ตรวจโครงการเบื้องต้น" value="0" caption="รอความเห็นอนุกรรมการ" icon="list-checks" />
      <btfp-kpi-card label="4. สรุปสาระสำคัญ" value="0" caption="เสนอคณะกรรมการบริหารฯ" icon="file-text" />
      <btfp-kpi-card label="5. ผลการพิจารณา" value="0" caption="อนุมัติ 0 ไม่อนุมัติ 0" icon="circle-check" />
    </section>

    <section class="card">
      <btfp-empty-state
        type="general"
        title="ยังไม่มีข้อเสนอโครงการ"
        description="เมื่อผู้ขอรับทุนยื่นข้อเสนอในประกาศที่เปิดรับ รายการจะแสดงที่นี่"
      />
    </section>
  `,
  styles: `
    :host { display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; justify-content: space-between; gap: 16px; }
    .page-header h1 { font-size: 24px; line-height: 32px; }
    .page-header p { margin: 4px 0 0; color: var(--btfp-text-secondary); }
    .page-header__actions { display: flex; gap: 12px; }
    .kpis { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
    .card { background: var(--btfp-surface-raised); border: 1px solid var(--btfp-border-default); border-radius: var(--btfp-radius-card); }
  `,
})
export class ProposalListEmptyPage {}
