import { StyleSheet } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

import { MotionView } from './motion';

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <MotionView variant="scaleIn" styles={styles.container}>
      <MotionView variant="fadeInUp" delay={120} styles={styles.iconContainer}>
        <Icon
          source="clipboard-text-outline"
          size={40}
          color={theme.colors.onSurfaceVariant}
        />
      </MotionView>
      <MotionView variant="fadeIn" delay={200}>
        <Text variant="bodyLarge" style={styles.message}>
          {message}
        </Text>
      </MotionView>
    </MotionView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E0F7F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
});
