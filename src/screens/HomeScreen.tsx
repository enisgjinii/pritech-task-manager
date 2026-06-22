import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  fetchAdvice,
  fetchPokemonReward,
  fetchProgrammingJoke,
  fetchRandomDogImage,
  fetchWeather,
  weatherCodeLabel,
} from '../api/publicApis';
import ApiWidgetCard from '../components/ApiWidgetCard';
import EmptyState from '../components/EmptyState';
import { FadeInView, ScaleInView } from '../components/motion';
import TaskCard from '../components/TaskCard';
import { colors } from '../constants/colors';
import {
  getStoredTasks,
  toggleStoredTask,
  deleteStoredTask,
} from '../storage/taskStorage';
import { TasksStackParamList, Task, TaskFilter } from '../types/task';

type Nav = NativeStackNavigationProp<TasksStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');

  const [advice, setAdvice] = useState<string | null>(null);
  const [adviceLoading, setAdviceLoading] = useState(true);
  const [adviceError, setAdviceError] = useState<string | null>(null);

  const [weather, setWeather] = useState<string | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const [rewardVisible, setRewardVisible] = useState(false);
  const [rewardText, setRewardText] = useState('');
  const [rewardImage, setRewardImage] = useState<string | null>(null);
  const [pokemonSprite, setPokemonSprite] = useState<string | null>(null);

  const loadAdvice = useCallback(async () => {
    setAdviceLoading(true);
    setAdviceError(null);
    try {
      const data = await fetchAdvice();
      setAdvice(data.advice);
    } catch {
      setAdvice(null);
      setAdviceError('Could not load advice right now. Please try again.');
    } finally {
      setAdviceLoading(false);
    }
  }, []);

  const loadWeather = useCallback(async () => {
    setWeatherLoading(true);
    setWeatherError(null);
    try {
      const data = await fetchWeather();
      setWeather(
        `${data.temperature}°C · Wind ${data.windspeed} km/h · ${weatherCodeLabel(data.weathercode)}`,
      );
    } catch {
      setWeather(null);
      setWeatherError('Could not load weather right now. Please try again.');
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  const refreshTasks = useCallback(async () => {
    setTasks(await getStoredTasks());
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshTasks();
    }, [refreshTasks]),
  );

  useEffect(() => {
    loadAdvice();
    loadWeather();
  }, [loadAdvice, loadWeather]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchSearch = !q || task.title.toLowerCase().includes(q);
      const matchFilter =
        filter === 'all' ||
        (filter === 'active' && !task.completed) ||
        (filter === 'completed' && task.completed);
      return matchSearch && matchFilter;
    });
  }, [tasks, search, filter]);

  const showCompletionReward = async (taskTitle: string) => {
    try {
      const [pokemon, dog, joke] = await Promise.allSettled([
        fetchPokemonReward(),
        fetchRandomDogImage(),
        fetchProgrammingJoke(),
      ]);

      let message = `Great job completing "${taskTitle}"!`;

      if (pokemon.status === 'fulfilled') {
        setPokemonSprite(pokemon.value.sprite);
        message += `\n\nReward unlocked: ${pokemon.value.name}`;
      }
      if (joke.status === 'fulfilled') {
        message += `\n\n${joke.value.joke}`;
      }

      setRewardText(message);
      setRewardImage(dog.status === 'fulfilled' ? dog.value : null);
      setRewardVisible(true);
    } catch {
      Alert.alert('Task completed', `You completed "${taskTitle}". Keep going!`);
    }
  };

  const handleToggle = async (task: Task) => {
    const wasCompleted = task.completed;
    const updated = await toggleStoredTask(task.id);
    setTasks(updated);
    if (!wasCompleted) {
      const nowCompleted = updated.find((t) => t.id === task.id)?.completed;
      if (nowCompleted) await showCompletionReward(task.title);
    }
  };

  const handleDelete = async (taskId: string) => {
    setTasks(await deleteStoredTask(taskId));
  };

  const filters: { key: TaskFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <FadeInView>
              <Text style={styles.heading}>My Tasks</Text>
            </FadeInView>

            <ApiWidgetCard
              title="Daily Productivity Advice"
              subtitle="Advice Slip API"
              loading={adviceLoading}
              error={adviceError}
              onRefresh={loadAdvice}
              animationIndex={0}
            >
              <Text style={styles.widgetText}>{advice}</Text>
            </ApiWidgetCard>

            <ApiWidgetCard
              title="Today's Working Weather"
              subtitle="Open-Meteo API"
              loading={weatherLoading}
              error={weatherError}
              onRefresh={loadWeather}
              animationIndex={1}
            >
              <Text style={styles.widgetText}>{weather}</Text>
            </ApiWidgetCard>

            <FadeInView delay={120}>
            <TextInput
              style={styles.search}
              placeholder="Search tasks by title..."
              placeholderTextColor={colors.textMuted}
              value={search}
              onChangeText={setSearch}
            />
            </FadeInView>

            <FadeInView delay={160}>
            <View style={styles.filterRow}>
              {filters.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.filterBtn,
                    filter === item.key && styles.filterBtnActive,
                  ]}
                  onPress={() => setFilter(item.key)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filter === item.key && styles.filterTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            </FadeInView>

            {filtered.length > 0 ? (
              <Text style={styles.count}>
                {filtered.length} task{filtered.length !== 1 ? 's' : ''}
              </Text>
            ) : null}
          </>
        }
        ListEmptyComponent={
          <EmptyState
            message={
              tasks.length === 0
                ? 'No tasks yet. Add your first task to get started.'
                : search.trim()
                  ? `No tasks match "${search.trim()}".`
                  : 'No tasks match the selected filter.'
            }
          />
        }
        renderItem={({ item, index }) => (
          <TaskCard
            task={item}
            animationIndex={index}
            onPress={() =>
              navigation.navigate('TaskDetails', { taskId: item.id })
            }
            onToggle={() => handleToggle(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />

      <Modal visible={rewardVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <ScaleInView style={styles.modalCard}>
            <Text style={styles.modalTitle}>Task Completed!</Text>
            {pokemonSprite ? (
              <Image source={{ uri: pokemonSprite }} style={styles.pokemon} />
            ) : null}
            {rewardImage ? (
              <Image source={{ uri: rewardImage }} style={styles.dogImage} />
            ) : null}
            <Text style={styles.modalBody}>{rewardText}</Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setRewardVisible(false)}
            >
              <Text style={styles.modalBtnText}>Nice!</Text>
            </TouchableOpacity>
          </ScaleInView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingBottom: 24 },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  widgetText: { fontSize: 14, color: colors.text, lineHeight: 22 },
  search: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  filterBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  filterBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
  filterTextActive: { color: '#FFFFFF' },
  count: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  pokemon: { width: 96, height: 96, marginBottom: 8 },
  dogImage: { width: '100%', height: 160, borderRadius: 10, marginBottom: 12 },
  modalBody: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  modalBtnText: { color: '#FFF', fontWeight: '600' },
});
