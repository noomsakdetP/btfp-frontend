# CLAUDE.md

คำแนะนำสำหรับ Claude Code เวลาทำงานใน repo นี้ ตอบผู้ใช้เป็นภาษาไทย

## โปรเจกต์

Front-end ของระบบบริหารจัดการทุน กทปส. (สำนักงาน กสทช.) สร้างจากงานออกแบบใน Figma
Angular 21 (standalone, zoneless, signals) + PrimeNG 21 (styled mode, preset) + Storybook 10 (`@storybook/angular-vite`)

## คำสั่ง

```bash
npm start                 # dev server :4200
npm run build             # ต้องผ่านก่อนบอกว่างานเสร็จ
npm run storybook         # :6006
npm run build-storybook   # ต้องผ่านก่อนบอกว่างานเสร็จ
```

เครื่อง Windows ของบริษัทบล็อก PowerShell script ให้รัน npm ผ่าน cmd

## Figma

- ไฟล์หลัก `pGyEKPXYJ054QjRLVHu2FD`
- หน้า: Design System `0:1`, Front-end `32:1388` (ผู้ขอรับทุน), Back-end `60:7994` (เจ้าหน้าที่/ผู้บริหาร/admin), Mobile App `476:25411`
- หน้าที่ทำแล้ว: B-01 `60:7997`, B-01F Drawer `479:132339`, B-01E `480:66623`
- เวลาขึ้นหน้าใหม่ ใช้ Figma MCP อ่าน frame (get_metadata / get_design_context / get_screenshot) แล้วแปลงเป็นโค้ดตามกฎด้านล่าง โค้ดที่ Figma ให้มาเป็นแค่ตัวอ้างอิง ห้ามวางตรง ๆ

## กฎการเขียนหน้า (ตกลงกับทีมแล้ว)

1. **ข้อความพิมพ์ตรงใน HTML** ไม่ใช้ตัวแปรหรือ `@for` สำหรับข้อมูลในหน้า (ยังไม่ต่อ API)
   ตัวเลือกของ select เขียนเป็นค่าคงที่ใน template ได้ `[options]="[{ label: 'ก', value: 'a' }]"`
   ตัวแปรใน .ts ใช้ได้เฉพาะสถานะ UI เช่น เปิดปิด Drawer หรือ Dialog
2. **ใช้ PrimeNG ก่อน** ปรับหน้าตาที่ `src/app/theme/btfp-preset.ts` ไม่เขียน CSS ทับ PrimeNG ถ้าไม่จำเป็น
3. ถ้า PrimeNG ไม่มี หรือมีกฎเฉพาะ ให้สร้าง `btfp-*` ใน `src/app/shared/ui/` พร้อม `.stories.ts` และ export ใน `index.ts`
4. **สี ระยะ มุมโค้ง** ใช้ CSS variable `--btfp-*` จาก `src/styles/_tokens.scss` ห้ามใส่รหัสสีตรง
5. **ไอคอน** `<btfp-icon name="eye" size="16" />` ไอคอนใหม่ต้องเพิ่มใน `src/app/theme/icons.ts` (import จาก `lucide`)
6. **วันที่** ใช้ `<btfp-datepicker>` เสมอ (แสดง พ.ศ. เก็บ ค.ศ.)
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
- `p-drawer`, `p-select` ใน Drawer ให้ใส่ `appendTo="body"` ไม่งั้น overlay จะโดนตัด
