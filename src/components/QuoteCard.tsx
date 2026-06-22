import { StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Card,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';

import { MotionView } from './motion';
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
  const theme = useTheme();

  return (
    <MotionView variant="fadeInDown" delay={0}>
      <Card
        mode="elevated"
        style={[styles.card, { borderLeftColor: theme.colors.secondary }]}
      >
        <Card.Title
          title="Daily Motivation"
          titleStyle={[styles.title, { color: theme.colors.secondary }]}
          left={(props) => (
            <IconButton
              {...props}
              icon="format-quote-close"
              iconColor={theme.colors.secondary}
              size={20}
              style={styles.titleIcon}
            />
          )}
          right={() => (
            <IconButton
              icon="refresh"
              iconColor={theme.colors.secondary}
              size={20}
              onPress={onRefresh}
              disabled={loading}
              accessibilityLabel="Refresh quote"
            />
          )}
        />
        <Card.Content style={styles.content}>
          {loading ? (
            <ActivityIndicator
              animating
              color={theme.colors.secondary}
              style={styles.loader}
            />
          ) : error ? (
            <MotionView variant="fadeIn" key="quote-error">
              <Text variant="bodyMedium" style={styles.errorText}>
                {error}
              </Text>
            </MotionView>
          ) : quote ? (
            <MotionView variant="fadeInUp" key={`quote-${quote.content.slice(0, 12)}`}>
              <Text variant="bodyMedium" style={styles.quote}>
                "{quote.content}"
              </Text>
              <Text variant="bodySmall" style={styles.author}>
                — {quote.author}
              </Text>
            </MotionView>
          ) : null}
        </Card.Content>
      </Card>
    </MotionView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titleIcon: {
    margin: 0,
    width: 32,
    height: 32,
  },
  content: {
    paddingTop: 0,
  },
  loader: {
    marginVertical: 8,
  },
  quote: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
  author: {
    marginTop: 8,
    opacity: 0.7,
    fontWeight: '500',
  },
  errorText: {
    opacity: 0.7,
    lineHeight: 20,
  },
});
