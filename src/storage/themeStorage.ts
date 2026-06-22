import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'system' | 'light' | 'dark';

const THEME_KEY = '@pritech_theme_mode';

export async function getStoredThemeMode(): Promise<ThemeMode> {
  try {
    const value = await AsyncStorage.getItem(THEME_KEY);
    if (value === 'light' || value === 'dark' || value === 'system') {
      return value;
    }
    return 'system';
  } catch {
    return 'system';
  }
}

export async function setStoredThemeMode(mode: ThemeMode): Promise<void> {
  await AsyncStorage.setItem(THEME_KEY, mode);
}
