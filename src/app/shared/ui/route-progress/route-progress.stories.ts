import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BtfpPublicFooter } from '../../../layout/public-layout/public-footer';
import { BtfpPublicTopbar } from '../../../layout/public-layout/public-topbar';
import { LandingPage } from '../../../pages/public/landing/landing';
import { BtfpRouteProgress, BtfpRouteProgressDemo, BtfpSpinnerVariant } from './route-progress';

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
      border-radius: var(--p-radius-full);
      background: var(--p-navy-900);
      font-size: var(--p-typography-body-s-medium-size);
      font-weight: var(--p-typography-body-s-medium-weight);
      color: var(--p-text-inverse);
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

/**
 * ใช้เฉพาะ Storybook: จำลองการเรียก API ผ่าน NgxUiLoaderService (background) ทุก 4 วินาที
 * ของจริง NgxUiLoaderHttpModule เรียกให้เองทุกครั้งที่ใช้ HttpClient
 */
@Component({
  selector: 'sb-route-progress-api',
  imports: [BtfpRouteProgress],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<btfp-route-progress /><div class="caption">{{ busy() ? 'กำลังเรียก API: แถบด้านบนอย่างเดียว ไม่บังหน้าจอ' : 'เรียก API เสร็จ' }}</div>`,
  styles: `
    .caption {
      position: fixed; left: 50%; bottom: 24px; z-index: 1300; transform: translateX(-50%);
      padding: 6px 16px; border-radius: var(--p-radius-full); background: var(--p-navy-900);
      font-size: var(--p-typography-body-s-medium-size); font-weight: var(--p-typography-body-s-medium-weight); color: var(--p-text-inverse);
    }
  `,
})
class RouteProgressApi {
  private readonly loader = inject(NgxUiLoaderService);
  readonly busy = signal(false);
  constructor() {
    let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      this.busy.set(true);
      this.loader.startBackground('sb-api');
      timer = setTimeout(() => {
        this.loader.stopBackground('sb-api');
        this.busy.set(false);
        timer = setTimeout(run, 1500);
      }, 2500);
    };
    timer = setTimeout(run, 500);
    inject(DestroyRef).onDestroy(() => { clearTimeout(timer); this.loader.stopBackground('sb-api'); });
  }
}

const meta: Meta<BtfpRouteProgress> = {
  title: 'Components/Feedback/Route Progress',
  component: BtfpRouteProgress,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [BtfpPublicTopbar, BtfpPublicFooter, LandingPage, RouteProgressCycle, RouteProgressApi] })],
  argTypes: {
    variant: { control: 'inline-radio', options: ['primeng', 'wave', 'bars', 'orbit', 'logo'], description: 'ตัวเลือกวงหมุน (ชั่วคราว ให้ BA เลือก)' },
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
          '- ตัวจับว่ากำลังโหลดคือ **ngx-ui-loader** ตั้งค่าใน `app.config.ts` ด้วย `btfpLoaderProviders()` เปลี่ยนเมนูแสดงแถบและวงกลม เรียก API ผ่าน HttpClient แสดงแถบอย่างเดียว',
          '- งานที่ไม่ได้ผ่าน HttpClient สั่งเองได้: `loader.start(\'save\')` แล้ว `loader.stop(\'save\')` (NgxUiLoaderService)',
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
  <div style="height:100vh;overflow:hidden;background:var(--p-surface-raised)">
    <btfp-public-topbar />
    <btfp-landing-page />
    <btfp-public-footer />
  </div>`;

export const Cycle: Story = {
  name: 'จำลองการเปลี่ยนเมนู (วนซ้ำ)',
  parameters: { docs: { source: { code: '<btfp-route-progress />' } } },
  render: () => ({ template: `${page}<sb-route-progress-cycle />` }),
};

export const Api: Story = {
  name: 'เรียก API (แถบด้านบนอย่างเดียว)',
  parameters: { docs: { source: { code: "// NgxUiLoaderHttpModule เรียกให้เองทุกครั้งที่ใช้ HttpClient\nthis.http.get('/api/proposals').subscribe();" } } },
  render: () => ({ template: `${page}<sb-route-progress-api />` }),
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

// ---------- ตัวเลือกวงหมุน (ชั่วคราว ให้ BA เลือก เลือกแล้วลบแบบที่ไม่ใช้) ----------
const VARIANTS: [BtfpSpinnerVariant, string][] = [
  ['wave', 'แบบ 3 คลื่นสัญญาณ'],
  ['bars', 'แบบ 4 แท่งสัญญาณ'],
  ['orbit', 'แบบ 5 ดาวเทียมโคจร'],
  ['logo', 'แบบ 6 โลโก้ + แถบวิ่ง'],
  ['primeng', 'ปัจจุบัน (PrimeNG)'],
];

/** transform ทำให้ชั้นทับ position: fixed อยู่ในกรอบของแต่ละช่อง จึงวางเทียบกันได้ */
export const Options: Story = {
  name: 'ตัวเลือกวงหมุน (ให้ BA เลือก)',
  parameters: { docs: { story: { height: '560px' }, source: { code: '<btfp-route-progress variant="wave" />' } } },
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;padding:24px;background:var(--p-surface-raised)">
        ${VARIANTS.map(([v, label]) => `
          <figure style="margin:0;display:flex;flex-direction:column;gap:8px">
            <div style="position:relative;height:220px;overflow:hidden;transform:translateZ(0);border:1px solid var(--p-border-default);border-radius:var(--p-radius-card);background:var(--p-bg-subtle)">
              <div style="padding:24px"><p class="btfp-text-h4" style="margin:0">ข้อเสนอโครงการ</p><p class="btfp-text-body-s" style="margin:4px 0 0">เนื้อหาหน้าเดิม</p></div>
              <btfp-route-progress demo="spinner" variant="${v}" />
            </div>
            <figcaption class="btfp-text-body-s-medium" style="text-align:center">${label}</figcaption>
          </figure>`).join('')}
      </div>`,
  }),
};

const onLanding = (v: BtfpSpinnerVariant, label: string): Story => ({
  name: `${label} บนหน้าแรก`,
  args: { demo: 'spinner', variant: v },
  render: (args) => ({ props: args, template: `${page}<btfp-route-progress [demo]="demo" [variant]="variant" />` }),
});
export const Wave = onLanding('wave', 'แบบ 3 คลื่นสัญญาณ');
export const Bars = onLanding('bars', 'แบบ 4 แท่งสัญญาณ');
export const Orbit = onLanding('orbit', 'แบบ 5 ดาวเทียมโคจร');
export const Logo = onLanding('logo', 'แบบ 6 โลโก้ + แถบวิ่ง');
