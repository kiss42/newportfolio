// Converts a hex color to rgba with the given alpha; returns the input unchanged if it isn't hex.
export function withAlpha(color, alpha) {
  if (!color || !color.startsWith('#')) return color;
  let hex = color.slice(1);
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function hexToHsl(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l * 100 };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let hue;
  if (max === r) hue = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) hue = (b - r) / d + 2;
  else hue = (r - g) / d + 4;
  return { h: hue * 60, s: s * 100, l: l * 100 };
}

export function hslToHex(h, s, l) {
  const sat = s / 100;
  const light = l / 100;
  const k = (n) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n) => light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `#${[f(0), f(8), f(4)].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('')}`;
}

// Relative luminance (WCAG) of a hex color, 0 (black) to 1 (white).
export function luminance(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Builds a complete scheme from one accent color, tinting the background with its hue.
export function schemeFromAccent(picked, isDark) {
  const { h, s, l: pickedL } = hexToHsl(picked);
  const sat = Math.max(s, 35);
  // Keep accent text readable: too-light accents get darkened on light backgrounds, too-dark ones lifted on dark.
  let l = pickedL;
  if (!isDark && luminance(picked) > 0.25) l = Math.min(pickedL, 40);
  if (isDark && luminance(picked) < 0.06) l = Math.max(pickedL, 55);
  const primary = l === pickedL ? picked : hslToHex(h, s, l);
  return {
    isDark,
    background: isDark ? hslToHex(h, Math.min(sat, 40), 4) : hslToHex(h, Math.min(sat, 70), 95),
    primary,
    secondary: isDark ? hslToHex(h, sat, Math.max(l * 0.6, 18)) : hslToHex(h, sat, Math.min(l + 12, 60)),
    text: isDark ? '#ffffff' : '#1e293b',
    onPrimary: luminance(primary) > 0.45 ? '#0b0b12' : '#ffffff',
    onSecondary: isDark ? '#ffffff' : '#1e293b',
  };
}
