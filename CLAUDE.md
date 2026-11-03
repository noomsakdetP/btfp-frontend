# CLAUDE.md

คำแนะนำสำหรับ Claude Code เวลาทำงานใน repo นี้ ตอบผู้ใช้เป็นภาษาไทย

## โปรเจกต์

Front-end ของระบบบริหารจัดการทุน กทปส. (สำนักงาน กสทช.) สร้างจากงานออกแบบใน Figma
Angular 21 (standalone, zoneless) + PrimeNG 21 (styled mode, preset) + Tailwind CSS 4 (`tailwindcss-primeui`) + Storybook 10 (`@storybook/angular-vite`)

## คำสั่ง

```bash
npm start                 # dev server :4200
npm run build             # ต้องผ่านก่อนบอกว่างานเสร็จ
npm run storybook         # :6006
npm run build-storybook   # ต้องผ่านก่อนบอกว่างานเสร็จ
```

เครื่อง Windows ของบริษัทบล็อก PowerShell script ให้รัน npm ผ่าน cmd

## เอกสารที่ต้องอ่านก่อนทำงาน

- `DESIGN.md` แนวทางการออกแบบ: token, ตัวอักษร, ตาราง Figma กับ component ในโค้ด (สถานะทำแล้ว/ต้องทำ), ข้อความสถานะ 14 แบบ, รูปแบบหน้า
  ทำ component ใหม่หรือแก้ token เสร็จแล้วให้อัปเดตตารางใน DESIGN.md ด้วย

## Figma

- ไฟล์หลัก `pGyEKPXYJ054QjRLVHu2FD`
- หน้า: Design System `0:1`, Front-end `32:1388` (ผู้ขอรับทุน), Back-end `60:7994` (เจ้าหน้าที่/ผู้บริหาร/admin), Mobile App `476:25411`
- หน้าที่ทำแล้ว
  - หน้าแรกสาธารณะ `50:6410` (/) ใช้ `btfp-public-layout`
  - B-01 `60:7997` (/proposals), B-01F Drawer `479:132339` (/proposals/filters), B-01E `480:66623` (/proposals/empty) ใช้ `btfp-staff-layout`
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
   - สถานะเปิด เช่น Drawer ทำเป็น route ลูกแล้วเปิดด้วย `routerLink` (ดู `/proposals/filters`) ใช้ `<btfp-drawer open>`
   - logic ภายใน component กลาง `btfp-*` มีได้ เพราะไม่ใช่ไฟล์ของหน้า
   - **Responsive ใช้ class ของ Tailwind** ในไฟล์ HTML (sm 640, md 768, lg 1024, xl 1280, wide 1440, 2xl 1536)
     ห้ามใช้ breakpoint แบบ `min-[1440px]:` เพราะ Tailwind เรียงลำดับผิด ถ้าต้องการขนาดใหม่ให้เพิ่มใน `@theme` ของ `src/tailwind.css`
     ไฟล์ .scss ของหน้าใส่แค่สี ตัวอักษร เส้น ห้ามใส่ display/grid/flex/padding ของ layout เพราะ CSS ของ component ชนะ class ของ Tailwind
   - ทดสอบทุกหน้าที่ความกว้าง 1920, 1440, 1024 และ 390px
   - **Responsive ต้องไม่ทำให้หน้าตาต่างจาก Figma บนจอเดสก์ท็อป** กลุ่มที่ Figma วางเป็นแถวเดียว (เช่น การ์ด KPI)
     ให้คงแถวเดียวแล้วเลื่อนซ้ายขวาเมื่อจอแคบ ห้ามตัดลงบรรทัดใหม่ ถ้าจำเป็นต้องจัดใหม่ให้ถามผู้ใช้ก่อน
2. **ใช้ PrimeNG ก่อน** ปรับหน้าตาที่ `src/app/theme/btfp-preset.ts` ไม่เขียน CSS ทับ PrimeNG ถ้าไม่จำเป็น
3. ถ้า PrimeNG ไม่มี หรือมีกฎเฉพาะ ให้สร้าง `btfp-*` ใน `src/app/shared/ui/` พร้อม `.stories.ts` และ export ใน `index.ts`
4. **สี ระยะ มุมโค้ง** ใช้ CSS variable `--btfp-*` จาก `src/styles/_tokens.scss` ห้ามใส่รหัสสีตรง
5. **ไอคอน** `<btfp-icon name="eye" size="16" />` ไอคอนใหม่ต้องเพิ่มใน `src/app/theme/icons.ts` (import จาก `lucide`)
6. **วันที่** ใช้ `<btfp-datepicker>` เสมอ (แสดง พ.ศ. เก็บ ค.ศ.)
   **สถานะ** ใช้ `<btfp-status-tag status="review" />` ห้ามเลือกสีเอง (ดู 14 สถานะใน DESIGN.md ข้อ 4)
   **ตัวอักษร** ใช้ class `.btfp-text-h2` `.btfp-text-body-s` ฯลฯ ตาม Text Style ใน Figma
   **ช่องกรอก** ครอบด้วย `.btfp-field` + `.btfp-required` `.btfp-field__helper` `.btfp-field__error`
   **ปุ่ม** secondary ใน Figma = `outlined severity="secondary"` (ห้ามใช้ `outlined` เฉย ๆ จะเป็นสีน้ำเงิน)
7. **ตาราง** แถวสูง 56px ข้อความบรรทัดเดียว ยาวเกินตัดด้วย ellipsis และใส่ `title`
8. **ปุ่มท้ายแถว** ใช้ `<btfp-row-actions>` ลำดับ ดู แก้ไข ลบ การลบต้องมีป๊อปอัปยืนยันเสมอ
9. **ปุ่มส่งออก** ใช้ `<btfp-export-button>` ตัวเดียวทั้งระบบ
10. **ข้อความบนหน้าจอ** ห้ามใช้ "—" และ "•" ห้ามแสดงรหัสหน้าจอ (B-01 ฯลฯ) ให้ผู้ใช้เห็น
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

- `btfp-datepicker` แทนที่ method ภายในของ PrimeNG DatePicker ถ้าอัปเกรด PrimeNG ต้องทดสอบหน้า Storybook "Datepicker (พ.ศ.)" ซ้ำ
- อย่าใช้ `@lucide/angular` (ไฟล์ใหญ่ 11MB ทำ Storybook build แรมเกิน) ใช้ `lucide` ผ่าน `btfp-icon`
- ไอคอนใน Figma (หน้า Design System, ชื่อ `icon/<หมวด>/<ชื่อ>`) มาจาก Lucide ทั้ง 118 ตัว ใช้ชื่อหลัง `/` สุดท้ายได้เลย
  ยกเว้น 6 ตัวที่ Lucide v1 เปลี่ยนชื่อ: `trash-2` → `trash`, `filter` → `funnel`, `circle-help` → `circle-question-mark`,
  `building-2` → `building-complex`, `history` → `rotate-ccw-clock`, `bold` → `letter-b`
- ความหนาเส้นไอคอนตาม Figma คือ 1.5 (16px ลงมา 1.25) `btfp-icon` ตั้งให้อัตโนมัติ ไม่ต้องใส่ `strokeWidth`
- `p-select`, `p-multiselect` ใน Drawer ให้ใส่ `appendTo="body"` ไม่งั้น overlay จะโดนตัด
- ลำดับ CSS layer: theme, base, primeng, btfp, components, utilities (ประกาศใน `src/tailwind.css` และ `app.config.ts` ต้องตรงกัน)
