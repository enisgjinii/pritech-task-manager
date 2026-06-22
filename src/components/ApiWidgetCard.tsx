import { useMemo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { ThemeColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import { StaggerInView } from './motion';

interface ApiWidgetCardProps {
  title: string;
  subtitle?: string;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
  actionLabel?: string;
  onAction?: () => void;
  animationIndex?: number;
}

export default function ApiWidgetCard({
  title,
  subtitle,
  loading = false,
  error = null,
  onRefresh,
  children,
  style,
  actionLabel,
  onAction,
  animationIndex = 0,
}: ApiWidgetCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <StaggerInView index={animationIndex} style={[styles.card, style]}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {onRefresh ? (
          <TouchableOpacity onPress={onRefresh} style={styles.refreshBtn}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {loading ? (
        <ActivityIndicator color={colors.accent} style={styles.loader} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        children
      )}

      {actionLabel && onAction && !loading && !error ? (
        <TouchableOpacity style={styles.actionBtn} onPress={onAction}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </StaggerInView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 14,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    headerText: { flex: 1 },
    title: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
    },
    subtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    refreshBtn: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    refreshText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.accent,
    },
    loader: { marginVertical: 12 },
    error: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    actionBtn: {
      marginTop: 10,
      alignSelf: 'flex-start',
      backgroundColor: colors.accentLight,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    actionText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.accent,
    },
  });
}
