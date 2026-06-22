import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useTheme } from '../context/ThemeContext';

export default function LoadingState() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
  },
});
