import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import DrawerToggleButton from './DrawerToggleButton';
import { FadeInView } from './motion';

interface ScreenHeaderProps {
  title: string;
}

export default function ScreenHeader({ title }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <FadeInView style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <DrawerToggleButton />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
    </FadeInView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
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
      color: colors.headerText,
    },
    spacer: { width: 32 },
  });
}
