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
    focusRing: {
      width: '2px',
      style: 'solid',
      color: '{primary.600}',
      offset: '2px',
    },
    formField: {
      paddingX: '0.75rem',
      paddingY: '0.5rem',
      borderRadius: '4px', // radius/input
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
          placeholderColor: '{surface.500}',
          color: '{surface.800}',
        },
      },
    },
  },
  components: {
    button: {
      root: {
        borderRadius: '8px', // radius/button
        paddingX: '1rem',
        paddingY: '0.4375rem', // 7px + line-height 24px + เส้นขอบ 2px = 40px ตาม Figma
        gap: '0.5rem',
        sm: { fontSize: '0.875rem', paddingX: '0.5rem', paddingY: '0.25rem' },
        // Figma: Actions/Button Size=lg สูง 48px ขอบซ้ายขวา 24px ตัวอักษร 16px
        lg: { fontSize: '1rem', paddingX: '1.5rem', paddingY: '0.6875rem' }, // 48px
        label: { fontWeight: '500' },
      },
      colorScheme: {
        light: {
          // Figma: Actions/Button Variant=secondary พื้นขาว เส้น border/strong ข้อความ action/secondary
          outlined: {
            secondary: {
              hoverBackground: '{surface.50}',
              activeBackground: '{surface.100}',
              borderColor: '{surface.400}',
              color: '#0a4263',
            },
          },
        },
      },
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
    tabs: {
      tablist: { background: 'transparent', borderColor: '{surface.200}' },
      tab: {
        padding: '0.5rem 1rem 0.75rem 1rem',
        fontWeight: '400',
        activeColor: '{primary.700}',
        color: '{surface.600}',
      },
      activeBar: { height: '3px', background: '{primary.600}' },
    },
    tag: {
      root: { fontSize: '0.8125rem', fontWeight: '500', padding: '0.125rem 0.5rem', gap: '0.25rem', borderRadius: '9999px' },
      colorScheme: {
        light: {
          // Figma: color/feedback/*
          info: { background: '#eaf8ff', color: '#005e91' },
          success: { background: '#f0fdf4', color: '#166534' },
          warn: { background: '#fefce8', color: '#713f12' },
          danger: { background: '#fff1f2', color: '#9f1239' },
          secondary: { background: '{surface.100}', color: '{surface.700}' },
        },
      },
    },
    chip: {
      root: { borderRadius: '4px', paddingX: '0.5rem', paddingY: '0.125rem', gap: '0.25rem' },
      colorScheme: {
        light: {
          root: { background: '{primary.50}', color: '{primary.700}' },
          removeIcon: { color: '{primary.700}' },
        },
      },
    },
    paginator: {
      navButton: {
        borderRadius: '6px',
        width: '2rem',
        height: '2rem',
        selectedBackground: '{primary.600}',
        selectedColor: '#ffffff',
      },
    },
  },
});
