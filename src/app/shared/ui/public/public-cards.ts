import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BtfpIcon } from '../icon/icon';

/**
 * การ์ดของเว็บไซต์สาธารณะ (Figma: Public/*)
 * รับค่าเป็น attribute ธรรมดา ใช้ในหน้าหุ่นจำลองได้โดยไม่ต้องมี binding
 */

/** btfp-process-step : ขั้นตอนการสมัคร (Figma: Public/Process Step) วางบนพื้นน้ำเงินเข้ม */
@Component({
  selector: 'btfp-process-step',
  imports: [BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-between">
      <span class="num">{{ step() }}</span>
      <span class="icon"><btfp-icon [name]="icon()" size="20" /></span>
    </div>
    <h3 class="title">{{ heading() }}</h3>
    <p class="desc">{{ description() }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 26px;
      min-height: 250px;
      border-radius: var(--p-radius-card);
      background: var(--p-navy-800);
    }
    .num {
      font-family: var(--p-font-heading);
      font-size: var(--p-typography-h1-size);
      font-weight: var(--p-typography-h1-weight);
      line-height: 1.2;
      color: var(--p-blue-200);
    }
    .icon {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: var(--p-radius-full);
      background: var(--p-action-primary);
      color: var(--p-text-inverse);
    }
    .title {
      font-size: var(--p-typography-h3-size);
      color: var(--p-text-inverse);
    }
    .desc {
      margin: 0;
      font-size: var(--p-typography-body-s-size);
      color: var(--p-text-on-dark);
    }
  `,
})
export class BtfpProcessStep {
  readonly step = input.required<string>();
  readonly icon = input.required<string>();
  readonly heading = input.required<string>();
  readonly description = input<string>('');
}

/** btfp-showcase-card : ผลงานเด่น (Figma: Public/Project Showcase Card) */
@Component({
  selector: 'btfp-showcase-card',
  imports: [BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cover">
      <img [src]="image()" alt="" loading="lazy" />
      <span class="badge">ภาพประกอบ</span>
    </div>
    <div class="body">
      <p class="meta">{{ meta() }}</p>
      <h3 class="title">{{ heading() }}</h3>
      <p class="org">{{ org() }}</p>
      <p class="desc">{{ description() }}</p>
      <p class="outcome"><btfp-icon name="trending-up" size="16" />{{ outcome() }}</p>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--p-surface-raised);
      border: 1px solid var(--p-border-default);
      border-radius: var(--p-radius-card);
    }
    .cover {
      position: relative;
      aspect-ratio: 517 / 270;
    }
    .cover img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .badge {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 2px 8px;
      border-radius: var(--p-radius-tag);
      background: var(--p-badge-on-image);
      font-size: var(--p-typography-caption-size);
      color: var(--p-text-secondary);
    }
    .body {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 8px;
      padding: 24px;
    }
    .meta {
      margin: 0;
      font-size: var(--p-typography-body-s-medium-size);
      font-weight: var(--p-typography-body-s-medium-weight);
      color: var(--p-action-link);
    }
    .title {
      font-size: var(--p-typography-h2-size);
      line-height: 1.35;
    }
    .org {
      margin: 0;
      font-size: var(--p-typography-body-s-medium-size);
      font-weight: var(--p-typography-body-s-medium-weight);
      color: var(--p-text-secondary);
    }
    .desc {
      margin: 8px 0 0;
      font-size: var(--p-typography-body-s-size);
    }
    .outcome {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: auto 0 0;
      padding-top: 16px;
      border-top: 1px solid var(--p-border-default);
      font-size: var(--p-typography-body-s-medium-size);
      font-weight: var(--p-typography-body-s-medium-weight);
      color: var(--p-success-text);
    }
  `,
})
export class BtfpShowcaseCard {
  readonly image = input.required<string>();
  readonly meta = input<string>('');
  readonly heading = input.required<string>();
  readonly org = input<string>('');
  readonly description = input<string>('');
  readonly outcome = input<string>('');
}

/** btfp-result-card : ผลงานในฐานข้อมูล แบบรูปซ้าย (Figma: Public/Project Result Card) */
@Component({
  selector: 'btfp-result-card',
  imports: [BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cover">
      <img [src]="image()" alt="" loading="lazy" />
      <span class="badge">ภาพประกอบ</span>
    </div>
    <div class="body">
      <p class="category">{{ category() }}</p>
      <h3 class="title">{{ heading() }}</h3>
      <p class="meta">{{ meta() }}</p>
      <p class="outcome"><btfp-icon name="circle-check" size="16" />{{ outcome() }}</p>
    </div>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: 180px minmax(0, 1fr);
      min-height: 230px;
      overflow: hidden;
      background: var(--p-bg-subtle);
      border: 1px solid var(--p-border-default);
      border-radius: var(--p-radius-card);
    }
    .cover {
      position: relative;
    }
    .cover img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .badge {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 2px 8px;
      border-radius: var(--p-radius-tag);
      background: var(--p-badge-on-image);
      font-size: var(--p-typography-caption-size);
      color: var(--p-text-secondary);
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 20px;
    }
    .category {
      margin: 0;
      font-size: var(--p-typography-caption-size);
      color: var(--p-action-link);
    }
    .title {
      font-size: var(--p-typography-body-l-size);
      line-height: 1.35;
    }
    .meta {
      margin: 0;
      font-size: var(--p-typography-caption-size);
      color: var(--p-text-secondary);
    }
    .outcome {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 4px 0 0;
      font-size: var(--p-typography-body-s-medium-size);
      font-weight: var(--p-typography-body-s-medium-weight);
      color: var(--p-success-text);
    }
  `,
})
export class BtfpResultCard {
  readonly image = input.required<string>();
  readonly category = input<string>('');
  readonly heading = input.required<string>();
  readonly meta = input<string>('');
  readonly outcome = input<string>('');
}

/** btfp-news-card : ข่าวสาร (Figma: Public/News Card) */
@Component({
  selector: 'btfp-news-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cover">
      <img [src]="image()" alt="" loading="lazy" />
      <span class="date">
        <span class="day">{{ day() }}</span>
        <span class="month">{{ month() }}</span>
      </span>
    </div>
    <div class="body">
      <p class="category">{{ category() }}</p>
      <h3 class="title">{{ heading() }}</h3>
      <p class="desc">{{ description() }}</p>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--p-surface-raised);
      border: 1px solid var(--p-border-default);
      border-radius: var(--p-radius-card);
    }
    .cover {
      position: relative;
      aspect-ratio: 517 / 260;
    }
    .cover img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .date {
      position: absolute;
      top: 12px;
      left: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 60px;
      padding: 8px 10px;
      border-radius: var(--p-radius-button);
      background: var(--p-surface-raised);
    }
    .day {
      font-family: var(--p-font-heading);
      font-size: var(--p-typography-h1-size);
      font-weight: var(--p-typography-h1-weight);
      line-height: 1.1;
      color: var(--p-action-link);
    }
    .month {
      font-size: var(--p-typography-caption-size);
      color: var(--p-text-secondary);
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 20px;
    }
    .category {
      margin: 0;
      font-size: var(--p-typography-body-s-medium-size);
      font-weight: var(--p-typography-body-s-medium-weight);
      color: var(--p-action-link);
    }
    .title {
      font-size: var(--p-typography-body-l-size);
      line-height: 1.35;
      white-space: pre-line;
    }
    .desc {
      margin: 4px 0 0;
      font-size: var(--p-typography-body-s-size);
      color: var(--p-text-secondary);
    }
  `,
})
export class BtfpNewsCard {
  readonly image = input.required<string>();
  readonly day = input.required<string>();
  readonly month = input.required<string>();
  readonly category = input<string>('');
  readonly heading = input.required<string>();
  readonly description = input<string>('');
}
