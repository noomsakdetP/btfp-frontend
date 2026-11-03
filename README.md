# ระบบบริหารจัดการทุน กทปส. : Front-end นำร่อง

โครงหน้าเว็บตัวอย่างจากงานออกแบบใน Figma ให้ทีม dev ใช้เป็นแบบ

- **Angular 21** (standalone, zoneless, signals)
- **PrimeNG 21** ธีม Aura ปรับด้วย preset จาก Figma token
- **Storybook 10** สำหรับดู component และหน้าตัวอย่าง
- ไอคอน **Lucide** ชุดเดียวกับ Figma
- ฟอนต์ **Sarabun** (เนื้อหา) และ **IBM Plex Sans Thai** (หัวข้อ)

หน้าที่ทำแล้ว: **B-01 ข้อเสนอโครงการ (เจ้าหน้าที่)** พร้อม Drawer ตัวกรองเพิ่มเติม (B-01F) และสถานะยังไม่มีข้อมูล (B-01E)

> ข้อความทั้งหมดในหน้าพิมพ์ตรงใน HTML ยังไม่ต่อ API ตามที่ตกลงกับทีม

---

## เริ่มใช้งาน

ต้องมี Node.js 20.19 ขึ้นไป (แนะนำ 22 LTS)

```bash
npm install
npm start                 # เปิดแอปที่ http://localhost:4200
npm run storybook         # เปิด Storybook ที่ http://localhost:6006
npm run build             # build แอปไว้ที่ dist/
npm run build-storybook   # build Storybook ไว้ที่ storybook-static/
```

**เครื่อง Windows ที่บริษัทบล็อก PowerShell script:** ให้เปิด **Command Prompt (cmd)** แล้วรันคำสั่งเดิม ไม่ต้องใช้ PowerShell

ไฟล์ `.npmrc` ตั้ง `legacy-peer-deps=true` ไว้แล้ว เพราะ npm 10 มีบั๊กตอนติดตั้ง peer dependency ของ jsdom

---

## โครงสร้างโฟลเดอร์

```
src/
  styles/_tokens.scss          token จาก Figma (สี ระยะ มุมโค้ง ขนาด) เป็น CSS variable --btfp-*
  styles.scss                  สไตล์พื้นฐาน และ class กลาง (.btfp-field, .btfp-link-button)
  app/
    app.config.ts              ตั้งค่า PrimeNG (preset, ภาษาไทย) ใช้ร่วมกับ Storybook
    app.routes.ts              เส้นทางหน้า
    theme/
      btfp-preset.ts           ธีม PrimeNG ที่ปรับตาม Figma
      th-locale.ts             ข้อความภาษาไทยของ PrimeNG
      icons.ts                 รายชื่อไอคอนที่ใช้ในระบบ
    layout/                    btfp-staff-layout, btfp-sidebar, btfp-topbar
    shared/ui/                 component กลาง btfp-* (มี .stories.ts คู่กันทุกตัว)
    pages/
      proposals/proposal-list/        B-01
      proposals/proposal-list-empty/  B-01E
      placeholder/                    หน้าชั่วคราวของเมนูที่ยังไม่ทำ
  docs/introduction.mdx        หน้าแรกของ Storybook
```

---

## Component กลาง (btfp-*)

| Component | ใช้แทน / สร้างบน | Figma |
| --- | --- | --- |
| `btfp-icon` | ไอคอน Lucide | icon/* |
| `btfp-status-tag` | `p-tag` | DataDisplay/Tag |
| `btfp-row-actions` | `p-button` + `p-confirmdialog` | Domain/Table Row Actions |
| `btfp-kpi-card` | เขียนเอง (PrimeNG ไม่มี) | Domain/KPI Stat Card |
| `btfp-empty-state` | เขียนเอง (PrimeNG ไม่มี) | Empty State |
| `btfp-export-button` | `p-button` + `p-menu` | Actions/Export Menu Button |
| `btfp-datepicker` | `p-datepicker` + แสดงปี พ.ศ. | Forms/DatePicker |

**หลักการเลือก**

1. PrimeNG มีและหน้าตาปรับผ่าน preset ได้ ใช้ PrimeNG ตรง ๆ (เช่น `p-select`, `p-multiselect`, `p-drawer`, `p-tabs`, `p-paginator`)
2. PrimeNG มีแต่ระบบมีกฎเฉพาะ ห่อเป็น `btfp-*` (เช่น row actions ต้องเรียง ดู แก้ไข ลบ และลบต้องยืนยัน)
3. PrimeNG ไม่มี เขียนเองเป็น `btfp-*` ตั้งชื่อ input แบบ PrimeNG (`severity`, `size`, `label`)

### วันที่แบบ พ.ศ.

ใช้ `<btfp-datepicker>` แทน `p-datepicker` ทุกที่

- ผู้ใช้เห็นและพิมพ์ปีเป็น พ.ศ. (15/03/2569) หัวปฏิทินและตารางเลือกปีเป็น พ.ศ.
- ค่าใน `ngModel` / `FormControl` เป็น `Date` ปกติ (ค.ศ.) ส่ง API ได้เลยไม่ต้องแปลง
- ทดสอบกับ PrimeNG 21.1 แล้ว: เลือกวัน, พิมพ์วันที่, 29 ก.พ. 2567, เลือกปี
- ทำงานโดยแทนที่ method ภายในของ DatePicker **ถ้าอัปเกรด PrimeNG ให้เปิด Storybook หน้า "Datepicker (พ.ศ.)" ทดสอบซ้ำ**

---

## ขั้นต่อไปของ dev (ตอนต่อ API)

หน้า B-01 ตอนนี้เป็น HTML ล้วน ตอนต่อ API แนะนำลำดับนี้

1. สร้าง service และ type ของข้อเสนอ เช่น `ProposalService.list(filter)`
2. เปลี่ยน `<table class="btfp-table">` เป็น `<p-table [value]="proposals()" [lazy]="true">` ใช้ความกว้างคอลัมน์และ class เดิม
3. แถวที่พิมพ์ไว้ 6 แถว เปลี่ยนเป็น `@for` แถวเดียว
4. ตัวเลือกใน `p-select` ที่เขียนเป็นค่าคงที่ใน template ย้ายไปเป็นข้อมูลจาก API
5. ช่องหน่วยงานใน Drawer ตอนนี้เป็น `p-select` แบบค้นหาได้ ให้เปลี่ยนเป็น `p-autocomplete` ที่ค้นจาก API ตาม Figma
6. ใช้ `@if` แสดง `btfp-empty-state` แทนตารางเมื่อไม่มีข้อมูล (ดูตัวอย่างที่หน้า B-01E) แยก type ตามกรณี: ยังไม่มีข้อมูล (`general`), ค้นหาไม่พบ (`no-results`), โหลดไม่สำเร็จ (`error`)

---

## นำ repo เข้า GitLab ของทีม

ทำครั้งเดียว ไม่ต้องติดตั้งอะไรเพิ่ม

1. เข้า GitLab ของทีม กด **New project** แล้วเลือก **Import project**
2. เลือก **Repository by URL**
3. Git repository URL: ใส่ URL ของ repo นี้บน GitHub ลงท้าย `.git`
4. ถ้า repo บน GitHub เป็น private ใส่ Username เป็นชื่อบัญชี GitHub และ Password เป็น **Personal access token** ของ GitHub (สร้างที่ GitHub > Settings > Developer settings > Personal access tokens สิทธิ์ `repo` อ่านอย่างเดียวพอ)
5. ตั้งชื่อโปรเจกต์และ Visibility แล้วกด **Create project**

หลัง import แล้ว ให้ทำงานต่อที่ GitLab เป็นหลัก:

```bash
git clone <URL ของโปรเจกต์บน GitLab>
```

### Storybook บน GitLab Pages

มีไฟล์ `.gitlab-ci.yml` ให้แล้ว เมื่อ push เข้า branch หลัก GitLab จะ build Storybook และเผยแพร่ผ่าน GitLab Pages ให้เอง

- ดูลิงก์ได้ที่ **Deploy > Pages** ของโปรเจกต์
- ถ้า GitLab ของบริษัทเป็น self-hosted ต้องให้ admin เปิด GitLab Pages และมี Runner ก่อน

---

## สิ่งที่ยังเป็นตัวแทน

- **โลโก้** `public/brand/logo-nbtc.svg` และ `logo-btfp.svg` เป็นไฟล์ตัวแทน ให้แทนด้วยไฟล์จริง (ชื่อเดิม)
- **แบ่งหน้า** ใน Figma ระบุ 24 รายการแต่มี 57 หน้า ในโค้ดใช้ 24 รายการ 3 หน้าให้ตรงกัน รอยืนยันกับทีมออกแบบ
- เมนูอื่นนอกจากข้อเสนอโครงการ เปิดหน้า "ยังไม่ได้ขึ้นโครง" (ลิงก์ไม่เสีย)

---

## อ้างอิง

- Figma: ไฟล์ `pGyEKPXYJ054QjRLVHu2FD` หน้า Back-end, B-01 = node `60:7997`
- PrimeNG 21: https://primeng.org
- Lucide icons: https://lucide.dev/icons
- คำแนะนำสำหรับ Claude Code อยู่ใน `CLAUDE.md`
