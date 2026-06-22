import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Dialog,
  FAB,
  Portal,
  Searchbar,
  Text,
  Button,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '../components/EmptyState';
import FilterTabs from '../components/FilterTabs';
import QuoteCard from '../components/QuoteCard';
import TaskCard from '../components/TaskCard';
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['bottom']}
    >
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <QuoteCard
              quote={quote}
              loading={quoteLoading}
              error={quoteError}
              onRefresh={loadQuote}
            />

            <Searchbar
              placeholder="Search tasks by title..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchbar}
              inputStyle={styles.searchInput}
              elevation={1}
            />

            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {filteredTasks.length > 0 && (
              <Text variant="labelMedium" style={styles.resultCount}>
                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={<EmptyState message={emptyMessage} />}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() =>
              navigation.navigate('TaskDetails', { taskId: item.id })
            }
            onToggle={() => handleToggle(item.id)}
            onDelete={() => setTaskToDelete(item)}
          />
        )}
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.secondary }]}
        color={theme.colors.onSecondary}
        onPress={() => navigation.navigate('AddTask')}
        accessibilityLabel="Add new task"
      />

      <Portal>
        <Dialog visible={taskToDelete !== null} onDismiss={() => setTaskToDelete(null)}>
          <Dialog.Title>Delete Task</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to delete this task?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setTaskToDelete(null)}>Cancel</Button>
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
  },
});
