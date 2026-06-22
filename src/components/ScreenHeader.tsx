import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DrawerToggleButton from './DrawerToggleButton';
import { colors } from '../constants/colors';
import { FadeInView } from './motion';

interface ScreenHeaderProps {
  title: string;
}

export default function ScreenHeader({ title }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <FadeInView style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <DrawerToggleButton />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingBottom: 14,
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  spacer: { width: 32 },
});
