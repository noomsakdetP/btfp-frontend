import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { BtfpIcon } from '../icon/icon';

export type BtfpGrantCallState = 'open' | 'closing-soon' | 'closed';

/**
 * btfp-grant-call-card : การ์ดประกาศทุน (Figma: Domain/Grant Call Card)
 *
 * @example
 * <btfp-grant-call-card image="images/landing/cover-1.jpg" sector="กิจการโทรคมนาคม" grantType="ทุนประเภท 1"
 *   state="open" heading="ทุนประเภท 1 ประจำปี 2569" deadline="ปิดรับ 30 พ.ย. 2569 เวลา 16:30 น."
 *   scope="มาตรา 52(1)–(6) เลือกวัตถุประสงค์ได้ 1 ข้อ" budget="วงเงินรวม 150,000,000 บาท" />
 */
@Component({
  selector: 'btfp-grant-call-card',
  imports: [RouterLink, Button, BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-closed]': "state() === 'closed'" },
  template: `
    <div class="cover">
      <img [src]="image()" alt="" loading="lazy" />
      <span class="sector">{{ sector() }}</span>
    </div>
    <div class="flex items-center justify-between gap-2">
      <span class="chip chip--info">{{ grantType() }}</span>
      <span class="chip" [class]="'chip--' + state()">{{ stateLabel() }}</span>
    </div>
    <h3 class="title">{{ heading() }}</h3>
    <ul class="meta">
      <li [class.is-urgent]="state() === 'closing-soon'"><btfp-icon name="calendar" size="16" /><span>{{ deadline() }}</span></li>
      <li><btfp-icon name="landmark" size="16" /><span>{{ scope() }}</span></li>
      <li><btfp-icon name="banknote" size="16" /><span>{{ budget() }}</span></li>
    </ul>
    <div class="actions">
      <a class="link" routerLink="/grants"><btfp-icon name="file-text" size="16" />ดูประกาศ</a>
      <p-button label="ยื่นข้อเสนอ" size="small" routerLink="/login" [disabled]="state() === 'closed' || submitDisabled()" />
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
      background: var(--btfp-surface-raised);
      border: 1px solid var(--btfp-border-default);
      border-radius: var(--btfp-radius-card);
    }
    .cover {
      position: relative;
      aspect-ratio: 340 / 140;
      overflow: hidden;
      border-radius: var(--btfp-radius-button);
    }
    .cover img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    :host(.is-closed) .cover img {
      filter: grayscale(1);
    }
    .sector {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 2px 8px;
      border-radius: var(--btfp-radius-tag);
      background: var(--btfp-badge-on-image);
      font-size: var(--btfp-typography-caption-size);
      color: var(--btfp-text-secondary);
    }
    .chip {
      padding: 2px 8px;
      border: 1px solid;
      border-radius: var(--btfp-radius-tag);
      font-size: var(--btfp-typography-body-s-size);
      white-space: nowrap;
    }
    .chip--info { background: var(--btfp-info-bg); border-color: var(--btfp-info-border); color: var(--btfp-info-text); }
    .chip--open { background: var(--btfp-success-bg); border-color: var(--btfp-success-border); color: var(--btfp-success-text); }
    .chip--closing-soon { background: var(--btfp-warning-bg); border-color: var(--btfp-warning-border); color: var(--btfp-warning-text); }
    .chip--closed { background: var(--btfp-gray-50); border-color: var(--btfp-border-default); color: var(--btfp-text-secondary); }
    .title {
      font-size: var(--btfp-typography-body-l-size);
      line-height: 1.35;
      white-space: pre-line;
    }
    .meta {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: var(--btfp-typography-body-s-size);
      color: var(--btfp-text-secondary);
    }
    .meta li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      min-width: 0;
    }
    .meta li span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .meta btfp-icon {
      margin-top: 3px;
      color: var(--btfp-icon-subtle);
    }
    .meta li.is-urgent {
      color: var(--btfp-orange-600);
    }
    .meta li.is-urgent btfp-icon {
      color: var(--btfp-orange-600);
    }
    .actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
      margin-top: auto;
      padding-top: 4px;
    }
    .link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: var(--btfp-typography-body-s-size);
      color: var(--btfp-action-link);
      text-decoration: none;
    }
    .link:hover {
      text-decoration: underline;
    }
  `,
})
export class BtfpGrantCallCard {
  readonly image = input.required<string>();
  readonly sector = input<string>('');
  readonly grantType = input.required<string>();
  readonly state = input<BtfpGrantCallState>('open');
  readonly heading = input.required<string>();
  readonly deadline = input<string>('');
  readonly scope = input<string>('');
  readonly budget = input<string>('');
  /** ปิดปุ่มยื่นข้อเสนอแม้ประกาศยังเปิด เช่น ไม่มีโครงการเดิมให้ยื่นต่อเนื่อง */
  readonly submitDisabled = input(false, { transform: booleanAttribute });

  protected readonly stateLabel = computed(
    () => ({ open: 'เปิดรับ', 'closing-soon': 'ใกล้ปิดรับ', closed: 'ปิดรับแล้ว' })[this.state()],
  );
}
