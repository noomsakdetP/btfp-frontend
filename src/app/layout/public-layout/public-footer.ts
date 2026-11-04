import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtfpIcon } from '../../shared/ui/icon/icon';

/** btfp-public-footer : ส่วนท้ายเว็บไซต์สาธารณะ (Figma: Public/Footer) */
@Component({
  selector: 'btfp-public-footer',
  imports: [RouterLink, BtfpIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <footer class="footer">
      <div class="mx-auto max-w-[1664px] px-4 pt-12 pb-8 md:px-8">
        <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <div class="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <span class="flex items-center gap-3">
              <img src="brand/logo-nbtc.png" alt="กสทช." width="27" height="40" />
              <span class="divider"></span>
              <img src="brand/logo-btfp.png" alt="กทปส." width="29" height="40" />
              <span class="brand">ระบบบริหารจัดการทุน กทปส.</span>
            </span>
            <p class="muted max-w-[480px]">กองทุนวิจัยและพัฒนากิจการกระจายเสียง กิจการโทรทัศน์ และกิจการโทรคมนาคม เพื่อประโยชน์สาธารณะ</p>
            <p class="muted flex max-w-[480px] gap-2">
              <btfp-icon class="mt-0.5" name="map-pin" size="18" />
              <span>สำนักงาน กสทช. 87 ถนนพหลโยธิน ซอย 8 แขวงสามเสนใน เขตพญาไท กรุงเทพฯ 10400</span>
            </p>
            <p class="flex flex-wrap gap-4">
              <a href="tel:026708888">โทร. 0 2670 8888</a>
              <a href="mailto:grant@btfp.or.th">grant&#64;btfp.or.th</a>
            </p>
          </div>

          <nav class="flex flex-col gap-3" aria-label="ค้นหาทุน">
            <h2>ค้นหาทุน</h2>
            <a routerLink="/grants">ประกาศทุนที่เปิดรับ</a>
            <a routerLink="/grants">ประเภททุน 1–3</a>
            <a routerLink="/grants">วัตถุประสงค์มาตรา 52</a>
            <a routerLink="/results">ผลงานจากทุน</a>
          </nav>
          <nav class="flex flex-col gap-3" aria-label="ช่วยเหลือ">
            <h2>ช่วยเหลือ</h2>
            <a routerLink="/guide">คู่มือผู้ขอรับทุน</a>
            <a routerLink="/guide">วิดีโอสาธิตการใช้งาน</a>
            <a routerLink="/faq">คำถามที่พบบ่อย</a>
            <a routerLink="/guide">ดาวน์โหลดแบบ ทบ.001–003</a>
          </nav>
          <nav class="flex flex-col gap-3" aria-label="นโยบาย">
            <h2>นโยบาย</h2>
            <a routerLink="/policy">นโยบายความเป็นส่วนตัว (PDPA)</a>
            <a routerLink="/policy">ข้อกำหนดการใช้งาน</a>
            <a routerLink="/policy">การเข้าถึงสำหรับทุกคน</a>
            <a routerLink="/sitemap">แผนผังเว็บไซต์</a>
          </nav>
        </div>

        <div class="bottom mt-10 flex flex-col gap-3 pt-6 md:flex-row md:items-center md:justify-between">
          <span>© 2569 สำนักงาน กสทช. สงวนลิขสิทธิ์ ปรับปรุงข้อมูลล่าสุด 30 ก.ย. 2569</span>
          <span class="flex flex-wrap gap-4">
            <a routerLink="/sitemap">แผนผังเว็บไซต์</a>
            <a routerLink="/policy">รองรับการเข้าถึง WCAG 2.1 AA</a>
            <span>ภาษาไทย</span>
          </span>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      background: var(--btfp-navy-900);
      color: var(--btfp-text-on-dark);
      font-size: var(--btfp-typography-body-s-size);
    }
    .brand {
      margin-left: 8px;
      font-family: var(--btfp-font-heading);
      font-size: var(--btfp-typography-h4-size);
      font-weight: var(--btfp-typography-h4-weight);
      color: var(--btfp-text-inverse);
    }
    .divider {
      width: 1px;
      height: 28px;
      background: var(--btfp-navy-600);
    }
    .muted {
      margin: 0;
      line-height: 1.6;
    }
    h2 {
      margin-bottom: 4px;
      font-size: var(--btfp-typography-body-l-size);
      color: var(--btfp-text-inverse);
    }
    a {
      color: var(--btfp-text-on-dark);
      text-decoration: none;
    }
    a:hover {
      color: var(--btfp-text-inverse);
      text-decoration: underline;
    }
    .bottom {
      border-top: 1px solid var(--btfp-navy-700);
      font-size: var(--btfp-typography-caption-size);
    }
  `,
})
export class BtfpPublicFooter {}
