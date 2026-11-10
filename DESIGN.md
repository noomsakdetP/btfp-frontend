# DESIGN.md

แนวทางการออกแบบของระบบบริหารจัดการทุน กทปส. สำหรับทีม dev และ Claude Code
แหล่งความจริงคือ Figma ไฟล์ `pGyEKPXYJ054QjRLVHu2FD` หน้า Design System (`0:1`) ไฟล์นี้สรุปจาก Figma ณ 3 พ.ย. 2569

- กฎการเขียนโค้ดและขั้นตอนขึ้นหน้า อยู่ใน `CLAUDE.md`
- วิธีรันและส่งต่องาน อยู่ใน `README.md`
- ไฟล์นี้ตอบว่า "หน้าตาและพฤติกรรมต้องเป็นอย่างไร"

---

## 1. หลักการ

1. **ราชการ อ่านง่าย น่าเชื่อถือ** สีน้ำเงินกรมท่าเป็นหลัก พื้นสว่าง ไม่มีโหมดมืด
2. **ข้อมูลมาก่อนการตกแต่ง** ตารางแน่น อ่านเร็ว ใช้สีเฉพาะที่สื่อความหมาย (สถานะ การกระทำ)
3. **ใช้ PrimeNG ก่อน** ปรับหน้าตาผ่าน token ไม่สร้าง component ใหม่ถ้า PrimeNG มีอยู่แล้ว
4. **ทุกอย่างกดได้ต้องไปที่ใดที่หนึ่ง** ไม่มีปุ่มหรือลิงก์ตาย

---

## 2. Foundations

### 2.1 สี

ทุกสีในโค้ดต้องมาจาก token (`src/styles/_tokens.scss` เป็น CSS variable `--p-*` และ `src/app/theme/btfp-preset.ts` สำหรับ PrimeNG) ห้ามใส่รหัสสีตรง

token ใช้ prefix `--p-*` เหมือนตัวแปรของ PrimeNG ชุดสีพื้นฐานของเราจึงทับชุดสีของ PrimeNG ด้วย (ตั้งใจ) component ของ PrimeNG จะใช้สีของเราทั้งหมด เพิ่ม token ใหม่แล้วรัน `npm run check:tokens` เพื่อตรวจว่าไม่ได้ไปทับตัวแปรอื่นของ PrimeNG โดยไม่ตั้งใจ

ดูค่าทั้งหมดใน Storybook หมวด **Foundations** (สี ตัวอักษร ระยะ มุมโค้ง เงา ไอคอน) ค่าใน `_tokens.scss` ตรงกับ Figma Variables ครบทุกตัว (primitives 102 ตัว semantic 63 ตัว component 26 ตัว)

**Primitive** (Figma collection `primitives`): blue, navy, teal, cool-gray, red, orange, green, yellow ระดับ 50 ถึง 900 ในโค้ดชื่อ `--p-<สี>-<ระดับ>` (cool-gray ใช้ชื่อ `gray`)

**Semantic** ที่ใช้บ่อย

| การใช้งาน | Token ใน Figma | ค่า | CSS variable |
| --- | --- | --- | --- |
| พื้นหลังหน้า | color/bg/subtle | cool-gray/50 #f8fafc | `--p-bg-subtle` |
| พื้นการ์ด | color/surface/raised | white | `--p-surface-raised` |
| ข้อความหลัก | color/text/primary | cool-gray/800 #1e293b | `--p-text-primary` |
| ข้อความรอง | color/text/secondary | cool-gray/600 #475569 | `--p-text-secondary` |
| หัวข้อ | color/text/heading | navy/900 #092a48 | `--p-text-heading` |
| ปุ่มหลัก | color/action/primary | blue/600 #0077b6 | `--p-action-primary` |
| ลิงก์ | color/action/link | blue/700 #005e91 | `--p-action-link` |
| เส้นขอบ | color/border/default | cool-gray/200 #e2e8f0 | `--p-border-default` |
| เมนูซ้าย | nav/sidebar/bg | navy/900 #092a48 | `--p-sidebar-bg` |
| หัวตาราง | table/header/bg | cool-gray/100 #f1f5f9 | `--p-table-header-bg` |

**Feedback** (พื้น / ตัวอักษร / เส้นขอบ): success = green 50/700/200, warning = yellow 50/800/200, danger = red 50/700/200, info = blue 50/700/200

### 2.2 ตัวอักษร

| Style ใน Figma | ฟอนต์ | ขนาด / ระยะบรรทัด | ใช้กับ |
| --- | --- | --- | --- |
| Display/XL | IBM Plex Sans Thai Bold | 60 / 120% | Hero หน้าแรก |
| Display | IBM Plex Sans Thai Bold | 40 / 135% | หัวข้อใหญ่หน้า public |
| H1 | IBM Plex Sans Thai Bold | 32 / 135% | หัวหน้า public |
| H2 | IBM Plex Sans Thai SemiBold | 24 / 135% | หัวหน้าระบบหลังบ้าน |
| H3 | IBM Plex Sans Thai SemiBold | 20 / 135% | หัว Drawer, Modal, การ์ด |
| H4 | IBM Plex Sans Thai SemiBold | 18 / 135% | หัวข้อย่อย |
| Body/L | Sarabun Regular | 18 / 160% | เนื้อหายาว หน้า public |
| Body | Sarabun Regular | 16 / 160% | เนื้อหาทั่วไป เมนู |
| Body/Medium | Sarabun Medium | 16 / 160% | ป้ายกำกับที่ต้องเน้น |
| Body/S | Sarabun Regular | 14 / 160% | ฟอร์ม คำอธิบาย |
| Body/S Medium | Sarabun Medium | 14 / 160% | ป้ายชื่อช่องกรอก |
| Table | Sarabun Regular | 14 / 150% | ข้อมูลในตาราง |
| Caption | Sarabun Regular | 12 / 150% | ข้อความช่วย หมายเหตุ |

ใช้ในโค้ดเป็น class `.btfp-text-<ชื่อ>` เช่น `.btfp-text-h2` `.btfp-text-body-s-medium` `.btfp-text-caption` (อยู่ใน `src/styles.scss`)

Text Style ใน Figma ผูกกับ Variable (ชนิดตัวอักษร ขนาด น้ำหนัก) ชุดเดียวกับ token ในโค้ด

- primitives: `font/family/*` `font/size/12` ถึง `60` `font/weight/regular|medium|semibold|bold` = `--p-font-family-*` `--p-font-size-*` `--p-font-weight-*`
- semantic: `font/family/heading|body` = `--p-font-heading` `--p-font-body`, `typography/<ชื่อ>/size|weight` = `--p-typography-<ชื่อ>-size|weight`
- ระยะบรรทัดไม่มี Variable ใน Figma (Variable รับได้แค่ px แต่ระบบใช้ %) โค้ดใช้ `--p-line-height-heading` 1.35 `-body` 1.6 `-compact` 1.5 `-display-xl` 1.2
- CSS ของ component ใช้ token ชั้น semantic ห้ามใส่ px ตรง ๆ ยกเว้นขนาดที่ Figma ใส่ค่าตรงไว้ (Hero 30/56px, ป้ายรองใน Drawer 13px)

ฟอนต์โหลดจาก `@fontsource` ในโปรเจกต์ ไม่เรียกจาก Google Fonts (ใช้ได้ในเครือข่ายปิด) IBM Plex Sans Thai โหลดน้ำหนัก 500 600 700 Sarabun โหลด 400 500 600

### 2.3 ระยะห่าง มุมโค้ง ขนาด เงา

| กลุ่ม | ค่า |
| --- | --- |
| Spacing | 4, 8, 12, 16, 24, 32, 48, 64 px (xs 4, sm 8, md 16, lg 24, xl 32, 2xl 48, 3xl 64) |
| Radius | input/tag 4, button/inner 8, card/modal 12, card-lg 16, full 9999 px |
| ความสูงช่องกรอกและปุ่ม | S 32, M 40, L 48 px (ค่าเริ่มต้น M) |
| แถวตาราง | 56 px (หัวตาราง 44 px) |
| Sidebar / TopBar | กว้าง 264 px / สูง 64 px |
| Elevation/01 | 0 1px 3px rgba(9,42,72,0.08) การ์ด |
| Elevation/02 | 0 4px 12px -2px rgba(9,42,72,0.10) dropdown, popover |
| Elevation/03 | 0 12px 28px -6px rgba(9,42,72,0.14) modal, drawer |

### 2.4 Grid และ Responsive

| จอ | Breakpoint (Tailwind) | Grid ใน Figma |
| --- | --- | --- |
| มือถือ | ต่ำกว่า sm 640 | 4 คอลัมน์ gutter 16 ขอบ 16 |
| แท็บเล็ต | md 768, lg 1024 | 8 คอลัมน์ gutter 24 |
| โน้ตบุ๊ก | xl 1280, wide 1440 | 12 คอลัมน์ gutter 24 |
| เดสก์ท็อป | 2xl 1536 ขึ้นไป (Figma ออกแบบที่ 1920) | 12 คอลัมน์ gutter 24 |

กฎ Responsive
- จอเดสก์ท็อปต้องหน้าตาตรงกับ Figma กลุ่มที่ Figma วางแถวเดียว (เช่น การ์ด KPI) ให้คงแถวเดียวแล้วเลื่อนซ้ายขวาเมื่อจอแคบ ห้ามตัดแถว
- ต่ำกว่า 1024 px เมนูซ้ายซ่อน เปิดด้วยปุ่มเมนูบน TopBar
- ตารางกว้างคงที่ตาม Figma เลื่อนซ้ายขวาบนจอแคบ ไม่ยุบเป็นการ์ด
- Drawer กว้าง 480 px บนจอ 640 ขึ้นไป เต็มจอบนมือถือ
- ชั้นทับหลัง Drawer, Dialog และป๊อปอัปยืนยัน ใช้ `--p-overlay-mask` (พื้นเข้มของระบบ `--p-bg-inverse` โปร่ง 55% ตรงกับ scrim ใน Figma ที่ผูก color/bg/inverse) ตั้งไว้ใน preset แล้ว

### 2.5 ไอคอน

มีสองชุด สีตามข้อความรอบข้างทั้งคู่ ขนาด 16, 20, 24 px

ลูกศรลงและลูกศรขึ้น `pi-chevron-down` `pi-chevron-up` ใช้ขนาด 16 ทุกที่ (ช่องเลือก ปุ่มเมนู หัว accordion) ไอคอนในช่องกรอกทุกแบบ (ค้นหา ปฏิทิน ลูกศร วงหมุนตอนโหลด) ก็ใช้ 16 ยกเว้นปุ่มลบในชิป 14 ไอคอน svg ของ PrimeNG ตั้งเป็น 16 ไว้ใน `styles.scss` แล้ว

| ชุด | ใน Figma | ในโค้ด | ใช้เมื่อ |
| --- | --- | --- | --- |
| **PrimeIcons 7.0.0** (313 ตัว สัญญาอนุญาต MIT) | `pi-<ชื่อ>` เลือก size 16/20/24 | `<i class="pi pi-<ชื่อ>"></i>` ขนาดใช้ Tailwind `text-base` (16) `text-xl` (20) `text-2xl` (24) | ใช้ก่อนเสมอ ค้นชื่อที่ https://primeng.org/icons |
| **Icon กลาง** (26 ตัว วาดให้เข้ากับ PrimeIcons เส้นหนา 1.5) | `icon/<หมวด>/<ชื่อ>` | `<btfp-icon name="<ชื่อ>" size="16" />` | เฉพาะตัวที่ PrimeIcons ไม่มี เช่น bold, italic, radio-tower, milestone |

ห้ามอัปเกรด `primeicons` เป็นเวอร์ชัน 8 ขึ้นไป (เป็นสัญญาอนุญาตเชิงพาณิชย์) ใน `package.json` ล็อกไว้ที่ `7.0.0`

ขนาดอื่นตาม Figma (14, 18, 22) หรือชื่อไอคอนที่ส่งผ่าน input ของ component ใช้ `<btfp-icon name="pi-<ชื่อ>" size="18" />` ไอคอนทุกตัวในโค้ดตรงกับ Figma แล้ว ไม่มีชุดไอคอนอื่น

---

## 3. Components: Figma กับโค้ด

สถานะ: **ทำแล้ว** = มีในโปรเจกต์ ใช้ได้เลย / **PrimeNG** = ใช้ของ PrimeNG ตรง ๆ ปรับผ่าน preset / **ต้องทำ** = ยังไม่มีในโค้ด

ของแต่ละแบบอยู่ที่ไหน
- **PrimeNG มี ปรับแค่ธีม:** ปรับที่ preset หน้า Storybook อยู่ในหมวด PrimeNG (ธีม กทปส.) ไม่มี story แยก
- **PrimeNG มี แต่เราเพิ่มความสามารถ:** ใช้ tag ของ PrimeNG ตรง ๆ แล้วเติมด้วย directive เช่น `<p-datepicker btfpDatepicker>` (ปี พ.ศ.) `<p-drawer btfpDrawer>` หน้า Storybook อยู่ในหมวด PrimeNG พร้อมตัวอย่างเฉพาะส่วนที่เพิ่ม ห้ามสร้าง component ครอบที่ชื่อซ้ำกับ PrimeNG
- **PrimeNG ไม่มี:** สร้าง `btfp-*` อยู่ในหมวด Components ของ Storybook

### 3.1 พื้นฐาน

| Figma | ในโค้ด | สถานะ | หมายเหตุ |
| --- | --- | --- | --- |
| Actions/Button | `p-button` | PrimeNG | primary = ค่าเริ่มต้น, secondary = `outlined severity="secondary"` (พื้นขาว เส้น border/strong ข้อความ action/secondary), tertiary = `text`, danger = `severity="danger"` (พื้นแดงอ่อนตาม Figma ไม่ใช่แดงทึบ) Size S = `size="small"` 32px, M 40px, L = `size="large"` 48px ดู Storybook หมวด PrimeNG (ธีม กทปส.) |
| Actions/IconButton | `p-button` + `<ng-template #icon><btfp-icon /></ng-template>` | PrimeNG | ไอคอนต้องอยู่ใน `#icon` จึงได้ 32/40/48 ตาม Figma ต้องใส่ `ariaLabel` และ `pTooltip` เสมอ ghost = `text` |
| Actions/Export Menu Button | `btfp-export-button` | ทำแล้ว | ใช้ตัวเดียวทั้งระบบ ตัวเลือก Excel, PDF, CSV |
| Forms/TextInput | `input pInputText` | PrimeNG | สูง 40 ขอบซ้ายขวา 16 ตัวอักษร 16 ครอบด้วย `.btfp-field` + `.btfp-required` `.btfp-field__helper` `.btfp-field__error` |
| Forms/Textarea | `textarea pTextarea` | PrimeNG | |
| Forms/Select | `p-select` | PrimeNG | |
| Forms/MultiSelect | `p-multiselect` | PrimeNG | `display="chip"` |
| Forms/Autocomplete | `p-autocomplete` | PrimeNG | |
| Forms/DatePicker | `p-datepicker` + `btfpDatepicker` | ทำแล้ว | แสดงแบบ 1 ม.ค. 2569 (พ.ศ.) เก็บ ค.ศ. Mode month = `view="month"` (ม.ค. 2569) month-range = `view="month" selectionMode="range"` error = `invalid` แผงปฏิทินกว้าง 280px ตาม Figma DatePicker Panel |
| Forms/CurrencyInput | `p-inputgroup` + `p-inputnumber inputStyleClass="btfp-input-money"` + "THB" | PrimeNG | ทศนิยม 2 ตำแหน่ง ตัวเลขชิดขวา หน้าหุ่นจำลองใช้ `<input pInputText class="btfp-input-money">` |
| Forms/OtpInput | `p-inputotp` | PrimeNG | |
| Forms/SearchField | `p-iconfield` + `p-inputicon` + `pInputText` | PrimeNG | |
| Forms/Checkbox | `p-checkbox` (หน้าหุ่นจำลองใช้ `.btfp-checkbox`) | PrimeNG | 24px |
| Forms/Radio | `p-radiobutton` | PrimeNG | 24px |
| Forms/Toggle | `p-toggleswitch` | PrimeNG | 44x24 ตอนปิดพื้นขาวปุ่มเทา |
| Forms/Segmented Control | `p-selectbutton` | PrimeNG | ปรับแล้ว (preset + `styles.scss`) |
| DataDisplay/Tag | `p-tag` / `p-chip` | PrimeNG | Tone neutral = `severity="secondary"` มุม 4 สูง 32 มีเส้นขอบ ตัวกรองที่ใช้อยู่ใช้ `p-chip removable` + `<ng-template #removeicon><btfp-icon name="x" size="14" /></ng-template>` |
| DataDisplay/Avatar | `p-avatar` | PrimeNG | S 32 = ค่าเริ่มต้น, M 40 = `size="large"`, L 48 = `size="xlarge"` |
| Feedback/Tooltip | `pTooltip` | PrimeNG | พื้น navy/900 ตัวอักษร 12 |
| Navigation/Breadcrumb | HTML ในหน้า | ทำแล้ว | `p-breadcrumb` ต้องใช้ข้อมูลแบบ binding จึงไม่ใช้ในหน้าหุ่นจำลอง |
| Navigation/Tabs | `p-tabs` | PrimeNG | ตัวอักษร 16 แท็บที่เลือก Medium blue/600 เส้นใต้ 3px |
| Navigation/Pagination | `p-paginator` | PrimeNG | ปุ่ม 32 มุม 8 |
| Navigation/Sidebar, NavItem, NavSubItem | `btfp-sidebar` | ทำแล้ว (เจ้าหน้าที่) | ผู้บริหารและผู้ดูแลระบบยังไม่ทำ, NavSubItem ยังไม่ทำ |
| Navigation/TopBar | `btfp-topbar`, `btfp-public-topbar` | ทำแล้ว (back-office, front-office-guest) | front-office หลังเข้าสู่ระบบและแบบมือถือยังไม่ทำ |
| Brand/Logo | `public/brand/logo-nbtc.png`, `logo-btfp.png` | ทำแล้ว | ดึงจาก Figma (PNG 4 เท่า) ถ้าได้ SVG ต้นฉบับให้แทนที่ |

### 3.2 Domain (เฉพาะระบบนี้)

| Figma | ในโค้ด | สถานะ | หมายเหตุ |
| --- | --- | --- | --- |
| Domain/Status Badge | `btfp-status-tag` | ทำแล้ว | ครบ 14 สถานะ ใส่ `status="review"` ได้สี ไอคอน ข้อความตาม Figma ดูข้อ 4 |
| Domain/KPI Stat Card | `btfp-kpi-card` | ทำแล้ว | Tone และ Trend ยังไม่ทำ |
| Domain/Table Header Cell, Table Cell, Data Table | `.btfp-table` ใน `styles.scss` + `__money` (จำนวนเงิน ชิดขวา) `__check` `__actions` `__2line` (ต่อ API ใช้ `p-table` หรือ `@for`) | ทำแล้ว | แถว 56 px บรรทัดเดียว Storybook: Components/Data Display/Table ยังไม่มี Sort, skeleton |
| Feedback/Progress Bar, Feedback/Loading Spinner | `p-progressbar` `p-progressspinner` (สีใน preset) + `btfp-route-progress` ใน `app.ts` | ทำแล้ว | โหลดหน้าและ API ใช้ ngx-ui-loader ตามค่าที่ BA เลือก (`BTFP_LOADER_CONFIG`): สีจาก token `--p-loading-*` (ผูก `--p-action-primary` `--p-bg-inverse` `--p-text-inverse`) เปลี่ยนเมนูแถบบน 3px + ชั้นทับพื้นเข้มเบลอ + แท่งเด้งกลางจอ แสดงอย่างน้อย 300 ms เรียก API ไม่ใช้ตัวโหลดกลาง แสดงที่ component (`<p-button loading>`, แถว `p-skeleton`) |
| Domain/Table Row Actions | `btfp-row-actions` | ทำแล้ว | ดู แก้ไข ลบ ลบต้องยืนยัน |
| Domain/Empty State | `btfp-empty-state` | ทำแล้ว | 4 แบบ: general, no-results, no-files, error |
| Domain/Modal | `p-dialog` | ต้องทำ | Size S/M/L ห้ามใช้กับฟอร์มเนื้อหา |
| Domain/Toast | `p-toast` | ต้องทำ | |
| Domain/Alert Banner | `p-message` | ต้องทำ | |
| Domain/Save Draft Action Bar | `btfp-save-draft-bar` | ต้องทำ | แถบล่างของหน้าฟอร์มทุกหน้า |
| Domain/Workflow Stepper, Stepper Step | `p-stepper` หรือ `btfp-workflow-stepper` | ต้องทำ | มีสถานะ returned / blocked ที่ PrimeNG ไม่มี |
| Domain/Form Section Tab | `btfp-form-section-tab` | ต้องทำ | สถานะ done / partial / todo / error |
| Domain/File Uploader, File Item | `p-fileupload` + `btfp-file-item` | ต้องทำ | |
| Domain/Budget Line-item Editor, Table Input Cell | `btfp-budget-editor` | ต้องทำ | ตารางกรอกงบประมาณ |
| Domain/Rich Text Field | `p-editor` | ต้องทำ | |
| Domain/Status History Timeline | `p-timeline` | ต้องทำ | |
| Domain/Notification Item | `btfp-notification-item` | ต้องทำ | |
| Domain/Address Fields | `btfp-address-fields` | ต้องทำ | จังหวัด อำเภอ ตำบล รหัสไปรษณีย์ |
| Domain/Grant Call Card | `btfp-grant-call-card` | ทำแล้ว | state: open / closing-soon / closed |
| Domain/Hero Banner | `btfp-hero-banner` + `btfp-hero-slide` | ทำแล้ว | เลื่อนเองทุก 4 วินาที ลูกศร จุด ปัด รูปเดียวทั้งคอมพิวเตอร์และมือถือ (1920x720 มือถือครอปช่วงกลาง) รูปห้ามมีตัวหนังสือ ข้อความเป็น HTML ใส่ `overlay` + `tag` (กฎ CT-01) |
| Domain/Proposal Card, Grant Cover | `btfp-*` | ต้องทำ | ฝั่งผู้ขอรับทุน |
| Public/Section Header | `btfp-section-header` | ทำแล้ว | theme light / dark |
| Public/Process Step | `btfp-process-step` | ทำแล้ว | |
| Public/Project Showcase Card | `btfp-showcase-card` | ทำแล้ว | |
| Public/Project Result Card | `btfp-result-card` | ทำแล้ว | |
| Public/News Card | `btfp-news-card` | ทำแล้ว | |
| Public/Accordion Item | `<details>` ในหน้า | ทำแล้ว | หน้าหุ่นจำลองใช้ HTML ล้วน ต่อ API แล้วใช้ `p-accordion` ได้ |
| Public/CTA Banner, Footer, Cookie Consent | ในหน้าแรก, `btfp-public-footer`, `btfp-public-layout` | ทำแล้ว | |
| Public/Objective Card, Announcement Bar, Utility Bar | | ต้องทำ | |
| Drawer (ใน Figma วาดในหน้า B-21.2) | `p-drawer` + `btfpDrawer` | ทำแล้ว | ตั้งค่าตามระบบ เปิดค้างด้วย attribute `open` ได้ |

---

## 4. สถานะ (Status Badge)

ป้ายสถานะมี 14 สถานะ ใช้ `<btfp-status-tag status="..." />` อย่างเดียว ได้สี ไอคอน และข้อความตาม Figma ไม่ต้องเลือกสีเอง ค่าทั้งหมดอยู่ที่ `BTFP_STATUS` ใน `status-tag.ts`

ขนาดตาม Figma: สูง 32 มุมมน ขอบซ้ายขวา 8 ไอคอน 16 Sarabun Medium 14 สีพื้น /50 เส้นขอบ /200 ตัวอักษร /700 (yellow ใช้ /800)

| สถานะ (Figma variant) | `status=` | ข้อความ | สี | ไอคอน |
| --- | --- | --- | --- | --- |
| Draft | `draft` | ฉบับร่าง | cool-gray | pencil |
| Send | `send` | ส่งแล้ว รอการตรวจสอบ | blue (info) | send |
| Review | `review` | รอการพิจารณา | navy | hourglass |
| Suspend | `suspend` | ไม่ผ่าน รอแก้ไข | yellow (warn) | rotate-ccw |
| Docs Incomplete | `docs-incomplete` | เอกสารไม่ครบ รอแก้ไข | yellow (warn) | circle-alert |
| Not Qualified | `not-qualified` | ไม่ผ่านคุณสมบัติ | red (danger) | ban |
| Reject | `reject` | ไม่อนุมัติ | red (danger) | circle-x |
| Passed Check | `passed-check` | ผ่านการตรวจสอบ | teal | circle-check |
| Board | `board` | ผ่านความเห็นชอบ เสนอบอร์ด กสทช. | teal | landmark |
| Submitted | `submitted` | อนุมัติ | green (success) | circle-check |
| In Progress | `in-progress` | ดำเนินโครงการ | teal | list-checks |
| Awaiting Disbursement | `awaiting-disbursement` | รอเบิกจ่าย | navy | wallet |
| Delayed | `delayed` | ล่าช้า | orange | calendar-clock |
| Closed | `closed` | ปิดโครงการ | cool-gray | clipboard-check |

---

## 5. รูปแบบที่ใช้ซ้ำ (Patterns)

### หน้ารายการ (เช่น B-21)
ลำดับจากบนลงล่าง: Breadcrumb, หัวหน้า + ปุ่ม (รายงาน, ส่งออก), แท็บกลุ่มข้อมูล, การ์ด KPI (กดเพื่อกรอง), การ์ดตาราง (ตัวกรอง, ตัวกรองที่ใช้อยู่, แถบจัดการรายการที่เลือก, ตาราง, แบ่งหน้า)

### ตาราง
- แถวสูง 56 px ข้อความบรรทัดเดียว ยาวเกินตัดด้วย "..." และใส่ `title` ให้อ่านเต็ม
- ชิดขวาเฉพาะจำนวนเงิน (ทศนิยม 2 ตำแหน่ง มีจุลภาคหลักพัน) ตัวเลขอื่น เช่น จำนวนราย ร้อยละ คะแนน จำนวนวัน ชิดซ้ายเหมือนข้อความ
- ช่องกรอกจำนวนเงินก็ชิดขวาเหมือนกัน (`.btfp-input-money`) ช่องกรอกตัวเลขอื่นชิดซ้าย
- คอลัมน์สุดท้ายเป็นปุ่มจัดการ เรียง ดู แก้ไข ลบ
- เลือกหลายแถวแล้วแถบจัดการรายการที่เลือกจะแสดงจำนวนและปุ่มทำทีละหลายรายการ
- ไม่มีข้อมูลแสดง Empty State ตามกรณี (ยังไม่มีข้อมูล / ค้นหาไม่พบ / โหลดไม่สำเร็จ) แทนตาราง

### ตัวกรอง
- ตัวกรองหลัก 4 ถึง 5 ช่องอยู่บนตาราง ตัวกรองที่ใช้น้อยอยู่ใน Drawer "ตัวกรองเพิ่มเติม (จำนวน)"
- ตัวกรองที่ใช้อยู่แสดงเป็น chip ลบทีละอันได้ และมี "ล้างทั้งหมด"

### ฟอร์มเนื้อหา
- ใช้หน้าเต็ม ไม่ใช้ Modal
- มีแถบบันทึกฉบับร่างด้านล่าง (Save Draft Action Bar)
- ฟอร์มยาวแบ่งเป็นแท็บส่วน (Form Section Tab) บอกสถานะกรอกครบหรือไม่

### การลบ
ต้องมีป๊อปอัปยืนยันทุกครั้ง หัวข้อ "ยืนยันการลบ" บอกชื่อรายการและว่ากู้คืนไม่ได้ ปุ่ม "ลบ" สีแดง "ยกเลิก" แบบ outlined

### การส่งออก
ใช้ `btfp-export-button` เท่านั้น ตัวเลือก Excel (.xlsx), PDF (.pdf), CSV (.csv) ส่งออกจากแถวที่เลือกใช้ปุ่ม "ส่งออกที่เลือก" ในแถบจัดการ

### วันที่และตัวเลข
- วันที่แสดงแบบราชการ เช่น 1 ม.ค. 2569 (วันไม่มี 0 นำหน้า เดือนย่อ ปี พ.ศ.) ช่วงวันที่เขียนเต็มทั้งสองฝั่ง เช่น 1 ก.ย. 2569 - 30 ก.ย. 2569 เก็บและส่ง API เป็น ค.ศ.
- ปีงบประมาณใช้ พ.ศ. 4 หลัก
- เงินแสดงทศนิยม 2 ตำแหน่ง หน่วย บาท หรือ THB

---

## 6. ข้อความบนหน้าจอ

- ภาษาไทยทางการแต่เข้าใจง่าย
- ห้ามใช้ "—" และ "•" แยกด้วยเว้นวรรค ทวิภาค หรือขึ้นบรรทัดใหม่
- ห้ามแสดงรหัสหน้าจอ (B-21, B-14 ฯลฯ) ให้ผู้ใช้เห็น
- ปุ่มใช้คำกริยา เช่น "บันทึกฉบับร่าง" "ใช้ตัวกรอง" "มอบหมายเจ้าหน้าที่"

---

## 7. การเข้าถึง (Accessibility)

- ปุ่มที่มีแต่ไอคอนต้องมี `ariaLabel`
- ช่องกรอกทุกช่องมี `<label for>` ผูกกับ `inputId`
- กดแป้นพิมพ์ได้ทุกปุ่ม เส้นโฟกัส 2 px สี blue/600
- สีไม่ใช่สิ่งเดียวที่บอกสถานะ ป้ายสถานะมีข้อความและไอคอนเสมอ

---

## 8. เมื่อ Figma เปลี่ยน

1. แก้ใน Figma ก่อนเสมอ
2. อัปเดต `src/styles/_tokens.scss` และ `src/app/theme/btfp-preset.ts` ให้ค่าตรงกัน
3. ถ้าเป็น component ใหม่ เพิ่มแถวในข้อ 3 ของไฟล์นี้
4. เปิด Storybook เช็กว่า component ที่ใช้ token นั้นยังถูกต้อง
