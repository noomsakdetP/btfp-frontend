import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { BtfpPublicFooter } from '../../../layout/public-layout/public-footer';
import { BtfpPublicTopbar } from '../../../layout/public-layout/public-topbar';
import { LandingPage } from '../../../pages/public/landing/landing';
import { BtfpRouteProgress } from './route-progress';

const captionStyle = `
  .caption {
    position: fixed; left: 50%; bottom: 24px; z-index: 100000; transform: translateX(-50%);
    padding: 6px 16px; border-radius: var(--p-radius-full); background: var(--p-navy-900);
    font-size: var(--p-typography-body-s-medium-size); font-weight: var(--p-typography-body-s-medium-weight); color: var(--p-text-inverse);
  }`;

/**
 * ใช้เฉพาะ Storybook: วนจำลองการกดเมนูแล้วรอหน้าเปิด 1.5 วินาที
 * ของจริง NgxUiLoaderRouterModule เรียกให้เองทุกครั้งที่เปลี่ยน route
 */
@Component({
  selector: 'sb-route-progress-cycle',
  imports: [BtfpRouteProgress],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<btfp-route-progress /><div class="caption">{{ busy() ? 'กดเมนู: กำลังโหลดหน้าใหม่' : 'หน้าเปิดเสร็จ' }}</div>`,
  styles: captionStyle,
})
class RouteProgressCycle {
  private readonly loader = inject(NgxUiLoaderService);
  readonly busy = signal(false);
  constructor() {
    let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      this.busy.set(true);
      this.loader.start('sb-route');
      timer = setTimeout(() => {
        this.loader.stop('sb-route');
        this.busy.set(false);
        timer = setTimeout(run, 1500);
      }, 1500);
    };
    timer = setTimeout(run, 800);
    inject(DestroyRef).onDestroy(() => { clearTimeout(timer); this.loader.stop('sb-route'); });
  }
}

/**
 * ใช้เฉพาะ Storybook: จำลองการเรียก API (background) ทุก 4 วินาที
 * ของจริง NgxUiLoaderHttpModule เรียกให้เองทุกครั้งที่ใช้ HttpClient
 */
@Component({
  selector: 'sb-route-progress-api',
  imports: [BtfpRouteProgress],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<btfp-route-progress /><div class="caption">{{ busy() ? 'กำลังเรียก API: แถบบนและวงหมุนมุมขวาล่าง ไม่บังหน้าจอ' : 'เรียก API เสร็จ' }}</div>`,
  styles: captionStyle,
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
  decorators: [moduleMetadata({ imports: [NgxUiLoaderModule, BtfpPublicTopbar, BtfpPublicFooter, LandingPage, RouteProgressCycle, RouteProgressApi] })],
  argTypes: {
    demo: { control: 'inline-radio', options: ['', 'foreground', 'background'] },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: '640px' },
      description: {
        component: [
          'แสดงว่ากำลังโหลด (Figma: Feedback/Progress Bar, Feedback/Loading Spinner) ภายในคือ `<ngx-ui-loader>` หน้าตาตามค่าที่ BA เลือก',
          '',
          '- **เปลี่ยนเมนู:** แถบบน 3px, ชั้นทับเทาเข้ม 80% เบลอหน้าเดิม 3px และแท่งเด้ง 80px กลางจอ',
          '- **เรียก API ผ่าน HttpClient:** แถบบน และวงหมุน 60px มุมขวาล่าง โปร่ง 50% ไม่บังหน้าจอ',
          '- แสดงอย่างน้อย 300 ms ขึ้นทันทีไม่มีหน่วง',
          '- ใส่ไว้ใน `app.ts` ครั้งเดียวแล้ว ทุกหน้าได้ทันที **หน้าใหม่ไม่ต้องใส่เอง** ห้ามใส่ `<ngx-ui-loader>` ในหน้า',
          '- ค่าตั้งอยู่ที่ `BTFP_LOADER_CONFIG` ใน `loader-providers.ts` สีผูก token `--p-loading-*` ใน `_tokens.scss`',
          '- งานที่ไม่ได้ผ่าน HttpClient สั่งเองได้: `loader.start(\'save\')` แล้ว `loader.stop(\'save\')` (NgxUiLoaderService)',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<BtfpRouteProgress>;

/** หน้าแรกเป็นพื้นหลัง ครอบด้วย ngxUiLoaderBlurred เหมือน app.ts */
const page = `
  <div ngxUiLoaderBlurred style="height:100vh;overflow:hidden;background:var(--p-surface-raised)">
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
  name: 'เรียก API (วนซ้ำ)',
  parameters: { docs: { source: { code: "// NgxUiLoaderHttpModule เรียกให้เองทุกครั้งที่ใช้ HttpClient\nthis.http.get('/api/proposals').subscribe();" } } },
  render: () => ({ template: `${page}<sb-route-progress-api />` }),
};

export const Foreground: Story = {
  name: 'เปลี่ยนเมนู (แสดงค้าง)',
  args: { demo: 'foreground' },
  render: (args) => ({ props: args, template: `${page}<btfp-route-progress [demo]="demo" />` }),
};

export const Background: Story = {
  name: 'เรียก API (แสดงค้าง)',
  args: { demo: 'background' },
  render: (args) => ({ props: args, template: `${page}<btfp-route-progress [demo]="demo" />` }),
};
