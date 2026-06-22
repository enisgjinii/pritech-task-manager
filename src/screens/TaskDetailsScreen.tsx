import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Dialog,
  Icon,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailsRouteProp>();
  const { taskId } = route.params;

  const [task, setTask] = useState<Task | null>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);

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

  const handleConfirmDelete = async () => {
    if (!task) return;
    await deleteTask(task.id);
    setDeleteVisible(false);
    navigation.goBack();
  };

  if (!task) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating color={theme.colors.primary} />
          <Text variant="bodyLarge" style={styles.loadingText}>
            Loading...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['bottom']}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Card mode="elevated" style={styles.card}>
          <Card.Content>
            <View style={styles.statusRow}>
              <Chip
                compact
                mode="flat"
                style={[
                  styles.chip,
                  task.completed ? styles.chipCompleted : styles.chipActive,
                ]}
                textStyle={{
                  color: task.completed ? theme.colors.tertiary : theme.colors.secondary,
                  fontWeight: '600',
                  fontSize: 12,
                }}
              >
                {task.completed ? 'Completed' : 'Active'}
              </Chip>
              <View style={styles.dateRow}>
                <Icon source="calendar-outline" size={14} color={theme.colors.onSurfaceVariant} />
                <Text variant="labelMedium" style={styles.date}>
                  {formatDate(task.createdAt)}
                </Text>
              </View>
            </View>

            <Text
              variant="headlineSmall"
              style={[styles.title, task.completed && styles.titleCompleted]}
            >
              {task.title}
            </Text>

            <Text variant="labelMedium" style={styles.sectionLabel}>
              Description
            </Text>
            <Text variant="bodyLarge" style={styles.description}>
              {task.description}
            </Text>
          </Card.Content>
        </Card>

        <Button
          mode={task.completed ? 'outlined' : 'contained-tonal'}
          onPress={handleToggle}
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon={task.completed ? 'checkbox-blank-outline' : 'check-circle-outline'}
        >
          {task.completed ? 'Mark as Not Completed' : 'Mark as Completed'}
        </Button>

        <Button
          mode="contained"
          buttonColor={theme.colors.error}
          textColor={theme.colors.onError}
          onPress={() => setDeleteVisible(true)}
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon="delete-outline"
        >
          Delete Task
        </Button>
      </ScrollView>

      <Portal>
        <Dialog visible={deleteVisible} onDismiss={() => setDeleteVisible(false)}>
          <Dialog.Title>Delete Task</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to delete this task?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteVisible(false)}>Cancel</Button>
            <Button textColor={theme.colors.error} onPress={handleConfirmDelete}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    opacity: 0.6,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  card: {
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chip: {
    height: 28,
  },
  chipActive: {
    backgroundColor: '#E0F7F6',
  },
  chipCompleted: {
    backgroundColor: '#DCFCE7',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  date: {
    opacity: 0.6,
  },
  title: {
    fontWeight: '700',
    marginBottom: 20,
    lineHeight: 32,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  sectionLabel: {
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  description: {
    lineHeight: 24,
  },
  button: {
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 6,
  },
});
