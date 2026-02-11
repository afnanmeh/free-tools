export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function calculateContrast(color1: string, color2: string): {
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
  rating: string;
} {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return { ratio: 1, wcagAA: false, wcagAAA: false, rating: 'Invalid' };
  }

  const luminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = luminance(rgb2.r, rgb2.g, rgb2.b);

  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return {
    ratio: Math.round(ratio * 100) / 100,
    wcagAA: ratio >= 4.5,
    wcagAAA: ratio >= 7,
    rating: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail',
  };
}

export function generatePalette(baseColor: string, type: 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'tetradic'): string[] {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [baseColor];

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  switch (type) {
    case 'monochromatic': {
      const c1 = hslToRgb(hsl.h, hsl.s, Math.max(10, hsl.l - 30));
      const c2 = hslToRgb(hsl.h, hsl.s, Math.max(10, hsl.l - 15));
      const c3 = hslToRgb(hsl.h, hsl.s, Math.min(90, hsl.l + 15));
      const c4 = hslToRgb(hsl.h, hsl.s, Math.min(90, hsl.l + 30));
      return [
        rgbToHex(c1.r, c1.g, c1.b),
        rgbToHex(c2.r, c2.g, c2.b),
        baseColor,
        rgbToHex(c3.r, c3.g, c3.b),
        rgbToHex(c4.r, c4.g, c4.b),
      ];
    }
    case 'analogous': {
      const c1 = hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l);
      const c2 = hslToRgb((hsl.h + 60) % 360, hsl.s, hsl.l);
      const c3 = hslToRgb((hsl.h - 30 + 360) % 360, hsl.s, hsl.l);
      const c4 = hslToRgb((hsl.h - 60 + 360) % 360, hsl.s, hsl.l);
      return [
        baseColor,
        rgbToHex(c1.r, c1.g, c1.b),
        rgbToHex(c2.r, c2.g, c2.b),
        rgbToHex(c3.r, c3.g, c3.b),
        rgbToHex(c4.r, c4.g, c4.b),
      ];
    }
    case 'complementary': {
      const c1 = hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l);
      return [
        baseColor,
        rgbToHex(c1.r, c1.g, c1.b),
      ];
    }
    case 'triadic': {
      const c1 = hslToRgb((hsl.h + 120) % 360, hsl.s, hsl.l);
      const c2 = hslToRgb((hsl.h + 240) % 360, hsl.s, hsl.l);
      return [
        baseColor,
        rgbToHex(c1.r, c1.g, c1.b),
        rgbToHex(c2.r, c2.g, c2.b),
      ];
    }
    case 'tetradic': {
      const c1 = hslToRgb((hsl.h + 90) % 360, hsl.s, hsl.l);
      const c2 = hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l);
      const c3 = hslToRgb((hsl.h + 270) % 360, hsl.s, hsl.l);
      return [
        baseColor,
        rgbToHex(c1.r, c1.g, c1.b),
        rgbToHex(c2.r, c2.g, c2.b),
        rgbToHex(c3.r, c3.g, c3.b),
      ];
    }
    default:
      return [baseColor];
  }
}

export function generateRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export function simulateColorBlindness(hex: string, type: 'protanopia' | 'deuteranopia' | 'tritanopia'): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  switch (type) {
    case 'protanopia':
      r = 0.567 * r + 0.433 * g;
      g = 0.558 * r + 0.442 * g;
      b = 0.242 * g + 0.758 * b;
      break;
    case 'deuteranopia':
      r = 0.625 * r + 0.375 * g;
      g = 0.7 * r + 0.3 * g;
      b = 0.3 * g + 0.7 * b;
      break;
    case 'tritanopia':
      r = 0.95 * r + 0.05 * g;
      g = 0.433 * g + 0.567 * b;
      b = 0.475 * g + 0.525 * b;
      break;
  }

  return rgbToHex(
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  );
}

export function exportPalette(colors: string[], format: 'css' | 'json' | 'scss'): string {
  switch (format) {
    case 'css':
      return `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
    case 'json':
      return JSON.stringify(colors.reduce((acc, c, i) => ({ ...acc, [`color${i + 1}`]: c }), {}), null, 2);
    case 'scss':
      return colors.map((c, i) => `$color-${i + 1}: ${c};`).join('\n');
    default:
      return colors.join(', ');
  }
}
