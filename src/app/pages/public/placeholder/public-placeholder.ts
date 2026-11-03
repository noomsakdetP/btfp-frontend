import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtfpEmptyState } from '../../../shared/ui';

/** หน้าชั่วคราวของเว็บไซต์สาธารณะ สำหรับเมนูที่ยังไม่ได้ขึ้นโครง ลิงก์จะได้ไม่เสีย */
@Component({
  selector: 'btfp-public-placeholder-page',
  imports: [BtfpEmptyState, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-[1664px] px-4 py-16 md:px-8">
      <div class="box">
        <btfp-empty-state
          type="general"
          title="หน้านี้ยังไม่ได้ขึ้นโครง"
          description="หน้าตัวอย่างของเว็บไซต์สาธารณะตอนนี้มีเฉพาะหน้าแรก หน้าอื่นจะทยอยทำตามแบบใน Figma"
        />
        <p class="back"><a routerLink="/">กลับหน้าแรก</a></p>
      </div>
    </div>
  `,
  styles: `
    .box { border: 1px solid var(--btfp-border-default); border-radius: var(--btfp-radius-card); background: var(--btfp-surface-raised); }
    .back { margin: 0 0 48px; text-align: center; }
  `,
})
export class PublicPlaceholderPage {}
