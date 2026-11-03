import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { BtfpGrantCallCard } from './grant-call-card';
import { BtfpNewsCard, BtfpProcessStep, BtfpResultCard, BtfpShowcaseCard } from './public-cards';
import { BtfpSectionHeader } from './section-header';

const meta: Meta = {
  title: 'Components/Public (เว็บไซต์สาธารณะ)',
  id: 'components-public',
  decorators: [
    moduleMetadata({
      imports: [BtfpSectionHeader, BtfpGrantCallCard, BtfpProcessStep, BtfpShowcaseCard, BtfpResultCard, BtfpNewsCard],
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
