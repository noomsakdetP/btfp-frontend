import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmptyState } from '../../shared/ui';

/** หน้าชั่วคราวสำหรับเมนูที่ยังไม่ได้ขึ้นโครง ลิงก์ในเมนูจะได้ไม่เสีย */
@Component({
  selector: 'p-placeholder-page',
  imports: [EmptyState, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-empty-state
      type="general"
      title="หน้านี้ยังไม่ได้ขึ้นโครง"
      description="ตัวอย่างนำร่องมีเฉพาะหน้าข้อเสนอโครงการ (B-21) หน้าอื่นจะทยอยทำตามแบบใน Figma"
    />
    <p class="back"><a routerLink="/proposals">กลับไปหน้าข้อเสนอโครงการ</a></p>
  `,
  styles: `
    :host { display: block; background: var(--p-surface-raised); border: 1px solid var(--p-border-default); border-radius: var(--p-radius-card); }
    .back { text-align: center; margin: 0 0 48px; }
  `,
})
export class PlaceholderPage {}
