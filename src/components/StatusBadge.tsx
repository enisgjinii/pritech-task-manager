import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

interface StatusBadgeProps {
  completed: boolean;
}

export default function StatusBadge({ completed }: StatusBadgeProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={[styles.badge, completed ? styles.completed : styles.active]}>
      <Text style={[styles.text, completed ? styles.completedText : styles.activeText]}>
        {completed ? 'Completed' : 'Active'}
      </Text>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
    active: { backgroundColor: colors.accentLight },
    completed: { backgroundColor: colors.successLight },
    text: { fontSize: 11, fontWeight: '600' },
    activeText: { color: colors.accent },
    completedText: { color: colors.success },
  });
}
