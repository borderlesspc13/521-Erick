import { colors } from './colors';
import { spacing, borderRadius } from './spacing';
import { typography, fontSize, fontFamily } from './typography';

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  fontSize,
  fontFamily,
} as const;

export type Theme = typeof theme;
