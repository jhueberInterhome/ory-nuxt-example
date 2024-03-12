import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import colors from './plugins/@ihgroup/colors/customColors'

export default {
  theme: {
    extend: {
      colors,
      backdropBlur: {
        xs: '1px',
      },
      transitionProperty: {
        height: 'height,min-height,max-height',
      },
      typography: {
        richtext: {
          css: {
            h3: {
              color: 'var(--color-theme)',
              margin: '0 0 0.5rem',
              'font-weight': '400',
              'font-size': '1.25rem',
            },
            h4: {
              color: 'var(--color-theme)',
              margin: '0 0 0.5rem',
              'font-weight': '400',
              'font-size': '1rem',
            },
            a: {
              color: 'var(--color-theme)',
              cursor: 'pointer',
              'text-decoration': 'underline',
              'overflow-wrap': 'break-word',
            },
            'a > strong': {
              color: 'var(--color-theme)',
            },
            p: {
              'margin-top': '0rem',
              'margin-bottom': '1rem',
              'line-height': '1.5rem',
              'overflow-wrap': 'break-word',
            },
            li: {
              'line-height': '1.5rem',
              'overflow-wrap': 'break-word',
            },
            img: {
              'max-width': '100%',
              'margin-top': 'unset',
              'margin-bottom': 'unset',
            },
            '.fr-img-wrap': {
              'margin-top': '2rem',
              'margin-bottom': '2rem',
            },
            '.fr-inner': {
              'font-weight': '600',
            },
            iframe: {
              'max-width': '100%',
            },
            'img[data-align="right"]': {
              float: 'right',
              margin: '0 0 1.5rem 1.5rem',
            },
            'img[data-align="left"]': {
              float: 'left',
              margin: '0 1.5rem 1.5rem 0',
            },
            '.link-list__arrow': {
              display: 'none',
            },
          },
        },
        'richtext-searchpage': {
          css: {
            h3: {
              color: 'var(--color-theme)',
              margin: '0 0 0.5rem',
              'font-weight': '400',
              'font-size': '1.5rem',
            },
            h4: {
              color: 'var(--color-theme)',
              margin: '0 0 0.5rem',
              'font-weight': '400',
              'font-size': '1.5rem',
            },
            a: {
              color: 'var(--color-theme)',
              cursor: 'pointer',
              'text-decoration': 'underline',
              'overflow-wrap': 'break-word',
            },
            'a > strong': {
              color: 'var(--color-theme)',
            },
            p: {
              'font-size': '1rem',
              'margin-top': '0rem',
              'margin-bottom': '1rem',
              'line-height': '1.5rem',
              'overflow-wrap': 'break-word',
            },
            li: {
              'line-height': '1.5rem',
              'overflow-wrap': 'break-word',
            },
            img: {
              'max-width': '100%',
              'margin-top': 'unset',
              'margin-bottom': 'unset',
            },
            '.fr-img-wrap': {
              'margin-top': '2rem',
              'margin-bottom': '2rem',
            },
            '.fr-inner': {
              'font-weight': '600',
            },
            iframe: {
              'max-width': '100%',
            },
            'img[data-align="right"]': {
              float: 'right',
              margin: '0 0 1.5rem 1.5rem',
            },
            'img[data-align="left"]': {
              float: 'left',
              margin: '0 1.5rem 1.5rem 0',
            },
            '.link-list__arrow': {
              display: 'none',
            },
          },
        },
      },
      minHeight: {
        '1/4-screen': '25vh',
        '1/2-screen': '50vh',
        '2/3-screen': '66vh',
        '3/4-screen': '75vh',
        356: '356px', // minimale Höhe Loader Searchpage (Hitbox + Newsletter/Trustpilot)
      },
      height: {
        'screen-50': '50vh',
      },
      animation: {
        fadeIn: 'fadeIn 750ms ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      zIndex: {
        '-1': '-1',
        1: '1',
        5: '5',
      },
    },
    screens: {
      //                             Kleine bis mittlere Smartphones
      sm: '576px', //                Große Smartphone / Tables im Hochformat
      md: '960px', //                Tables im Querformat
      lg: '1200px', //               Maximalbreite unseres Inhalts (war bisher 1280px)
      xl: '1440px', //               Karte neben Suchresultaten
      // print: { raw: 'print' },
    },
    minWidth: {
      0: '0',
      '1/4': '25%',
      '1/3': '33.33%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
  },
  variants: {
    backgroundColor: [],
    borderColor: [],
    textColor: [],
    animation: ['motion-safe'],
  },
  plugins: [forms, typography],
  safelist: ['bg-black/30', 'bg-black/10', 'h-3', 'w-3'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './node_modules/@ihgroup/**/*.vue',
  ],
}
