import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { PublicFooter } from '../../../layout/public-layout/public-footer';
import { PublicTopbar } from '../../../layout/public-layout/public-topbar';
import { LandingPage } from '../../../pages/public/landing/landing';
import { RouteProgress } from './route-progress';

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
  imports: [RouteProgress],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p-route-progress /><div class="caption">{{ busy() ? 'กดเมนู: กำลังโหลดหน้าใหม่' : 'หน้าเปิดเสร็จ' }}</div>`,
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

const meta: Meta<RouteProgress> = {
  title: 'Components/Feedback/Route Progress',
  component: RouteProgress,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [NgxUiLoaderModule, PublicTopbar, PublicFooter, LandingPage, RouteProgressCycle] })],
  argTypes: {
    demo: { control: 'inline-radio', options: ['', 'foreground'] },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, height: '640px' },
      description: {
        component: [
          'แสดงว่ากำลังเปลี่ยนเมนู (Figma: Feedback/Progress Bar, Feedback/Loading Spinner) ภายในคือ `<ngx-ui-loader>` หน้าตาตามค่าที่ BA เลือก',
          '',
          '- **เปลี่ยนเมนู:** แถบบน 3px, ชั้นทับพื้นเข้มของระบบ โปร่ง 80% เบลอหน้าเดิม 3px และแท่งเด้ง 80px กลางจอ',
          '- **เรียก API ไม่ใช้ตัวนี้:** แสดงสถานะที่ component ที่ผู้ใช้กด เช่น `<p-button loading>` หรือแถว `p-skeleton` ในตาราง (ดู PrimeNG > Feedback > Progress และ Spinner)',
          '- แสดงอย่างน้อย 300 ms ขึ้นทันทีไม่มีหน่วง',
          '- ใส่ไว้ใน `app.ts` ครั้งเดียวแล้ว ทุกหน้าได้ทันที **หน้าใหม่ไม่ต้องใส่เอง** ห้ามใส่ `<ngx-ui-loader>` ในหน้า',
          '- ค่าตั้งอยู่ที่ `BTFP_LOADER_CONFIG` ใน `loader-providers.ts` สีผูก token `--p-loading-*` ใน `_tokens.scss`',
          '',
          '**สีของตัวโหลด** (ดูค่าจริงที่ Foundations > สี > Loading)',
          '',
          '| ส่วน | ค่าใน config | token | ผูกกับ semantic |',
          '| --- | --- | --- | --- |',
          '| แถบบน | `pbColor` | `--p-loading-spinner` | `--p-action-primary` |',
          '| แท่งเด้งกลางจอ | `fgsColor` | `--p-loading-spinner` | `--p-action-primary` |',
          '| ชั้นทับ | `overlayColor` | `--p-loading-overlay` | `--p-bg-inverse` โปร่ง 80% |',
          '| ข้อความ | `textColor` | `--p-loading-text` | `--p-text-inverse` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<RouteProgress>;

/** หน้าแรกเป็นพื้นหลัง ครอบด้วย ngxUiLoaderBlurred เหมือน app.ts */
const page = `
  <div ngxUiLoaderBlurred style="height:100vh;overflow:hidden;background:var(--p-surface-raised)">
    <p-public-topbar />
    <p-landing-page />
    <p-public-footer />
  </div>`;

export const Cycle: Story = {
  name: 'จำลองการเปลี่ยนเมนู (วนซ้ำ)',
  parameters: { docs: { source: { code: '<p-route-progress />' } } },
  render: () => ({ template: `${page}<sb-route-progress-cycle />` }),
};

export const Foreground: Story = {
  name: 'เปลี่ยนเมนู (แสดงค้าง)',
  args: { demo: 'foreground' },
  render: (args) => ({ props: args, template: `${page}<p-route-progress [demo]="demo" />` }),
};
