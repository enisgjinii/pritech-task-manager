import {
  MD3LightTheme,
  configureFonts,
  type MD3Theme,
} from 'react-native-paper';

import { colors } from './colors';

const fontConfig = {
  fontFamily: 'System',
};

export const appTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 10,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    onPrimary: colors.surface,
    primaryContainer: colors.primaryLight,
    onPrimaryContainer: colors.surface,
    secondary: colors.accent,
    onSecondary: colors.surface,
    secondaryContainer: colors.accentLight,
    onSecondaryContainer: colors.primary,
    tertiary: colors.success,
    onTertiary: colors.surface,
    background: colors.background,
    onBackground: colors.text,
    surface: colors.surface,
    onSurface: colors.text,
    surfaceVariant: colors.accentLight,
    onSurfaceVariant: colors.textSecondary,
    outline: colors.border,
    error: colors.error,
    onError: colors.surface,
    elevation: {
      level0: 'transparent',
      level1: colors.surface,
      level2: colors.surface,
      level3: colors.surface,
      level4: colors.surface,
      level5: colors.surface,
    },
  },
  fonts: configureFonts({ config: fontConfig }),
};
