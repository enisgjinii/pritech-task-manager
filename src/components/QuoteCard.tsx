import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../constants/colors';
import { Quote } from '../services/quoteApi';

interface QuoteCardProps {
  quote: Quote | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export default function QuoteCard({
  quote,
  loading,
  error,
  onRefresh,
}: QuoteCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>Daily Motivation</Text>
        <TouchableOpacity
          onPress={onRefresh}
          disabled={loading}
          style={styles.refreshButton}
          accessibilityLabel="Refresh quote"
        >
          <Text style={styles.refreshText}>{loading ? '…' : '↻'}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.accent} style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : quote ? (
        <>
          <Text style={styles.quote}>"{quote.content}"</Text>
          <Text style={styles.author}>— {quote.author}</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshText: {
    fontSize: 18,
    color: colors.accent,
    fontWeight: '600',
  },
  loader: {
    marginVertical: 12,
  },
  quote: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    fontStyle: 'italic',
  },
  author: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
