# CLAUDE.md

คำแนะนำสำหรับ Claude Code เวลาทำงานใน repo นี้ ตอบผู้ใช้เป็นภาษาไทย

## โปรเจกต์

Front-end ของระบบบริหารจัดการทุน กทปส. (สำนักงาน กสทช.) สร้างจากงานออกแบบใน Figma
Angular 21 (standalone, zoneless) + PrimeNG 21 (styled mode, preset) + Tailwind CSS 4 (`tailwindcss-primeui`) + Storybook 10 (`@storybook/angular-vite`)

## คำสั่ง

```bash
npm ci                    # ติดตั้งแพ็กเกจตาม lock file (หลัง clone, pull, สลับ branch) ห้ามใช้ npm install ถ้าไม่ได้ตั้งใจเพิ่มแพ็กเกจ
npm start                 # dev server :4200
npm run build             # ต้องผ่านก่อนบอกว่างานเสร็จ
npm run storybook         # :6006
npm run build-storybook   # ต้องผ่านก่อนบอกว่างานเสร็จ
npm run check:tokens      # ต้องผ่านเมื่อเพิ่ม/เปลี่ยน token หรืออัปเกรด PrimeNG
```

เครื่อง Windows ของบริษัทบล็อก PowerShell script ให้รัน npm ผ่าน cmd

## เอกสารที่ต้องอ่านก่อนทำงาน

- `DESIGN.md` แนวทางการออกแบบ: token, ตัวอักษร, ตาราง Figma กับ component ในโค้ด (สถานะทำแล้ว/ต้องทำ), ข้อความสถานะ 14 แบบ, รูปแบบหน้า
  ทำ component ใหม่หรือแก้ token เสร็จแล้วให้อัปเดตตารางใน DESIGN.md ด้วย

## Figma

- ไฟล์หลัก `pGyEKPXYJ054QjRLVHu2FD`
- หน้า: Design System `0:1`, Front-end `32:1388` (ผู้ขอรับทุน), Back-end `60:7994` (เจ้าหน้าที่/ผู้บริหาร/admin), Mobile App `476:25411`
- หน้าที่ทำแล้ว
  - F-01 หน้าแรกสาธารณะ `50:6410` (/) ใช้ `btfp-public-layout`
  - B-21 `60:7997` (/proposals), B-21.2 Drawer `479:132339` (/proposals/filters), B-21.3 `480:66623` (/proposals/empty) ใช้ `btfp-staff-layout`
  - F-10 เข้าสู่ระบบ ขั้นที่ 1 `42:9007` (/login) หน้าเต็มจอ ไม่มี layout ลิงก์จากปุ่ม "เข้าสู่ระบบ" ในแถบบนของหน้าแรก
- รหัสหน้าจอ (ชื่อเฟรม): F- ฝั่งผู้ขอรับทุน, B- หลังบ้าน, M- แอปมือถือ เลขเรียงตามลำดับใน Site Tree ป๊อปอัปและหน้าสถานะใช้เลขย่อยของหน้าหลัก (เช่น B-21.2 Drawer ของ B-21) เฟรมที่เลิกใช้ขึ้นต้นด้วย [เดิม] ไม่มีรหัส
  ชื่อเฟรมรูปแบบ `รหัส เรื่อง: หน้าจอหรือสถานะ` ห้ามใช้ "—" ในชื่อ
- รูปภาพจาก Figma ดาวน์โหลดตรงไม่ได้ วิธีที่ใช้: สร้างหน้าชั่วคราวใน Figma ก๊อปเฉพาะรูปไปวาง แคปภาพ ตัดเป็นไฟล์ แล้วลบหน้าชั่วคราวทิ้ง เก็บใน `public/images/<หน้า>/`
- เวลาขึ้นหน้าใหม่ ใช้ Figma MCP อ่าน frame (get_metadata / get_design_context / get_screenshot) แล้วแปลงเป็นโค้ดตามกฎด้านล่าง โค้ดที่ Figma ให้มาเป็นแค่ตัวอ้างอิง ห้ามวางตรง ๆ

## กฎการเขียนหน้า (ตกลงกับทีมแล้ว)

1. **หน้าเป็นหุ่นจำลอง (Mockup) markup + CSS เท่านั้น** (ข้อกำหนดจากพี่ BA)
   - ไม่มี API ไม่เรียก service ไม่ดึงข้อมูลจริง
   - ไม่มีตัวแปรและ logic: ห้าม `[prop]` `(event)` `[(ngModel)]` `@if` `@for` `{{ }}` signal ในไฟล์ของหน้า (`src/app/pages/`)
     คลาส .ts ของหน้ามีแค่ `imports` ไม่มี property
   - ค่าใน component ใส่เป็น attribute ธรรมดา เช่น `outlined` `severity="secondary"` `rows="10"`
     (ใช้ได้เฉพาะ input ที่ PrimeNG ใส่ booleanAttribute/numberAttribute หรือเป็น string ถ้า build error ว่า string ไม่ตรง type ให้หาทางอื่น)
   - ค่าที่ "เลือกไว้แล้ว" ใน select ใช้ `placeholder="2569" styleClass="btfp-mock-value"`
   - checkbox ที่ติ๊กไว้ใช้ `<input type="checkbox" class="btfp-checkbox" checked>` (หัวตารางใช้ class `is-indeterminate`)
   - สถานะเปิด เช่น Drawer ทำเป็น route ลูกแล้วเปิดด้วย `routerLink` (ดู `/proposals/filters`) ใช้ `<p-drawer btfpDrawer open position="right">`
   - logic ภายใน component กลาง `btfp-*` มีได้ เพราะไม่ใช่ไฟล์ของหน้า
   - **Responsive ใช้ class ของ Tailwind** ในไฟล์ HTML (sm 640, md 768, lg 1024, xl 1280, wide 1440, 2xl 1536)
     ห้ามใช้ breakpoint แบบ `min-[1440px]:` เพราะ Tailwind เรียงลำดับผิด ถ้าต้องการขนาดใหม่ให้เพิ่มใน `@theme` ของ `src/tailwind.css`
     ไฟล์ .scss ของหน้าใส่แค่สี ตัวอักษร เส้น ห้ามใส่ display/grid/flex/padding ของ layout เพราะ CSS ของ component ชนะ class ของ Tailwind
   - ทดสอบทุกหน้าที่ความกว้าง 1920, 1440, 1024 และ 390px
   - **Responsive ต้องไม่ทำให้หน้าตาต่างจาก Figma บนจอเดสก์ท็อป** กลุ่มที่ Figma วางเป็นแถวเดียว (เช่น การ์ด KPI)
     ให้คงแถวเดียวแล้วเลื่อนซ้ายขวาเมื่อจอแคบ ห้ามตัดลงบรรทัดใหม่ ถ้าจำเป็นต้องจัดใหม่ให้ถามผู้ใช้ก่อน
2. **ใช้ PrimeNG ก่อน** ปรับหน้าตาที่ `src/app/theme/btfp-preset.ts` ไม่เขียน CSS ทับ PrimeNG ถ้าไม่จำเป็น
3. **ของแต่ละแบบอยู่ที่ไหน** (โค้ดและ Storybook)
   - **PrimeNG มี ปรับแค่ธีม:** ปรับที่ preset แล้วอัปเดตหน้าใน `src/docs/primeng/` (หนึ่งไฟล์ต่อ component มีตาราง Figma กับโค้ด) ไม่มี story แยก
   - **PrimeNG มี แต่เราเพิ่มความสามารถ:** ใช้ tag ของ PrimeNG ตรง ๆ แล้วเติมด้วย directive `btfp*` ใน `src/app/shared/ui/` (เช่น `<p-drawer btfpDrawer>`) ห้ามสร้าง component ครอบที่ชื่อซ้ำกับ PrimeNG หน้า Storybook อยู่ใน `src/docs/primeng/` พร้อมตัวอย่างเฉพาะส่วนที่เราเพิ่ม
   - **PrimeNG ไม่มี:** สร้าง `btfp-*` ใน `src/app/shared/ui/` พร้อม `.stories.ts` (ใส่ `tags: ['autodocs']` และ title `Components/<หมวดตาม Figma>/<ชื่อ>`)
   ทุกตัว export ใน `index.ts`
4. **สี ระยะ มุมโค้ง** ใช้ CSS variable `--p-*` จาก `src/styles/_tokens.scss` ห้ามใส่รหัสสีตรง
5. **ไอคอน** ใช้ PrimeIcons 7.0.0 ก่อน `<i class="pi pi-eye"></i>` (ชื่อตรงกับ Figma `pi-<ชื่อ>` ขนาดใช้ `text-base` `text-xl` `text-2xl`)
   ขนาดอื่นตาม Figma (14, 18, 22) หรือชื่อไอคอนส่งผ่าน input ของ component ใช้ `<btfp-icon name="pi-trash" size="18" />` (ชื่อขึ้นต้น `pi-` แสดงเป็น PrimeIcons)
   ตัวที่ PrimeIcons ไม่มี (Icon กลาง ใน Figma `icon/<หมวด>/<ชื่อ>`) ใช้ `<btfp-icon name="bold" size="16" />` ตัวใหม่วาดเพิ่มใน `src/app/theme/central-icons.ts` ตามหลักการในไฟล์นั้น
   ไอคอนในโค้ดต้องตรงกับ Figma ทุกตัว ห้ามใช้ชุดไอคอนอื่น (Lucide ถอดออกแล้ว) ห้ามอัปเกรด `primeicons` เป็น 8 ขึ้นไป (สัญญาอนุญาตเชิงพาณิชย์)
6. **วันที่** ใช้ `<p-datepicker appendTo="body">` จากแพ็กเกจ `primeng-buddhist-year-datepicker` เสมอ (import `DatePicker` จากแพ็กเกจนี้ ไม่ใช่ `primeng/datepicker` คู่กับ `DatePickerDefaults` จาก shared/ui) (แสดงแบบ 1 ม.ค. 2569 ปี พ.ศ. เก็บ ค.ศ.) ข้อความวันที่ในหน้าใช้รูปแบบเดียวกัน ช่วงวันที่เขียน 1 ก.ย. 2569 - 30 ก.ย. 2569
   **สถานะ** ใช้ `<btfp-status-tag status="review" />` ห้ามเลือกสีเอง (ดู 14 สถานะใน DESIGN.md ข้อ 4)
   **ตัวอักษร** ใช้ class `.btfp-text-h2` `.btfp-text-body-s` ฯลฯ ตาม Text Style ใน Figma
   **ช่องกรอก** ครอบด้วย `.btfp-field` + `.btfp-required` `.btfp-field__helper` `.btfp-field__error` (มีลิงก์ขวาของป้ายชื่อ เช่น ลืมรหัสผ่าน ครอบด้วย `.btfp-field__label-row`)
   **ปุ่ม** secondary ใน Figma = `outlined severity="secondary"` (ห้ามใช้ `outlined` เฉย ๆ จะเป็นสีน้ำเงิน)
7. **ตาราง** ใช้ `<table class="btfp-table">` ส่วนกลาง ห้ามเขียน CSS ของตารางในหน้า (ดู Storybook Components/Data Display/Table) แถวสูง 56px ข้อความบรรทัดเดียว ยาวเกินตัดด้วย ellipsis และใส่ `title` ชิดขวาเฉพาะจำนวนเงิน (`btfp-table__money`) ตัวเลขอื่นชิดซ้าย
   **ช่องกรอกจำนวนเงิน** ชิดขวาเหมือนกัน `<input pInputText class="btfp-input-money">` หรือ `<p-inputnumber inputStyleClass="btfp-input-money">` ช่องกรอกตัวเลขอื่นชิดซ้าย
8. **ปุ่มท้ายแถว** ใช้ `<btfp-row-actions>` ลำดับ ดู แก้ไข ลบ การลบต้องมีป๊อปอัปยืนยันเสมอ
9. **ปุ่มส่งออก** ใช้ `<btfp-export-button>` ตัวเดียวทั้งระบบ
10. **ข้อความบนหน้าจอ** ห้ามใช้ "—" และ "•" ห้ามแสดงรหัสหน้าจอ (B-21 ฯลฯ) ให้ผู้ใช้เห็น
11. **ฟอร์มเนื้อหา** ใช้หน้าเต็ม พร้อมแถบปุ่มบันทึกฉบับร่างด้านล่าง ไม่ใช้ Dialog
12. ทุกลิงก์และปุ่มต้องไปที่ใดที่หนึ่ง เมนูที่ยังไม่ทำให้ไปหน้า placeholder (route `**`)
13. ทุกหน้าใหม่ต้องมี route ใน `app.routes.ts` และ story ใน `Pages/`

## ขั้นตอนขึ้นหน้าใหม่

1. อ่าน frame ใน Figma ทั้ง screenshot และโครงสร้าง (ขนาด ช่องว่าง ข้อความ)
2. สร้างโฟลเดอร์ใน `src/app/pages/<เมนู>/<หน้า>/` มี `.ts` `.html` `.scss`
3. ใช้ component ที่มีอยู่ก่อน (ดู `src/app/shared/ui/index.ts`)
4. เพิ่ม route และ story
5. รัน `npm run build` และ `npm run build-storybook` ให้ผ่าน
6. เปิดหน้าจริงแคปภาพเทียบกับ Figma ที่ความกว้าง 1920px แก้จนใกล้เคียง
7. สรุปให้ผู้ใช้ว่าทำอะไร ต่างจาก Figma ตรงไหน และมีอะไรที่ยังเป็นตัวแทน

## สิ่งที่ต้องระวัง

- DatePicker ใช้แพ็กเกจ `primeng-buddhist-year-datepicker` ล็อกรุ่น 21.0.2 (ทีม dev ใช้อยู่แล้ว) เป็นสำเนา DatePicker ของ PrimeNG 21.0.6 ใช้แท็ก `p-datepicker` เหมือน PrimeNG ห้าม import คู่กับ `primeng/datepicker` ในหน้าเดียวกัน
  ไม่ได้รับการแก้บั๊กของ PrimeNG รุ่นหลัง และรองรับ PrimeNG 21 เท่านั้น ถ้าอัปเกรด PrimeNG ต้องเช็กว่าแพ็กเกจมีรุ่นที่รองรับ แล้วทดสอบหน้า Storybook "PrimeNG (ธีม กทปส.)/Forms/DatePicker" ซ้ำ
  `DatePickerDefaults` (ใน shared/ui) เกาะบนแท็ก `p-datepicker` ตั้งค่าตามระบบ: ปี พ.ศ. รูปแบบ 1 ม.ค. 2569 ไอคอนในช่อง ปุ่มวันนี้/ล้าง
- directive ที่เติมให้ PrimeNG (`DatePickerDefaults`, `btfpDrawer`) ตั้งค่าได้เฉพาะ input แบบเดิมของ PrimeNG input ที่เป็น signal (เช่น `appendTo`, `position`) ต้องใส่เป็น attribute ในหน้าเอง
- การโหลดตอนเปลี่ยนเมนูใช้ ngx-ui-loader (`btfpLoaderProviders()` ใน `app.config.ts` หน้าตาตามค่าที่ BA เลือกใน `BTFP_LOADER_CONFIG` สีผูก token `--p-loading-*`) แสดงผลผ่าน `btfp-route-progress` ใน `app.ts` เท่านั้น ห้ามใส่ `<ngx-ui-loader>` ในหน้า
- การเรียก API ไม่มีตัวโหลดกลาง (ตกลงไม่ใช้วงหมุนมุมขวาล่าง) ให้แสดงสถานะที่ component ที่ผู้ใช้กด: ปุ่มใช้ `<p-button loading>` (กดซ้ำไม่ได้) ตารางใช้แถว `<p-skeleton>` ระหว่างรอข้อมูล ดู Storybook "PrimeNG (ธีม กทปส.)/Feedback/Progress และ Spinner"
- ไอคอนใน Figma มีสองชุด: PrimeIcons `pi-<ชื่อ>` 313 ตัว (ขยายเต็มกรอบเหมือนฟอนต์จริง) และ Icon กลาง `icon/<หมวด>/<ชื่อ>` 26 ตัว (วาดให้เข้ากับ PrimeIcons) ใช้ชื่อหลัง `/` สุดท้ายกับ `btfp-icon`
- `btfp-icon` ตั้งความหนาเส้น Icon กลางให้อัตโนมัติ 1.5 คงที่ (ย่อขยายตามรูปเหมือน PrimeIcons) ไม่ต้องใส่ `strokeWidth`
- ตาราง input/output ในหน้า Docs ของ Storybook สร้างจาก Compodoc (`documentation.json` สร้างใหม่ทุกครั้งที่เปิด Storybook ไม่ต้อง commit) คำอธิบายมาจาก comment `/** */` เหนือ input/output ให้เขียนเป็นภาษาไทยทุกตัว member ที่ไม่ใช่ API ให้เป็น `protected` หรือ `private` จะได้ไม่ขึ้นในตาราง
- `p-select`, `p-multiselect`, `p-datepicker` ใน Drawer ให้ใส่ `appendTo="body"` ไม่งั้น overlay จะโดนตัด
- token ใช้ prefix `--p-*` เหมือน PrimeNG และอยู่นอก CSS layer จึงชนะค่าของ PrimeNG เสมอ ชุดสีพื้นฐาน (`--p-blue-500`, `--p-red-500`, `--p-gray-500` ฯลฯ 70 ตัว) ตั้งใจทับชุดสีของ PrimeNG
  token ใหม่ห้ามตั้งชื่อตรงกับตัวแปรของ PrimeNG โดยไม่ตั้งใจ `npm run check:tokens` จะหยุดถ้าเจอ
  ชื่อ class และ component ยังใช้ `btfp-` (รอทีมตัดสิน prefix กลาง) ห้ามใช้ `p-` เพราะชนกับ PrimeNG แล้วหน้าพังโดย build ไม่เตือน
- ลำดับ CSS layer: theme, base, primeng, btfp, components, utilities (ประกาศใน `src/tailwind.css` และ `app.config.ts` ต้องตรงกัน)
