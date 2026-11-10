import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * ธีม PrimeNG ของระบบ กทปส.
 *
 * ใช้ Aura เป็นฐาน แล้วทับค่าด้วย token จาก Figma (ดู src/styles/_tokens.scss)
 * หลักการ: ปรับที่ preset ก่อนเสมอ ถ้าทำไม่ได้จริง ๆ ค่อยเขียน CSS ใน layer "btfp"
 */
export const BtfpPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
  },
  semantic: {
    // Figma: color/blue/*
    primary: {
      50: '#eaf8ff',
      100: '#d0efff',
      200: '#a8e1fa',
      300: '#73cff2',
      400: '#38b7e7',
      500: '#0095db',
      600: '#0077b6',
      700: '#005e91',
      800: '#00466e',
      900: '#052f46',
      950: '#031d2c',
    },
    // Figma state=focus: เส้น focus-ring (blue/600) + วงนอก 3px สี blue/200
    focusRing: {
      width: '2px',
      style: 'solid',
      color: '{primary.600}',
      offset: '0',
      shadow: '0 0 0 5px {primary.200}',
    },
    // Figma Forms/*: สูง 40px ขอบซ้ายขวา 16px ตัวอักษร 16px มุม 4px
    formField: {
      paddingX: '1rem',
      paddingY: '0.375rem', // 6px + line-height 25.6px + เส้นขอบ 2px = 40px
      borderRadius: '4px', // radius/input
      fontSize: '1rem',
      // เส้นขอบตอนโฟกัสหนา 1.5px ตาม Figma: เส้น 1px + เงาด้านใน 0.5px สีเดียวกัน แล้ววงนอก 3px blue/200
      focusRing: { width: '0', style: 'none', color: 'transparent', offset: '0', shadow: 'inset 0 0 0 0.5px {primary.600}, 0 0 0 3px {primary.200}' },
      sm: { fontSize: '0.875rem', paddingX: '0.75rem', paddingY: '0.25rem' },
      lg: { fontSize: '1rem', paddingX: '1rem', paddingY: '0.6875rem' },
    },
    // ชั้นทับหลัง Drawer, Dialog, ป๊อปอัปยืนยัน ใช้ token ของระบบ (Aura ใช้ดำโปร่ง 40%)
    mask: {
      background: 'var(--p-overlay-mask)',
    },
    colorScheme: {
      light: {
        // Figma: color/cool-gray/*
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // ปุ่มหลักของเราใช้ blue/600 ไม่ใช่ 500 แบบค่าเริ่มต้นของ Aura
        primary: {
          color: '{primary.600}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.700}',
          activeColor: '{primary.800}',
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.100}',
          color: '{primary.700}',
          focusColor: '{primary.800}',
        },
        text: {
          color: '{surface.800}',
          hoverColor: '{surface.900}',
          mutedColor: '{surface.600}',
          hoverMutedColor: '{surface.700}',
        },
        formField: {
          borderColor: '{surface.200}',
          hoverBorderColor: '{surface.400}',
          focusBorderColor: '{primary.600}',
          invalidBorderColor: '#be123c',
          placeholderColor: '{surface.600}', // text/secondary
          disabledBackground: '{surface.50}', // input/bg/disabled
          disabledColor: '{surface.400}', // text/disabled
          color: '{surface.800}',
        },
      },
    },
  },
  components: {
    // Figma: Actions/Button และ Actions/IconButton
    button: {
      root: {
        borderRadius: '8px', // radius/button
        paddingX: '1rem',
        paddingY: '0.4375rem', // 7px + line-height 24px + เส้นขอบ 2px = 40px
        gap: '0.5rem',
        iconOnlyWidth: '2.5rem',
        sm: { fontSize: '0.875rem', paddingX: '0.5rem', paddingY: '0.28125rem', iconOnlyWidth: '2rem' }, // 32px
        lg: { fontSize: '1rem', paddingX: '1.5rem', paddingY: '0.6875rem', iconOnlyWidth: '3rem' }, // 48px
        label: { fontWeight: '500' },
      },
      colorScheme: {
        light: {
          root: {
            // Type=danger ใน Figma เป็นปุ่มพื้นอ่อน ไม่ใช่ปุ่มแดงทึบ
            danger: {
              background: '#fff1f2',
              hoverBackground: '#ffe4e6',
              activeBackground: '#fecdd3',
              borderColor: '#fecdd3',
              hoverBorderColor: '#fda4af',
              activeBorderColor: '#fda4af',
              color: '#9f1239',
              hoverColor: '#9f1239',
              activeColor: '#881337',
              focusRing: { color: '{primary.600}', shadow: '0 0 0 5px {primary.200}' },
            },
          },
          // Type=secondary พื้นขาว เส้น border/strong ข้อความ action/secondary
          outlined: {
            secondary: {
              hoverBackground: '{surface.50}',
              activeBackground: '{surface.100}',
              borderColor: '{surface.400}',
              color: '#0a4263',
            },
          },
          // Type=tertiary / IconButton ghost: ข้อความ action/link พื้นตอนชี้ button/ghost/bg/hover
          text: {
            primary: { hoverBackground: '{surface.100}', activeBackground: '{surface.200}', color: '{primary.700}' },
            secondary: { hoverBackground: '{surface.100}', activeBackground: '{surface.200}', color: '{surface.600}' },
            danger: { hoverBackground: '#fff1f2', activeBackground: '#ffe4e6', color: '#be123c' },
          },
        },
      },
    },
    // Figma: Forms/Checkbox 24px มุม 4px เส้น border/strong
    checkbox: {
      root: { width: '1.5rem', height: '1.5rem', borderRadius: '4px', borderColor: '{surface.400}', hoverBorderColor: '{surface.500}' },
      icon: { size: '1rem' },
    },
    // Figma: Forms/Radio 24px จุดกลาง 8px
    radiobutton: {
      root: { width: '1.5rem', height: '1.5rem', borderColor: '{surface.400}', hoverBorderColor: '{surface.500}' },
      icon: { size: '0.5rem' },
    },
    // Figma: Forms/Toggle 44x24 พื้นขาวเส้นเทา ปุ่มกลม 18px สีเทา เปิดแล้วพื้น primary ปุ่มขาว
    toggleswitch: {
      root: {
        width: '2.75rem',
        height: '1.5rem',
        gap: '0.125rem',
        borderColor: '{surface.400}',
        hoverBorderColor: '{surface.500}',
        checkedBorderColor: '{primary.color}',
        checkedHoverBorderColor: '{primary.hover.color}',
        background: '{surface.0}',
        hoverBackground: '{surface.0}',
      },
      handle: {
        size: '1.125rem',
        background: '{surface.400}',
        hoverBackground: '{surface.500}',
        checkedBackground: '{surface.0}',
        checkedHoverBackground: '{surface.0}',
      },
    },
    // Figma: Forms/Segmented Control กรอบเทามุม 12px ช่องที่เลือกพื้น primary
    togglebutton: {
      root: {
        padding: '0.25rem',
        borderRadius: '12px',
        fontWeight: '400',
        fontSize: '1rem',
        background: '{surface.50}',
        checkedBackground: '{surface.50}',
        hoverBackground: '{surface.50}',
        borderColor: '{surface.200}',
        checkedBorderColor: '{surface.200}',
        color: '{surface.600}',
        hoverColor: '{surface.800}',
        checkedColor: '{surface.0}',
      },
      content: {
        padding: '0.625rem 1rem',
        borderRadius: '8px',
        checkedBackground: '{primary.600}',
        checkedShadow: '0 1px 3px rgba(15, 23, 41, 0.12)',
      },
    },
    selectbutton: {
      root: { borderRadius: '12px' },
    },
    card: {
      root: { borderRadius: '12px' },
    },
    drawer: {
      header: { padding: '1.5rem 1.5rem 1rem 1.5rem' },
      content: { padding: '1.25rem 1.5rem' },
      footer: { padding: '1rem 1.5rem' },
      title: { fontSize: '1.25rem', fontWeight: '600' },
    },
    // Figma: Navigation/Tabs ตัวอักษร 16px เส้นใต้ 3px ที่เลือกสี action/primary
    tabs: {
      tablist: { background: 'transparent', borderColor: '{surface.200}' },
      tab: {
        padding: '0.5rem 1rem 0.625rem 1rem',
        fontWeight: '400',
        fontSize: '1rem',
        activeColor: '{primary.600}',
        hoverColor: '{surface.800}',
        color: '{surface.600}',
      },
      activeBar: { height: '3px', background: '{primary.600}' },
    },
    // Figma: DataDisplay/Tag มุม 4px สูง 32px ตัวอักษร Regular 14 (เส้นขอบอยู่ใน styles.scss เพราะ p-tag ไม่มี token เส้นขอบ)
    tag: {
      root: { fontSize: '0.875rem', fontWeight: '400', padding: '0.25rem 0.5rem', gap: '0.25rem', borderRadius: '4px', roundedBorderRadius: '9999px' },
      icon: { size: '1rem' },
      colorScheme: {
        light: {
          info: { background: '#eaf8ff', color: '#005e91' },
          success: { background: '#f0fdf4', color: '#166534' },
          warn: { background: '#fefce8', color: '#713f12' },
          danger: { background: '#fff1f2', color: '#9f1239' },
          secondary: { background: '{surface.50}', color: '{surface.600}' }, // Tone=neutral
        },
      },
    },
    // Figma: ตัวกรองที่ใช้อยู่ = DataDisplay/Tag Tone=info + ปุ่มกากบาท 14px (ใส่ template #removeicon เป็น btfp-icon x)
    chip: {
      root: { borderRadius: '4px', paddingX: '0.5rem', paddingY: '0.25rem', gap: '0.25rem' },
      removeIcon: { size: '0.875rem' },
      colorScheme: {
        light: {
          root: { background: '{primary.50}', color: '{primary.700}' },
          removeIcon: { color: '{primary.700}' },
        },
      },
    },
    // Figma: Feedback/Tooltip พื้น bg/inverse ตัวอักษร 12px มุม 4px
    tooltip: {
      root: { background: '#092a48', color: '#ffffff', padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px', maxWidth: '20rem' },
    },
    // Figma: Navigation/PaginationItem 32px มุม 8px หน้าปัจจุบันพื้น primary
    paginator: {
      navButton: {
        borderRadius: '8px',
        width: '2rem',
        height: '2rem',
        color: '{surface.800}',
        hoverColor: '{surface.800}',
        hoverBackground: '{surface.100}',
        selectedBackground: '{primary.600}',
        selectedColor: '#ffffff',
        fontSize: '0.875rem',
      },
    },
    // Figma: DataDisplay/Avatar พื้น bg/subtle ตัวอักษร text/heading  S 32 = ค่าเริ่มต้น, M 40 = size="large", L 48 = size="xlarge"
    avatar: {
      root: { width: '2rem', height: '2rem', fontSize: '0.75rem', background: '{surface.50}', color: '#092a48' },
      lg: { width: '2.5rem', height: '2.5rem', fontSize: '0.875rem' },
      xl: { width: '3rem', height: '3rem', fontSize: '1rem' },
    },
    // Figma: Feedback/Progress Bar พื้น primary.100 แถบ primary.600 สูง 8px มุมมน
    progressbar: {
      root: { background: '{primary.100}', borderRadius: '9999px', height: '0.5rem' },
      value: { background: '{primary.600}' },
      label: { color: '#ffffff', fontSize: '0.75rem', fontWeight: '500' },
    },
    // Figma: Feedback/Loading Spinner ใช้สีน้ำเงินของระบบแทนสีรุ้งของ Aura
    progressspinner: {
      root: {
        colorOne: '{primary.600}',
        colorTwo: '{primary.500}',
        colorThree: '{primary.700}',
        colorFour: '{primary.400}',
      },
    },
  },
});
