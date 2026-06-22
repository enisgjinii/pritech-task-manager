import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import AppLogo from './AppLogo';

export default function AppHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <AppLogo height={20} />
      </View>
      <Text variant="titleMedium" style={styles.subtitle}>
        Task Manager
      </Text>
    </View>
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
