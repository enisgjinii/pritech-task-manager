import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '../components/EmptyState';
import FilterTabs from '../components/FilterTabs';
import QuoteCard from '../components/QuoteCard';
import TaskCard from '../components/TaskCard';
import { colors } from '../constants/colors';
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
  const navigation = useNavigation<NavigationProp>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState<string | null>(null);

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

  const handleDelete = (task: Task) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = await deleteTask(task.id);
            setTasks(updated);
          },
        },
      ],
    );
  };

  const emptyMessage =
    tasks.length === 0
      ? 'No tasks yet. Add your first task to get started.'
      : 'No tasks match your search or filter.';

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
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

            <View style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={18}
                color={colors.textMuted}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search tasks by title..."
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  accessibilityLabel="Clear search"
                >
                  <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>

            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {filteredTasks.length > 0 && (
              <Text style={styles.resultCount}>
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
            onDelete={() => handleDelete(item)}
          />
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
        activeOpacity={0.85}
        accessibilityLabel="Add new task"
      >
        <Ionicons name="add" size={28} color={colors.surface} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 88,
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  resultCount: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
