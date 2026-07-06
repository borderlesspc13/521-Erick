/**
 * Portal B2B — Fábrica de Cordas Industriais
 * Alinhado com web/tailwind.config.js
 */
export const colors = {
  primary: {
    DEFAULT: '#1E3A8A',
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E3A8A',
    900: '#1E3A5F',
  },
  secondary: {
    DEFAULT: '#F97316',
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },
  background: {
    primary: '#F3F4F6',
    secondary: '#FFFFFF',
    elevated: '#FFFFFF',
    inverse: '#1E3A8A',
  },
  text: {
    primary: '#374151',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
    link: '#1E3A8A',
  },
  status: {
    aguardando: '#EAB308',
    producao: '#3B82F6',
    faturado: '#10B981',
  },
  border: {
    default: '#E5E7EB',
    focus: '#1E3A8A',
  },
} as const;

export type Colors = typeof colors;
