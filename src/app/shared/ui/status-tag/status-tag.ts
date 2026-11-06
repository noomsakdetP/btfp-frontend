import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BtfpIcon } from '../icon/icon';

/** สีของป้าย ตามชุดสีใน Figma */
export type BtfpStatusSeverity = 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'navy' | 'teal' | 'orange';

/** 14 สถานะของข้อเสนอโครงการ (Figma: Domain/Status Badge, property Status) */
export type BtfpStatus =
  | 'draft'
  | 'send'
  | 'review'
  | 'suspend'
  | 'docs-incomplete'
  | 'not-qualified'
  | 'reject'
  | 'passed-check'
  | 'board'
  | 'submitted'
  | 'in-progress'
  | 'awaiting-disbursement'
  | 'delayed'
  | 'closed';

/** สี ไอคอน และข้อความของแต่ละสถานะ ตรงกับ Figma ทุกค่า แก้ที่นี่ที่เดียว */
export const BTFP_STATUS: Record<BtfpStatus, { severity: BtfpStatusSeverity; icon: string; label: string }> = {
  draft: { severity: 'secondary', icon: 'pencil', label: 'ฉบับร่าง' },
  send: { severity: 'info', icon: 'send', label: 'ส่งแล้ว รอการตรวจสอบ' },
  review: { severity: 'navy', icon: 'hourglass', label: 'รอการพิจารณา' },
  suspend: { severity: 'warn', icon: 'rotate-ccw', label: 'ไม่ผ่าน รอแก้ไข' },
  'docs-incomplete': { severity: 'warn', icon: 'circle-alert', label: 'เอกสารไม่ครบ รอแก้ไข' },
  'not-qualified': { severity: 'danger', icon: 'ban', label: 'ไม่ผ่านคุณสมบัติ' },
  reject: { severity: 'danger', icon: 'circle-x', label: 'ไม่อนุมัติ' },
  'passed-check': { severity: 'teal', icon: 'circle-check', label: 'ผ่านการตรวจสอบ' },
  board: { severity: 'teal', icon: 'landmark', label: 'ผ่านความเห็นชอบ เสนอบอร์ด กสทช.' },
  submitted: { severity: 'success', icon: 'circle-check', label: 'อนุมัติ' },
  'in-progress': { severity: 'teal', icon: 'list-checks', label: 'ดำเนินโครงการ' },
  'awaiting-disbursement': { severity: 'navy', icon: 'wallet', label: 'รอเบิกจ่าย' },
  delayed: { severity: 'orange', icon: 'calendar-clock', label: 'ล่าช้า' },
  closed: { severity: 'secondary', icon: 'clipboard-check', label: 'ปิดโครงการ' },
};

/**
 * btfp-status-tag : ป้ายสถานะ (Figma: Domain/Status Badge)
 *
 * วิธีใช้ที่แนะนำ: ใส่ status อย่างเดียว ได้สี ไอคอน และข้อความตาม Figma อัตโนมัติ ไม่ต้องเลือกสีเอง
 *   <btfp-status-tag status="review" />                     แสดง "รอการพิจารณา" สี navy
 *
 * ใช้กับป้ายอื่นที่ไม่ใช่ 14 สถานะ: ใส่ severity + icon + ข้อความเอง
 *   <btfp-status-tag severity="teal" icon="circle-check">ตรวจแล้ว</btfp-status-tag>
 *
 * ขนาดตาม Figma: สูง 32px มุมมน ขอบซ้ายขวา 8px ไอคอน 16px ตัวอักษร Sarabun Medium 14px
 *
 * ทำไมไม่ใช้ p-tag: p-tag มีสีแค่ 6 แบบ แต่ Figma ใช้ 8 ชุด (มี navy, teal, orange) ต้องเขียนสีเองอยู่ดี
 */
@Component({
  selector: 'btfp-status-tag',
  imports: [BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-severity]': 'resolvedSeverity()' },
  template: `
    @if (resolvedIcon(); as name) {
      <btfp-icon [name]="name" size="16" />
    }
    <span class="label"><ng-content>{{ defaultLabel() }}</ng-content></span>
  `,
  styles: `
    :host {
      --tag-bg: var(--p-info-bg);
      --tag-border: var(--p-info-border);
      --tag-text: var(--p-info-text);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      max-width: 100%;
      height: 32px;
      padding: 0 8px;
      border: 1px solid var(--tag-border);
      border-radius: var(--p-radius-full);
      background: var(--tag-bg);
      color: var(--tag-text);
      font-size: var(--p-typography-body-s-medium-size);
      font-weight: var(--p-typography-body-s-medium-weight);
      line-height: 1.5;
      white-space: nowrap;
      vertical-align: middle;
    }
    :host btfp-icon {
      display: inline-flex;
      flex-shrink: 0;
    }
    .label {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :host([data-severity='success']) { --tag-bg: var(--p-success-bg); --tag-border: var(--p-success-border); --tag-text: var(--p-success-text); }
    :host([data-severity='warn']) { --tag-bg: var(--p-warning-bg); --tag-border: var(--p-warning-border); --tag-text: var(--p-warning-text); }
    :host([data-severity='danger']) { --tag-bg: var(--p-danger-bg); --tag-border: var(--p-danger-border); --tag-text: var(--p-danger-text); }
    :host([data-severity='secondary']) { --tag-bg: var(--p-gray-50); --tag-border: var(--p-gray-200); --tag-text: var(--p-gray-700); }
    :host([data-severity='navy']) { --tag-bg: var(--p-navy-50); --tag-border: var(--p-navy-200); --tag-text: var(--p-navy-700); }
    :host([data-severity='teal']) { --tag-bg: var(--p-teal-50); --tag-border: var(--p-teal-200); --tag-text: var(--p-teal-700); }
    :host([data-severity='orange']) { --tag-bg: var(--p-orange-50); --tag-border: var(--p-orange-200); --tag-text: var(--p-orange-700); }
  `,
})
export class BtfpStatusTag {
  /** สถานะตาม Figma ใส่แล้วไม่ต้องใส่ severity / icon / ข้อความ */
  readonly status = input<BtfpStatus>();
  /** สีของป้าย (ใช้เมื่อไม่ได้ใส่ status หรืออยากเปลี่ยนสี) */
  readonly severity = input<BtfpStatusSeverity>();
  /** ชื่อไอคอน Lucide (kebab-case) */
  readonly icon = input<string>();

  private readonly preset = computed(() => {
    const s = this.status();
    return s ? BTFP_STATUS[s] : undefined;
  });
  protected readonly resolvedSeverity = computed(() => this.severity() ?? this.preset()?.severity ?? 'info');
  protected readonly resolvedIcon = computed(() => this.icon() ?? this.preset()?.icon);
  protected readonly defaultLabel = computed(() => this.preset()?.label ?? '');
}
