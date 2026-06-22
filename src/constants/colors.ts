export type ThemeColors = {
  background: string;
  surface: string;
  primary: string;
  accent: string;
  accentLight: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  error: string;
  errorLight: string;
  success: string;
  successLight: string;
  warning: string;
  headerText: string;
  overlay: string;
};

export const lightColors: ThemeColors = {
  background: '#F5F7FA',
  surface: '#FFFFFF',
  primary: '#0A1128',
  accent: '#00A89E',
  accentLight: '#E0F7F6',
  text: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  success: '#16A34A',
  successLight: '#DCFCE7',
  warning: '#EA580C',
  headerText: '#FFFFFF',
  overlay: 'rgba(10, 17, 40, 0.45)',
};

export const darkColors: ThemeColors = {
  background: '#0B1220',
  surface: '#151F33',
  primary: '#0A1128',
  accent: '#00A89E',
  accentLight: '#0D3D3A',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  border: '#2A3548',
  error: '#F87171',
  errorLight: '#3F1D1D',
  success: '#4ADE80',
  successLight: '#14532D',
  warning: '#FB923C',
  headerText: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.55)',
};

/** @deprecated Use useTheme().colors instead */
export const colors = lightColors;
