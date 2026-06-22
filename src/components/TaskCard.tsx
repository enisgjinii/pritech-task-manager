import { StyleSheet, View } from 'react-native';
import {
  Card,
  Checkbox,
  Chip,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';

import { Task } from '../types/Task';
import { formatDate, truncateText } from '../utils/date';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskCard({
  task,
  onPress,
  onToggle,
  onDelete,
}: TaskCardProps) {
  const theme = useTheme();

  return (
    <Card
      mode="elevated"
      style={[styles.card, task.completed && styles.cardCompleted]}
      onPress={onPress}
    >
      <Card.Content style={styles.content}>
        <View style={styles.row}>
          <Checkbox
            status={task.completed ? 'checked' : 'unchecked'}
            onPress={onToggle}
            color={theme.colors.tertiary}
          />

          <View style={styles.body}>
            <View style={styles.titleRow}>
              <Text
                variant="titleSmall"
                numberOfLines={1}
                style={[
                  styles.title,
                  task.completed && styles.titleCompleted,
                ]}
              >
                {task.title}
              </Text>
              <Chip
                compact
                mode="flat"
                style={[
                  styles.chip,
                  task.completed ? styles.chipCompleted : styles.chipActive,
                ]}
                textStyle={[
                  styles.chipText,
                  {
                    color: task.completed
                      ? theme.colors.tertiary
                      : theme.colors.secondary,
                  },
                ]}
              >
                {task.completed ? 'Completed' : 'Active'}
              </Chip>
            </View>

            <Text
              variant="bodySmall"
              numberOfLines={2}
              style={[
                styles.description,
                task.completed && styles.descriptionCompleted,
              ]}
            >
              {truncateText(task.description, 80)}
            </Text>

            <View style={styles.dateRow}>
              <IconButton
                icon="calendar-outline"
                size={14}
                iconColor={theme.colors.onSurfaceVariant}
                style={styles.dateIcon}
              />
              <Text variant="labelSmall" style={styles.date}>
                {formatDate(task.createdAt)}
              </Text>
            </View>
          </View>

          <IconButton
            icon="delete-outline"
            iconColor={theme.colors.error}
            size={20}
            onPress={onDelete}
            accessibilityLabel="Delete task"
          />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  cardCompleted: {
    opacity: 0.75,
  },
  content: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  body: {
    flex: 1,
    marginTop: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontWeight: '600',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  chip: {
    height: 24,
  },
  chipActive: {
    backgroundColor: '#E0F7F6',
  },
  chipCompleted: {
    backgroundColor: '#DCFCE7',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    marginVertical: 0,
  },
  description: {
    opacity: 0.7,
    lineHeight: 20,
    marginBottom: 4,
  },
  descriptionCompleted: {
    opacity: 0.45,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    margin: 0,
    width: 20,
    height: 20,
  },
  date: {
    opacity: 0.5,
    marginLeft: -4,
  },
});
