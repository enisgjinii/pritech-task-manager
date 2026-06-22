import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
