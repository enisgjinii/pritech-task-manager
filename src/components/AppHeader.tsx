import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import AppLogo from './AppLogo';
import { MotionView } from './motion';

export default function AppHeader() {
  return (
    <MotionView variant="slideInLeft" delay={80} styles={styles.container}>
      <MotionView variant="scaleIn" delay={0} styles={styles.logoWrap}>
        <AppLogo height={20} />
      </MotionView>
      <MotionView variant="fadeIn" delay={160}>
        <Text variant="titleMedium" style={styles.subtitle}>
          Task Manager
        </Text>
      </MotionView>
    </MotionView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  subtitle: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
