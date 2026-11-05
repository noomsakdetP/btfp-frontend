import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { BtfpPublicFooter } from '../../../layout/public-layout/public-footer';
import { BtfpPublicTopbar } from '../../../layout/public-layout/public-topbar';
import { LandingPage } from '../../../pages/public/landing/landing';
import { BtfpRouteProgress, BtfpRouteProgressDemo } from './route-progress';

/**
 * ใช้เฉพาะ Storybook: วนแสดงสถานะเหมือนกดเมนูแล้วเน็ตช้า
 * ไม่มีอะไร 1 วินาที > แถบด้านบน > แถบ + วงกลมหมุน > หน้าเปิดเสร็จ แล้ววนใหม่
 */
@Component({
  selector: 'sb-route-progress-cycle',
  imports: [BtfpRouteProgress],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <btfp-route-progress [demo]="state()" />
    <div class="caption">{{ captions[step()] }}</div>
  `,
  styles: `
    .caption {
      position: fixed;
      left: 50%;
      bottom: 24px;
      z-index: 1300;
      transform: translateX(-50%);
      padding: 6px 16px;
      border-radius: var(--btfp-radius-full);
      background: var(--btfp-navy-900);
      font-size: var(--btfp-typography-body-s-medium-size);
      font-weight: var(--btfp-typography-body-s-medium-weight);
      color: var(--btfp-text-inverse);
    }
  `,
})
class RouteProgressCycle {
  readonly captions = ['กดเมนู (ยังไม่ถึง 150 ms ไม่แสดงอะไร)', 'รอเกิน 150 ms: แถบด้านบน', 'รอเกิน 800 ms: แถบ + วงกลมหมุน', 'หน้าเปิดเสร็จ: ซ่อนทั้งหมด'];
  private readonly states: BtfpRouteProgressDemo[] = ['', 'bar', 'spinner', ''];
  private readonly durations = [800, 1200, 2000, 1500];
  readonly step = signal(0);
  readonly state = signal<BtfpRouteProgressDemo>('');

  constructor() {
    let timer: ReturnType<typeof setTimeout>;
    const next = () => {
      const i = (this.step() + 1) % this.states.length;
      this.step.set(i);
      this.state.set(this.states[i]);
      timer = setTimeout(next, this.durations[i]);
    };
    timer = setTimeout(next, this.durations[0]);
    inject(DestroyRef).onDestroy(() => clearTimeout(timer));
  }
}

const meta: Meta<BtfpRouteProgress> = {
  title: 'Components/Feedback/Route Progress',
  component: BtfpRouteProgress,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [BtfpPublicTopbar, BtfpPublicFooter, LandingPage, RouteProgressCycle] })],
  argTypes: {
    demo: { control: 'inline-radio', options: ['', 'bar', 'spinner'], description: "ใช้เฉพาะ Storybook: 'bar' แถบด้านบน, 'spinner' แถบ + วงกลมหมุน" },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: '640px' },
      description: {
        component: [
          'แสดงว่ากำลังเปลี่ยนเมนู (Figma: Feedback/Progress Bar, Feedback/Loading Spinner)',
          '',
          '- **แถบวิ่ง** สูง 3px ติดขอบบนของจอ ขึ้นเมื่อรอเกิน 150 ms เปิดเร็วกว่านั้นจะไม่เห็นแถบกระพริบ',
          '- **วงกลมหมุน** กลางจอบนชั้นทับโปร่ง ขึ้นเมื่อรอเกิน 800 ms ใช้กรณีเน็ตช้า',
          '- ใส่ไว้ใน `app.ts` ครั้งเดียวแล้ว ทุกหน้าได้ทันที **หน้าใหม่ไม่ต้องใส่เอง**',
          '- ภายในใช้ `p-progressbar` และ `p-progressspinner` สีตาม `btfp-preset.ts`',
          '',
          'ตัวอย่างด้านล่างวางทับหน้าแรกจริง ตัวแรกวนให้ดูจังหวะการขึ้น อีกสองตัวบังคับแสดงค้างไว้ด้วย `demo` (ใช้เฉพาะ Storybook)',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<BtfpRouteProgress>;

/** หน้าแรกเป็นพื้นหลัง */
const page = `
  <div style="height:100vh;overflow:hidden;background:var(--btfp-surface-raised)">
    <btfp-public-topbar />
    <btfp-landing-page />
    <btfp-public-footer />
  </div>`;

export const Cycle: Story = {
  name: 'จำลองการเปลี่ยนเมนู (วนซ้ำ)',
  parameters: { docs: { source: { code: '<btfp-route-progress />' } } },
  render: () => ({ template: `${page}<sb-route-progress-cycle />` }),
};

export const Bar: Story = {
  name: 'แถบด้านบน (รอเกิน 150 ms)',
  args: { demo: 'bar' },
  render: (args) => ({ props: args, template: `${page}<btfp-route-progress [demo]="demo" />` }),
};

export const Spinner: Story = {
  name: 'แถบ + วงกลมหมุน (รอเกิน 800 ms)',
  args: { demo: 'spinner' },
  render: (args) => ({ props: args, template: `${page}<btfp-route-progress [demo]="demo" />` }),
};
