import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { paddingVertical: 8 },
    message: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
  });
}
