import { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import { colors } from '../constants/colors';
import { RootStackParamList, Task } from '../types/Task';
import { formatDate } from '../utils/date';
import {
  deleteTask,
  loadTasks,
  toggleTaskCompletion,
} from '../utils/storage';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TaskDetails'
>;
type DetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

export default function TaskDetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailsRouteProp>();
  const { taskId } = route.params;

  const [task, setTask] = useState<Task | null>(null);

  const loadTask = useCallback(async () => {
    const tasks = await loadTasks();
    const found = tasks.find((t) => t.id === taskId) ?? null;
    setTask(found);

    if (!found) {
      navigation.goBack();
    }
  }, [taskId, navigation]);

  useFocusEffect(
    useCallback(() => {
      loadTask();
    }, [loadTask]),
  );

  const handleToggle = async () => {
    if (!task) return;
    await toggleTaskCompletion(task.id);
    await loadTask();
  };

  const handleDelete = () => {
    if (!task) return;

    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteTask(task.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.badge,
                task.completed ? styles.badgeCompleted : styles.badgeActive,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  task.completed
                    ? styles.badgeTextCompleted
                    : styles.badgeTextActive,
                ]}
              >
                {task.completed ? 'Completed' : 'Active'}
              </Text>
            </View>
            <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
          </View>

          <Text style={[styles.title, task.completed && styles.titleCompleted]}>
            {task.title}
          </Text>

          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>

        <View style={styles.actions}>
          <AppButton
            title={
              task.completed ? 'Mark as Not Completed' : 'Mark as Completed'
            }
            variant={task.completed ? 'outline' : 'secondary'}
            onPress={handleToggle}
          />

          <AppButton
            title="Delete Task"
            variant="danger"
            onPress={handleDelete}
            style={styles.deleteButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeActive: {
    backgroundColor: colors.accentLight,
  },
  badgeCompleted: {
    backgroundColor: colors.successLight,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextActive: {
    color: colors.active,
  },
  badgeTextCompleted: {
    color: colors.completed,
  },
  date: {
    fontSize: 13,
    color: colors.textMuted,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
    lineHeight: 32,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  actions: {
    gap: 12,
  },
  deleteButton: {
    marginTop: 4,
  },
});
