# ระบบบริหารจัดการทุน กทปส. : Front-end นำร่อง

โครงหน้าเว็บตัวอย่างจากงานออกแบบใน Figma ให้ทีม dev ใช้เป็นแบบ

- **Angular 21** (standalone, zoneless, signals)
- **PrimeNG 21** ธีม Aura ปรับด้วย preset จาก Figma token
- **Tailwind CSS 4** + `tailwindcss-primeui` (ปลั๊กอินทางการของ PrimeNG) สำหรับ Responsive Layout
- **Storybook 10** สำหรับดู component และหน้าตัวอย่าง
- ไอคอน **PrimeIcons 7.0.0** ชุดเดียวกับ Figma (ไอคอนที่ PrimeIcons ไม่มีอยู่ใน Icon กลาง ผ่าน `btfp-icon`)
- ฟอนต์ **Sarabun** (เนื้อหา) และ **IBM Plex Sans Thai** (หัวข้อ)

หน้าที่ทำแล้ว

| หน้า | URL |
| --- | --- |
| หน้าแรกสาธารณะ ระบบประกาศทุนและผลงานทุน กทปส. | `/` |
| B-21 ข้อเสนอโครงการ (เจ้าหน้าที่) | `/proposals` |
| B-21.2 ตัวกรองเพิ่มเติม (Drawer) | `/proposals/filters` |
| B-21.3 ยังไม่มีข้อมูล | `/proposals/empty` |
| F-10 เข้าสู่ระบบ ขั้นที่ 1: อีเมลหรือเบอร์มือถือ | `/login` |

## หน้าเป็นหุ่นจำลอง (Mockup)

- **ไม่มี API:** ไม่เชื่อมต่อหลังบ้าน ไม่ดึงข้อมูลจริง ไม่เรียก service
- **ไม่มีตัวแปรและ logic:** ไฟล์ของหน้าไม่มี binding (`[ ]` `( )` `[( )]` `@if` `@for` signal) ค่าทั้งหมดพิมพ์ตรงใน HTML
- **มีแต่หน้าตา:** markup + CSS จัดเลย์เอาต์ ปุ่ม ช่องกรอก ตาราง เมนู ครบตาม Figma
- **Responsive:** ใช้ class ของ Tailwind ทดสอบแล้วที่จอ 1920, 1024 และ 390px
  - จอเล็กกว่า 1024px เมนูซ้ายซ่อน กดปุ่มเมนูบนแถบบนเพื่อเปิด (ทำด้วย CSS ล้วน)
  - การ์ดสรุปอยู่แถวเดียว 5 ใบตาม Figma เสมอ เห็นครบตั้งแต่จอ 1280px จอแคบกว่าเลื่อนซ้ายขวา
  - ตัวกรองแถวเดียวตั้งแต่จอ 1440px จอเล็กกว่าเรียง 3 / 2 / 1 คอลัมน์ ตารางเลื่อนซ้ายขวาได้ Drawer เต็มจอบนมือถือ

เทคนิคที่ใช้แทน logic: ค่าที่เลือกไว้ใน select แสดงผ่าน `placeholder`, checkbox ใช้ `<input type="checkbox" checked>` ที่ตกแต่งให้เหมือน PrimeNG, Drawer เปิดด้วยลิงก์ไป route ลูก

---

## เริ่มใช้งาน

ต้องมี Node.js 22 LTS (ระบุไว้ในไฟล์ `.nvmrc` ถ้าใช้ nvm รัน `nvm use` ในโฟลเดอร์โปรเจกต์ได้เลย ส่วน nvm-windows ไม่อ่าน `.nvmrc` ให้รัน `nvm use 22`) ใช้ 20.19 หรือ 24 ก็ได้ แต่ทีมใช้ 22 เป็นหลัก

```bash
npm ci                    # ติดตั้งแพ็กเกจตาม package-lock.json ทุกเครื่องได้เวอร์ชันเดียวกัน
npm start                 # เปิดแอปที่ http://localhost:4200
npm run storybook         # เปิด Storybook ที่ http://localhost:6006
npm run build             # build แอปไว้ที่ dist/
npm run build-storybook   # build Storybook ไว้ที่ storybook-static/
npm run check:tokens      # ตรวจว่าชื่อ token ชนกับตัวแปรของ PrimeNG ไหม (รันเมื่อเพิ่ม token หรืออัปเกรด PrimeNG)
```

**ใช้ `npm ci` ไม่ใช้ `npm install`** ตอน clone ครั้งแรก หลัง `git pull` และหลังสลับ branch
`npm ci` ลบ `node_modules` แล้วติดตั้งใหม่ตรงตาม `package-lock.json` ไม่แก้ lock file เอง ส่วน `npm install <ชื่อแพ็กเกจ>` ใช้เฉพาะตอนตั้งใจเพิ่มหรืออัปเดตแพ็กเกจ แล้ว commit `package-lock.json` ด้วย
ถ้า `npm ci` ขึ้น `EPERM` ให้ปิด `npm start`, `npm run storybook` และ terminal ใน VS Code ก่อน (Windows ล็อกไฟล์ที่เปิดใช้อยู่)

**เครื่อง Windows ที่บริษัทบล็อก PowerShell script:** ให้เปิด **Command Prompt (cmd)** แล้วรันคำสั่งเดิม ไม่ต้องใช้ PowerShell

ไฟล์ `.npmrc` ตั้ง `legacy-peer-deps=true` ไว้แล้ว เพราะ npm 10 มีบั๊กตอนติดตั้ง peer dependency ของ jsdom

---

## โครงสร้างโฟลเดอร์

```
src/
  tailwind.css                 Tailwind + ลำดับ CSS layer
  styles/_tokens.scss          token จาก Figma (สี ระยะ มุมโค้ง ขนาด) เป็น CSS variable --p-*
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
      public/landing/                 หน้าแรกสาธารณะ
      proposals/proposal-list/        B-21
      proposals/proposal-filter-drawer/  B-21.2
      proposals/proposal-list-empty/  B-21.3
      placeholder/                    หน้าชั่วคราวของเมนูที่ยังไม่ทำ
  docs/introduction.mdx        หน้าแรกของ Storybook
  docs/foundations/            Storybook หมวด Foundations (สี ตัวอักษร ระยะ ไอคอน)
  docs/primeng/                Storybook หมวด PrimeNG (ธีม กทปส.) แยกไฟล์ละ component
```

---

## Component กลาง (btfp-*)

| Component | ใช้แทน / สร้างบน | Figma |
| --- | --- | --- |
| `btfp-icon` | Icon กลาง (ตัวที่ PrimeIcons ไม่มี) และ PrimeIcons ขนาด px ตาม Figma (`name="pi-trash"`) | icon/*, pi-* |
| `btfp-status-tag` | เขียนเอง (สีเกินที่ `p-tag` มี) ใส่ `status="review"` ได้ครบ 14 สถานะ | Domain/Status Badge |
| `btfp-row-actions` | `p-button` + `p-confirmdialog` | Domain/Table Row Actions |
| `btfp-kpi-card` | เขียนเอง (PrimeNG ไม่มี) | Domain/KPI Stat Card |
| `btfp-empty-state` | เขียนเอง (PrimeNG ไม่มี) | Empty State |
| `btfp-export-button` | `p-button` + `p-menu` | Actions/Export Menu Button |
| `btfp-hero-banner` | เขียนเอง (`p-carousel` ต้องใช้ binding) | Domain/Hero Banner |

**directive ที่เติมให้ PrimeNG** (ใช้ tag ของ PrimeNG ตรง ๆ แล้วใส่ attribute เพิ่ม)

| Directive | ใช้กับ | เพิ่มอะไร | Figma |
| --- | --- | --- | --- |
| `btfpDatepicker` | `<p-datepicker>` | แสดงปี พ.ศ. รูปแบบ 1 ม.ค. 2569 ไอคอนในช่อง ปุ่มวันนี้/ล้าง | Forms/DatePicker |
| `btfpDrawer` | `<p-drawer>` | กว้าง 480px ไม่ปิดเอง เปิดค้างด้วย attribute `open` (หน้าหุ่นจำลอง) | Drawer |

**หลักการเลือก**

1. PrimeNG มีและหน้าตาปรับผ่าน preset ได้ ใช้ PrimeNG ตรง ๆ (เช่น `p-select`, `p-multiselect`, `p-drawer`, `p-tabs`, `p-paginator`)
2. PrimeNG มีแต่เราเพิ่มความสามารถ ใช้ tag ของ PrimeNG ตรง ๆ แล้วเติมด้วย directive `btfp*` (เช่น `<p-datepicker btfpDatepicker>`) ห้ามสร้าง component ครอบที่ชื่อซ้ำกับ PrimeNG ถ้าประกอบจากหลายชิ้นและมีกฎเฉพาะ สร้างเป็น `btfp-*` (เช่น row actions ต้องเรียง ดู แก้ไข ลบ และลบต้องยืนยัน)
3. PrimeNG ไม่มี เขียนเองเป็น `btfp-*` ตั้งชื่อ input แบบ PrimeNG (`severity`, `size`, `label`)

### วันที่แบบ พ.ศ.

ใช้ `<p-datepicker btfpDatepicker appendTo="body">` ทุกที่ (import `DatePicker` จาก `primeng/datepicker` และ `BtfpDatepicker` จาก `shared/ui`)

- ผู้ใช้เห็นวันที่แบบราชการ (1 ม.ค. 2569) พิมพ์เองได้ทั้ง 1 ม.ค. 2569 และ 1/1/2569 หัวปฏิทินและตารางเลือกปีเป็น พ.ศ.
- ค่าใน `ngModel` / `FormControl` เป็น `Date` ปกติ (ค.ศ.) ส่ง API ได้เลยไม่ต้องแปลง
- ทดสอบกับ PrimeNG 21.1 แล้ว: เลือกวัน, พิมพ์วันที่, 29 ก.พ. 2567, เลือกปี
- ทำงานโดยแทนที่ method ภายในของ DatePicker **ถ้าอัปเกรด PrimeNG ให้เปิด Storybook หน้า "PrimeNG (ธีม กทปส.)/Forms/DatePicker" ทดสอบซ้ำ**

---

## ขั้นต่อไปของ dev (ตอนต่อ API)

หน้า B-21 ตอนนี้เป็นหุ่นจำลอง ตอนต่อ API แนะนำลำดับนี้

1. สร้าง service และ type ของข้อเสนอ เช่น `ProposalService.list(filter)`
2. เปลี่ยน `<table class="btfp-table">` เป็น `<p-table [value]="proposals()" [lazy]="true">` ใช้ความกว้างคอลัมน์และ class เดิม แถวที่พิมพ์ไว้ 6 แถวเปลี่ยนเป็นแถวเดียว
3. `<input type="checkbox" class="btfp-checkbox">` เปลี่ยนเป็น `<p-checkbox [binary]="true" [(ngModel)]>` หรือ selection ของ p-table
4. `p-select` ที่ใช้ `placeholder` แทนค่า ให้ใส่ `[options]` และ `[(ngModel)]` / `formControlName`
5. Drawer ตัวกรอง (`/proposals/filters`) ย้ายมาไว้ในหน้า B-21 ใช้ `<p-drawer [(visible)]="filterOpen">` แล้วลบ route ลูก
6. ช่องหน่วยงานใน Drawer เปลี่ยนเป็น `p-autocomplete` ที่ค้นจาก API ตาม Figma
7. ใช้ `@if` แสดง `btfp-empty-state` แทนตารางเมื่อไม่มีข้อมูล (ดูตัวอย่างที่ `/proposals/empty`) แยก type: ยังไม่มีข้อมูล (`general`), ค้นหาไม่พบ (`no-results`), โหลดไม่สำเร็จ (`error`)

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

- **รูปภาพในหน้าแรก** เป็นภาพประกอบจาก Figma ความละเอียด 1 เท่า ถ้าจะใช้จริงควรได้ไฟล์ต้นฉบับ ภาพ Hero สไลด์แรกลบโลโก้และหัวข้อออกจากภาพใน Figma แล้ว (รูปห้ามมีตัวหนังสือตามกฎ CT-01) ควรได้ภาพต้นฉบับที่ไม่มีตัวหนังสือมาแทน
- **โลโก้** ดึงจาก Figma เป็น PNG ถ้าได้ไฟล์ SVG ต้นฉบับให้แทนที่ใน `public/brand/`
- เมนูอื่นนอกจากข้อเสนอโครงการ เปิดหน้า "ยังไม่ได้ขึ้นโครง" (ลิงก์ไม่เสีย)

---

## อ้างอิง

- Figma: ไฟล์ `pGyEKPXYJ054QjRLVHu2FD` หน้า Back-end, B-21 = node `60:7997`
- PrimeNG 21: https://primeng.org
- PrimeIcons 7.0.0: https://primeng.org/icons (ห้ามอัปเกรดเป็น 8 ขึ้นไป เป็นสัญญาอนุญาตเชิงพาณิชย์)
- แนวทางการออกแบบ (สี ตัวอักษร component สถานะ รูปแบบหน้า) อยู่ใน `DESIGN.md`
- คำแนะนำสำหรับ Claude Code อยู่ใน `CLAUDE.md`
