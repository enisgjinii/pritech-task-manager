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

import {
  fetchAdvice,
  fetchCatFact,
  fetchProgrammingJoke,
} from '../api/publicApis';
import ApiWidgetCard from '../components/ApiWidgetCard';
import { StaggerInView } from '../components/motion';
import PrimaryButton from '../components/PrimaryButton';
import StatusBadge from '../components/StatusBadge';
import { colors } from '../constants/colors';
import {
  deleteStoredTask,
  getStoredTasks,
  toggleStoredTask,
} from '../storage/taskStorage';
import { TasksStackParamList, Task } from '../types/task';
import { formatDate } from '../utils/date';

type Nav = NativeStackNavigationProp<TasksStackParamList, 'TaskDetails'>;
type Route = RouteProp<TasksStackParamList, 'TaskDetails'>;

export default function TaskDetailsScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { taskId } = route.params;

  const [task, setTask] = useState<Task | null>(null);

  const [advice, setAdvice] = useState<string | null>(null);
  const [adviceLoading, setAdviceLoading] = useState(true);
  const [adviceError, setAdviceError] = useState<string | null>(null);

  const [joke, setJoke] = useState<string | null>(null);
  const [jokeLoading, setJokeLoading] = useState(true);
  const [jokeError, setJokeError] = useState<string | null>(null);

  const [catFact, setCatFact] = useState<string | null>(null);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState<string | null>(null);

  const loadTask = useCallback(async () => {
    const tasks = await getStoredTasks();
    const found = tasks.find((t) => t.id === taskId) ?? null;
    setTask(found);
    if (!found) navigation.goBack();
  }, [taskId, navigation]);

  const loadAdvice = useCallback(async () => {
    setAdviceLoading(true);
    setAdviceError(null);
    try {
      const data = await fetchAdvice();
      setAdvice(data.advice);
    } catch {
      setAdviceError('Could not load advice right now. Please try again.');
    } finally {
      setAdviceLoading(false);
    }
  }, []);

  const loadJoke = useCallback(async () => {
    setJokeLoading(true);
    setJokeError(null);
    try {
      const data = await fetchProgrammingJoke();
      setJoke(data.joke);
    } catch {
      setJokeError('Could not load joke right now. Please try again.');
    } finally {
      setJokeLoading(false);
    }
  }, []);

  const loadCatFact = useCallback(async () => {
    setCatLoading(true);
    setCatError(null);
    try {
      const data = await fetchCatFact();
      setCatFact(data.fact);
    } catch {
      setCatError('Could not load cat fact right now. Please try again.');
    } finally {
      setCatLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTask();
      loadAdvice();
      loadJoke();
      loadCatFact();
    }, [loadTask, loadAdvice, loadJoke, loadCatFact]),
  );

  const handleToggle = async () => {
    if (!task) return;
    await toggleStoredTask(task.id);
    await loadTask();
  };

  const handleDelete = () => {
    if (!task) return;
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteStoredTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <StaggerInView index={0}>
        <View style={styles.card}>
          <View style={styles.row}>
            <StatusBadge completed={task.completed} />
            <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
          </View>
          <Text style={[styles.title, task.completed && styles.titleDone]}>
            {task.title}
          </Text>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
          {task.owner ? (
            <Text style={styles.owner}>
              Owner: {task.owner.name} ({task.owner.email})
            </Text>
          ) : null}
        </View>
        </StaggerInView>

        <StaggerInView index={1}>
        <PrimaryButton
          title={task.completed ? 'Mark as Not Completed' : 'Mark as Completed'}
          variant={task.completed ? 'outline' : 'secondary'}
          onPress={handleToggle}
        />
        <PrimaryButton title="Delete Task" variant="danger" onPress={handleDelete} />
        </StaggerInView>

        <ApiWidgetCard
          title="Productivity Advice"
          subtitle="Advice Slip API"
          loading={adviceLoading}
          error={adviceError}
          onRefresh={loadAdvice}
          animationIndex={2}
        >
          <Text style={styles.helperText}>{advice}</Text>
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Programming Joke"
          subtitle="JokeAPI"
          loading={jokeLoading}
          error={jokeError}
          onRefresh={loadJoke}
          animationIndex={3}
        >
          <Text style={styles.helperText}>{joke}</Text>
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Random Cat Fact"
          subtitle="Cat Facts API"
          loading={catLoading}
          error={catError}
          onRefresh={loadCatFact}
          animationIndex={4}
        >
          <Text style={styles.helperText}>{catFact}</Text>
        </ApiWidgetCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loading: { textAlign: 'center', marginTop: 40, color: colors.textSecondary },
  content: { padding: 16, gap: 12 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: { fontSize: 13, color: colors.textMuted },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 32,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  description: { fontSize: 16, color: colors.text, lineHeight: 24 },
  owner: { marginTop: 12, fontSize: 13, color: colors.accent },
  helperText: { fontSize: 14, color: colors.text, lineHeight: 22 },
});
