import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import AppLogo from './AppLogo';
import { colors } from '../constants/colors';

export default function AppHeader() {
  return (
    <View style={styles.container}>
      <AppLogo height={24} />
      <Text style={styles.subtitle}>Task Manager</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
});
