import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';

interface StatusBadgeProps {
  completed: boolean;
}

export default function StatusBadge({ completed }: StatusBadgeProps) {
  return (
    <View style={[styles.badge, completed ? styles.completed : styles.active]}>
      <Text style={[styles.text, completed ? styles.completedText : styles.activeText]}>
        {completed ? 'Completed' : 'Active'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
