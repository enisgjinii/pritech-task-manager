import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Button,
  Dialog,
  FAB,
  Portal,
  Searchbar,
  Text,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '../components/EmptyState';
import FilterTabs from '../components/FilterTabs';
import QuoteCard from '../components/QuoteCard';
import TaskCard from '../components/TaskCard';
import {
  AnimatedExit,
  MotionListItem,
  MotionScreen,
  MotionView,
} from '../components/motion';
import { fetchRandomQuote, Quote } from '../services/quoteApi';
import { RootStackParamList, Task, TaskFilter } from '../types/Task';
import {
  deleteTask,
  loadTasks,
  toggleTaskCompletion,
} from '../utils/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskList'>;

const QUOTE_ERROR = 'Could not load quote. Stay productive today.';

export default function TaskListScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const loadQuote = useCallback(async () => {
    setQuoteLoading(true);
    setQuoteError(null);
    try {
      const data = await fetchRandomQuote();
      setQuote(data);
    } catch {
      setQuote(null);
      setQuoteError(QUOTE_ERROR);
    } finally {
      setQuoteLoading(false);
    }
  }, []);

  const refreshTasks = useCallback(async () => {
    const stored = await loadTasks();
    setTasks(stored);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshTasks();
    }, [refreshTasks]),
  );

  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        query.length === 0 || task.title.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'active' && !task.completed) ||
        (activeFilter === 'completed' && task.completed);

      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, activeFilter]);

  const handleToggle = async (taskId: string) => {
    const updated = await toggleTaskCompletion(taskId);
    setTasks(updated);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    const updated = await deleteTask(taskToDelete.id);
    setTasks(updated);
    setTaskToDelete(null);
  };

  const emptyMessage =
    tasks.length === 0
      ? 'No tasks yet. Add your first task to get started.'
      : 'No tasks match your search or filter.';

  return (
    <MotionScreen>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        edges={['bottom']}
      >
        <ScrollView
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <QuoteCard
            quote={quote}
            loading={quoteLoading}
            error={quoteError}
            onRefresh={loadQuote}
          />

          <MotionView variant="fadeInUp" delay={80}>
            <Searchbar
              placeholder="Search tasks by title..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchbar}
              inputStyle={styles.searchInput}
              elevation={1}
            />
          </MotionView>

          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {filteredTasks.length > 0 && (
            <MotionView variant="fadeIn" delay={200}>
              <Text variant="labelMedium" style={styles.resultCount}>
                {filteredTasks.length} task
                {filteredTasks.length !== 1 ? 's' : ''}
              </Text>
            </MotionView>
          )}

          <AnimatedExit>
            {filteredTasks.map((item, index) => (
              <MotionListItem key={item.id} index={index} animationId={item.id}>
                <TaskCard
                  task={item}
                  onPress={() =>
                    navigation.navigate('TaskDetails', { taskId: item.id })
                  }
                  onToggle={() => handleToggle(item.id)}
                  onDelete={() => setTaskToDelete(item)}
                />
              </MotionListItem>
            ))}
          </AnimatedExit>

          {filteredTasks.length === 0 && (
            <EmptyState message={emptyMessage} />
          )}
        </ScrollView>

        <MotionView variant="scaleIn" delay={280} styles={styles.fabWrap}>
          <FAB
            icon="plus"
            style={[styles.fab, { backgroundColor: theme.colors.secondary }]}
            color={theme.colors.onSecondary}
            onPress={() => navigation.navigate('AddTask')}
            accessibilityLabel="Add new task"
          />
        </MotionView>

        <Portal>
          {taskToDelete !== null && (
            <MotionView variant="scaleIn" styles={styles.dialogMotion}>
              <Dialog
                visible
                onDismiss={() => setTaskToDelete(null)}
              >
                <Dialog.Title>Delete Task</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">
                    Are you sure you want to delete this task?
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setTaskToDelete(null)}>Cancel</Button>
                  <Button
                    textColor={theme.colors.error}
                    onPress={handleConfirmDelete}
                  >
                    Delete
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </MotionView>
          )}
        </Portal>
      </SafeAreaView>
    </MotionScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 88,
    flexGrow: 1,
  },
  searchbar: {
    marginBottom: 16,
    borderRadius: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  resultCount: {
    opacity: 0.6,
    marginBottom: 8,
  },
  fabWrap: {
    position: 'absolute',
    right: 20,
    bottom: 24,
  },
  fab: {},
  dialogMotion: {
    flex: 1,
  },
});
