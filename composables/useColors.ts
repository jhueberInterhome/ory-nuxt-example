export const useColors = defineStore('colors', () => {
  const colors: Ref<Colors> = ref({} as Colors)
  function init(company = 'ih') {
    const c = Object.assign({}, commoncolors, company === 'ic' ? iccolors : ihcolors)

    // TODO: iframe from params
    const iframe = false
    // TODO: Effektive Werte für berechnete Farben bestimmen
    if (iframe) {
      if (iframe['color-thm']) {
        c.theme = `#${iframe['color-thm']}`
        const { h, s, l } = hex2hsl(iframe['color-thm'])
        if (iframe['color-thm-hover']) {
          c.themeHover = `#${iframe['color-thm-hover']}`
        } else {
          c.themeHover = hsl2hex(h, s, l + 8)
        }
        if (iframe['color-thm-light']) {
          c.themeLight = `#${iframe['color-thm-light']}`
        } else {
          c.themeLight = hsl2hex(h, s, l + 25)
        }
        if (iframe['color-thm-contrast']) {
          c.themeContrast = `#${iframe['color-thm-contrast']}`
        } else {
          c.themeContrast = hsl2hex(h, s, l + 50)
        }
      }
      if (iframe['color-cta']) {
        c.cta = `#${iframe['color-cta']}`
        const { h, s, l } = hex2hsl(iframe['color-cta'])
        if (iframe['color-cta-hover']) {
          c.ctaHover = `#${iframe['color-cta-hover']}`
        } else {
          c.ctaHover = hsl2hex(h, s, l + 10)
        }
        if (iframe['color-cta-contrast']) {
          c.ctaContrast = `#${iframe['color-cta-contrast']}`
        } else {
          c.ctaContrast = hsl2hex(h, s, l + 50)
        }
      }
      if (iframe['color-hlt']) {
        c.highlight = `#${iframe['color-hlt']}`
        const { h, s, l } = hex2hsl(iframe['color-hlt'])
        if (iframe['color-hlt-hover']) {
          c.highlightHover = `#${iframe['color-hlt-hover']}`
        } else {
          c.highlightHover = hsl2hex(h, s, l + 8)
        }
        if (iframe['color-hlt-light']) {
          c.highlightLight = `#${iframe['color-hlt-light']}`
        } else {
          c.highlightLight = hsl2hex(h, s, l + 25)
        }
        if (iframe['color-hlt-contrast']) {
          c.highlightContrast = `#${iframe['color-hlt-contrast']}`
        } else {
          c.highlightContrast = hsl2hex(h, s, l + 50)
        }
      }
      if (iframe['color-err']) {
        c.error = iframe['color-err']
      }
    }
    colors.value = c
  }

  return { init, colors }
})

// TODO: Farben aus dem Designsystem aktualisieren
const commoncolors = {
  warning: '#eab308',
  success: '#21d25e',
  successReduced: '#91eeb1',
  successContrast: '#ffffff',

  textStrongest: '#000000',
  textStronger: '#111927', // tailwind text-900
  textStrong: '#1f2937', // tailwind text-800
  text: '#374151', // tailwind text-700
  textWeak: '#6b7280', // tailwind text-500
  textWeaker: '#d1d5db', // tailwind text-300
  textWeakest: '#f3f4f6', // tailwind text-100
  textContrast: '#ffffff',

  background: '#ffffff',
  background50: '#f9fafb',
  background100: '#f3f4f6',
  background200: '#e5e7eb',
  background300: '#d1d5db',
  background400: '#9ca3af',
  background500: '#6b7280',
  background600: '#4b5563',
  background700: '#374151',
  background800: '#1f2937',
  background900: '#111927',
}

const ihcolors = {
  theme: '#0096db',
  themeHover: '#33abe2', // 'rgba(0,150,219,.8)', // '#00aaef',
  themeLight: '#e6f5fb', // 'rgba(0,150,219,.1)',
  themeContrast: '#e0f6ff',

  highlight: '#e43956',
  highlightHover: '#E4576F',
  highlightContrast: '#ffffff',
  highlightLight: '#FFE3EC',

  cta: '#e63957',
  ctaHover: '#e95063',
  ctaContrast: '#ffffff',

  error: '#e43956',
}

const iccolors = {
  theme: '#19a5cd',
  themeHover: '#47b7b7', // 'rgba(25,165,205,.8)',
  themeLight: '#e8f6fa', // 'rgba(25,165,205,.1)',
  themeContrast: '#e0f6ff',

  highlight: '#F05519',
  highlightHover: '#F07343',
  highlightContrast: '#ffffff',
  highlightLight: '#f3a5b2',

  cta: '#8cb937',
  ctaHover: '#95c850',
  ctaContrast: '#ffffff',

  error: '#f05519',
}

function hex2hsl(hex: string) {
  // Convert hex to RGB first
  let r = 0
  let g = 0
  let b = 0
  if (hex.length === 3) {
    r = parseInt('0x' + hex[0] + hex[0])
    g = parseInt('0x' + hex[1] + hex[1])
    b = parseInt('0x' + hex[2] + hex[2])
  } else if (hex.length === 6) {
    r = parseInt('0x' + hex[0] + hex[1])
    g = parseInt('0x' + hex[2] + hex[3])
    b = parseInt('0x' + hex[4] + hex[5])
  }
  // Then to HSL
  r /= 255
  g /= 255
  b /= 255
  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin
  let h = 0
  let s = 0
  let l = 0

  if (delta === 0) {
    h = 0
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6
  } else if (cmax === g) {
    h = (b - r) / delta + 2
  } else {
    h = (r - g) / delta + 4
  }

  h = Math.round(h * 60)

  if (h < 0) {
    h += 360
  }

  l = (cmax + cmin) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return { h, s, l }
}

function hsl2hex(h: number, s: number, l: number) {
  l = l < 50 ? Math.max(0, l) : Math.min(100, l)
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0') // convert to Hex and prefix "0" if needed
  }
  return `#${f(0)}${f(8)}${f(4)}`
}
