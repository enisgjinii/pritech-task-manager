import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

import { darkColors, lightColors, ThemeColors } from '../constants/colors';
import {
  getStoredThemeMode,
  setStoredThemeMode,
  ThemeMode,
} from '../storage/themeStorage';

type ThemeContextValue = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  colors: ThemeColors;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    getStoredThemeMode().then(setThemeModeState);
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    void setStoredThemeMode(mode);
  }, []);

  const isDark = useMemo(() => {
    if (themeMode === 'system') return systemScheme === 'dark';
    return themeMode === 'dark';
  }, [themeMode, systemScheme]);

  const colors = isDark ? darkColors : lightColors;

  const value = useMemo(
    () => ({ themeMode, setThemeMode, isDark, colors }),
    [themeMode, setThemeMode, isDark, colors],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
