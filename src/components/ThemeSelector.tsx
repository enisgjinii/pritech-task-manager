import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { ThemeColors } from '../constants/colors';
import { ThemeMode } from '../storage/themeStorage';

const OPTIONS: { key: ThemeMode; label: string }[] = [
  { key: 'system', label: 'System' },
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
];

export default function ThemeSelector() {
  const { themeMode, setThemeMode, colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Appearance</Text>
      <View style={styles.row}>
        {OPTIONS.map((option) => {
          const selected = themeMode === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.option, selected && styles.optionSelected]}
              onPress={() => setThemeMode(option.key)}
              activeOpacity={0.85}
            >
              <Text
                style={[styles.optionText, selected && styles.optionTextSelected]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.hint}>
        System follows your device light or dark setting.
      </Text>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { marginBottom: 14 },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 10,
    },
    row: { flexDirection: 'row', gap: 8 },
    option: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      alignItems: 'center',
    },
    optionSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    optionText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    optionTextSelected: { color: colors.headerText },
    hint: {
      marginTop: 8,
      fontSize: 12,
      color: colors.textMuted,
      lineHeight: 18,
    },
  });
}
