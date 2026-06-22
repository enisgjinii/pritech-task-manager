import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '../constants/colors';
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
  return (
    <View style={[styles.card, task.completed && styles.cardCompleted]}>
      <TouchableOpacity
        style={[styles.checkbox, task.completed && styles.checkboxChecked]}
        onPress={onToggle}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel={
          task.completed ? 'Mark as not completed' : 'Mark as completed'
        }
      >
        {task.completed ? (
          <Ionicons name="checkmark" size={14} color={colors.surface} />
        ) : null}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.content}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, task.completed && styles.titleCompleted]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          <View
            style={[
              styles.badge,
              task.completed ? styles.badgeCompleted : styles.badgeActive,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                task.completed ? styles.badgeTextCompleted : styles.badgeTextActive,
              ]}
            >
              {task.completed ? 'Completed' : 'Active'}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.description,
            task.completed && styles.descriptionCompleted,
          ]}
          numberOfLines={2}
        >
          {truncateText(task.description, 80)}
        </Text>

        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={12} color={colors.textMuted} />
          <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel="Delete task"
      >
        <Ionicons name="trash-outline" size={20} color={colors.error} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardCompleted: {
    opacity: 0.75,
    backgroundColor: '#FAFAFA',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  content: {
    flex: 1,
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
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeActive: {
    backgroundColor: colors.accentLight,
  },
  badgeCompleted: {
    backgroundColor: colors.successLight,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  badgeTextActive: {
    color: colors.active,
  },
  badgeTextCompleted: {
    color: colors.completed,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 6,
  },
  descriptionCompleted: {
    color: colors.textMuted,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
});
