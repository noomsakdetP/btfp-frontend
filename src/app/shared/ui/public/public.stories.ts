import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { Button } from 'primeng/button';
import { BtfpIcon } from '../icon/icon';
import { BtfpGrantCallCard } from './grant-call-card';
import { BtfpHeroBanner, BtfpHeroSlide } from './hero-banner';
import { BtfpNewsCard, BtfpProcessStep, BtfpResultCard, BtfpShowcaseCard } from './public-cards';
import { BtfpSectionHeader } from './section-header';

const meta: Meta = {
  title: 'Components/Public website/การ์ดและ Hero Banner',
  tags: ['autodocs'],
  id: 'components-public',
  decorators: [
    moduleMetadata({
      imports: [Button, BtfpIcon, BtfpHeroBanner, BtfpHeroSlide, BtfpSectionHeader, BtfpGrantCallCard, BtfpProcessStep, BtfpShowcaseCard, BtfpResultCard, BtfpNewsCard],
    }),
  ],
  parameters: {
    backgrounds: { default: 'white' },
    docs: {
      description: {
        component:
          'component ของหน้าเว็บไซต์สาธารณะ (Figma: Public/* และ Domain/Grant Call Card) รับค่าเป็น attribute ธรรมดา ใช้ในหน้าหุ่นจำลองได้โดยไม่มี binding',
      },
    },
  },
};
export default meta;

export const HeroBanner: StoryObj = {
  name: 'Hero Banner (สไลด์)',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Figma: Domain/Hero Banner เลื่อนเองทุก 4 วินาที (interval="0" เพื่อปิด) หยุดเมื่อชี้เมาส์หรือโฟกัส ลูกศรซ้ายขวา ปุ่มลูกศรบนคีย์บอร์ด ปัดบนจอสัมผัส และจุดเลือกสไลด์ สไลด์แรกเป็นภาพที่มีข้อความในตัว วางปุ่มด้วย artX / artY (พิกัดในภาพ 1920x720) จอเล็กกว่า 640px ใช้ mobileImage (ภาพ 390x440) สไลด์อื่นใส่ overlay + ข้อความ HTML',
      },
    },
  },
  render: () => ({
    template: `
      <btfp-hero-banner label="ประกาศและผลงานเด่น">
        <btfp-hero-slide image="images/landing/hero-slide-1.jpg" mobileImage="images/landing/hero-slide-1-mobile.jpg" alt="เปิดรับข้อเสนอโครงการเพื่อขอรับทุนจาก กสทช." artX="388" artY="430">
          <p-button size="large"><span>ดูประกาศทุนทั้งหมด</span><btfp-icon name="chevron-right" size="20" /></p-button>
        </btfp-hero-slide>
        <btfp-hero-slide image="images/landing/hero-slide-2.jpg" overlay tag="ทุนประเภท 2 เปิดรับแล้ว" tagSeverity="success">
          <h2>ทุนวิจัยและพัฒนาด้านโทรคมนาคม<br class="hidden md:inline" /> เพื่อประโยชน์สาธารณะ ปี 2570</h2>
          <p>ยื่นข้อเสนอโครงการได้ถึงวันที่ 31 ต.ค. 2569 ผ่านระบบออนไลน์</p>
          <p-button size="large"><span>ยื่นข้อเสนอ</span><btfp-icon name="chevron-right" size="20" /></p-button>
        </btfp-hero-slide>
        <btfp-hero-slide image="images/landing/hero-slide-3.jpg" overlay tag="ผลงานเด่น">
          <h2>ผลงานทุน กทปส. ที่ต่อยอด<br class="hidden md:inline" /> สู่การใช้งานจริงในชุมชน</h2>
          <p>รวมผลงานวิจัยและนวัตกรรมจากหน่วยงานผู้รับทุนทั่วประเทศ</p>
          <p-button size="large"><span>ดูผลงานทั้งหมด</span><btfp-icon name="chevron-right" size="20" /></p-button>
        </btfp-hero-slide>
      </btfp-hero-banner>`,
  }),
};

export const SectionHeader: StoryObj = {
  name: 'Section Header',
  render: () => ({
    template: `
      <btfp-section-header eyebrow="ประกาศทุนที่เปิดรับ" heading="โอกาสทุนสำหรับโครงการที่พร้อมสร้างผลลัพธ์"
        description="ตรวจสอบประเภททุน วัตถุประสงค์ตามมาตรา 52 หรือ TOR และกำหนดส่งข้อเสนอของแต่ละประกาศ">
        <a href="#" style="color:var(--btfp-action-link)">ดูประกาศทั้งหมด</a>
      </btfp-section-header>`,
  }),
};

export const GrantCallCard: StoryObj = {
  name: 'Grant Call Card (3 สถานะ)',
  render: () => ({
    template: `
      <div class="grid gap-6 md:grid-cols-3">
        <btfp-grant-call-card image="images/landing/cover-1.jpg" sector="กิจการโทรคมนาคม" grantType="ทุนประเภท 1" state="open"
          heading="ทุนประเภท 1 ประจำปี 2569" deadline="ปิดรับ 30 พ.ย. 2569 เวลา 16:30 น."
          scope="มาตรา 52(1)–(6) เลือกวัตถุประสงค์ได้ 1 ข้อ" budget="วงเงินรวม 150,000,000 บาท" />
        <btfp-grant-call-card image="images/landing/cover-2.jpg" sector="ทุกด้านกิจการ" grantType="ทุนประเภท 2" state="closing-soon"
          heading="ทุนประเภท 2 TOR ทักษะดิจิทัลชุมชน" deadline="ปิดรับ 3 ต.ค. 2569 เหลืออีก 3 วัน"
          scope="ตามนโยบายคณะกรรมการบริหารกองทุน" budget="วงเงินรวม 150,000,000 บาท" />
        <btfp-grant-call-card image="images/landing/cover-3.jpg" sector="ทุกด้านกิจการ" grantType="ทุนประเภท 2" state="closed"
          heading="ทุนประเภท 2 โครงการต่อเนื่อง" deadline="ปิดรับเมื่อ 15 ก.ย. 2569"
          scope="ต่อยอดโครงการทุนประเภท 2 ที่ปิดแล้ว" budget="วงเงินรวม 150,000,000 บาท" />
      </div>`,
  }),
};

export const ProcessStep: StoryObj = {
  name: 'Process Step',
  render: () => ({
    template: `
      <div class="grid gap-5 p-6 md:grid-cols-2" style="background:var(--btfp-navy-900)">
        <btfp-process-step step="01" icon="user-check" heading="ลงทะเบียนและยืนยันตัวตน" description="สร้างบัญชีหน่วยงาน ยืนยันรหัส OTP และตั้งค่า Google Authenticator" />
        <btfp-process-step step="02" icon="list-filter" heading="เลือกประกาศและขอบเขต" description="เลือกประเภททุน วัตถุประสงค์ตามมาตรา 52 หรือ TOR" />
      </div>`,
  }),
};

export const ShowcaseCard: StoryObj = {
  name: 'Project Showcase Card',
  render: () => ({
    template: `
      <div style="max-width:520px">
        <btfp-showcase-card image="images/landing/showcase-1.jpg" meta="ทุนประเภท 1 2568" heading="เครือข่ายสื่อสารฉุกเฉินสำหรับชุมชนพื้นที่สูง"
          org="มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา" description="เชื่อมศูนย์ประสานงานชุมชนกับหน่วยแพทย์และระบบเตือนภัยในพื้นที่สัญญาณจำกัด"
          outcome="เข้าถึง 18 ชุมชน อาสาสมัคร 240 คน" />
      </div>`,
  }),
};

export const ResultCard: StoryObj = {
  name: 'Project Result Card',
  render: () => ({
    template: `
      <div style="max-width:520px">
        <btfp-result-card image="images/landing/result-1.jpg" category="การศึกษาและรู้เท่าทันสื่อ"
          heading="หลักสูตรนักสืบข่าวดิจิทัลสำหรับโรงเรียน" meta="มูลนิธิสื่อเพื่อเยาวชน 2568" outcome="นำร่อง 35 โรงเรียน" />
      </div>`,
  }),
};

export const NewsCard: StoryObj = {
  name: 'News Card',
  render: () => ({
    template: `
      <div style="max-width:520px">
        <btfp-news-card image="images/landing/news-1.jpg" day="30" month="พ.ย. 69" category="กำหนดการ"
          heading="วันสุดท้ายรับข้อเสนอโครงการทุนประเภท 1 ประจำปี 2569"
          description="ระบบปิดรับข้อเสนอเวลา 16.30 น. ควรส่งล่วงหน้าเพื่อเผื่อเวลาตรวจสอบเอกสาร" />
      </div>`,
  }),
};
