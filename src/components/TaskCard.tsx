import { useMemo } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemeColors } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';
import { Task } from '../types/task';
import { formatDate, truncateText } from '../utils/date';
import { StaggerInView } from './motion';
import StatusBadge from './StatusBadge';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
  animationIndex?: number;
}

export default function TaskCard({
  task,
  onPress,
  onToggle,
  onDelete,
  animationIndex = 0,
}: TaskCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: onDelete },
    ]);
  };

  return (
    <StaggerInView index={animationIndex}>
      <TouchableOpacity
        style={[styles.card, task.completed && styles.cardCompleted]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <TouchableOpacity
          style={[styles.checkbox, task.completed && styles.checkboxChecked]}
          onPress={onToggle}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {task.completed ? <Text style={styles.checkmark}>✓</Text> : null}
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text
              style={[styles.title, task.completed && styles.titleDone]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            <StatusBadge completed={task.completed} />
          </View>

          <Text
            style={[styles.description, task.completed && styles.textMuted]}
            numberOfLines={2}
          >
            {truncateText(task.description, 90)}
          </Text>

          <Text style={styles.date}>{formatDate(task.createdAt)}</Text>

          {task.owner ? (
            <Text style={styles.owner} numberOfLines={1}>
              Owner: {task.owner.name}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </StaggerInView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardCompleted: { opacity: 0.78 },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.border,
      marginRight: 10,
      marginTop: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxChecked: {
      backgroundColor: colors.success,
      borderColor: colors.success,
    },
    checkmark: { color: colors.headerText, fontSize: 13, fontWeight: '700' },
    content: { flex: 1 },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4,
    },
    title: {
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    titleDone: {
      textDecorationLine: 'line-through',
      color: colors.textMuted,
    },
    description: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 4,
    },
    textMuted: { color: colors.textMuted },
    date: { fontSize: 12, color: colors.textMuted },
    owner: { fontSize: 12, color: colors.accent, marginTop: 4 },
    deleteBtn: { padding: 4, marginLeft: 6 },
    deleteText: { fontSize: 12, color: colors.error, fontWeight: '600' },
  });
}
