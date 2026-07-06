import { TextStyle } from 'react-native';

export const fontFamily = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const typography: Record<string, TextStyle> = {
  h1: { fontSize: fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  h2: { fontSize: fontSize['2xl'], fontWeight: '600', lineHeight: 32 },
  h3: { fontSize: fontSize.xl, fontWeight: '600', lineHeight: 28 },
  body: { fontSize: fontSize.base, fontWeight: '400', lineHeight: 24 },
  bodySmall: { fontSize: fontSize.sm, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: fontSize.xs, fontWeight: '400', lineHeight: 16 },
  label: { fontSize: fontSize.sm, fontWeight: '500', lineHeight: 20 },
  button: { fontSize: fontSize.base, fontWeight: '600', lineHeight: 24 },
};
