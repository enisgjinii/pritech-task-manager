import { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import {
  fetchAdvice,
  fetchCatFact,
  fetchCryptoPrices,
  fetchDummyTodos,
  fetchISSLocation,
  fetchJsonPlaceholderTodos,
  fetchOpenLibraryBooks,
  fetchPokemonReward,
  fetchProgrammingJoke,
  fetchPublicHolidays,
  fetchRandomDogImage,
  fetchRandomMeal,
  fetchRandomUsers,
  fetchTrivia,
  fetchWeather,
  weatherCodeLabel,
} from '../api/publicApis';
import ApiWidgetCard from '../components/ApiWidgetCard';
import { FadeInView } from '../components/motion';
import ScreenHeader from '../components/ScreenHeader';
import { colors } from '../constants/colors';
import { addStoredTask, mergeImportedTasks } from '../storage/taskStorage';
import { TabParamList, Task } from '../types/task';
import { decodeHtml, generateId } from '../utils/date';

type Nav = BottomTabNavigationProp<TabParamList, 'ApiHub'>;

function useApiCard<T>(loader: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await loader());
    } catch (e) {
      setData(null);
      setError(
        e instanceof Error
          ? e.message
          : 'Could not load data right now. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, reload };
}

export default function ApiHubScreen() {
  const navigation = useNavigation<Nav>();
  const [showAnswer, setShowAnswer] = useState(false);
  const [importMessage, setImportMessage] = useState<string | null>(null);

  const dummy = useApiCard(fetchDummyTodos);
  const placeholder = useApiCard(fetchJsonPlaceholderTodos);
  const users = useApiCard(fetchRandomUsers);
  const weather = useApiCard(fetchWeather);
  const holidays = useApiCard(fetchPublicHolidays);
  const pokemon = useApiCard(fetchPokemonReward);
  const books = useApiCard(fetchOpenLibraryBooks);
  const dog = useApiCard(fetchRandomDogImage);
  const cat = useApiCard(fetchCatFact);
  const advice = useApiCard(fetchAdvice);
  const joke = useApiCard(fetchProgrammingJoke);
  const trivia = useApiCard(fetchTrivia);
  const meal = useApiCard(fetchRandomMeal);
  const crypto = useApiCard(fetchCryptoPrices);
  const iss = useApiCard(fetchISSLocation);

  const importDummy = async () => {
    if (!dummy.data) return;
    const imported: Task[] = dummy.data.map((item) => ({
      id: `dummy-${item.id}`,
      title: item.todo,
      description: 'Imported from DummyJSON public API',
      completed: item.completed,
      createdAt: new Date().toISOString(),
      source: 'dummyjson',
    }));
    await mergeImportedTasks(imported);
    setImportMessage(`Imported ${imported.length} DummyJSON tasks.`);
  };

  const importPlaceholder = async () => {
    if (!placeholder.data) return;
    const imported: Task[] = placeholder.data.map((item) => ({
      id: `placeholder-${item.id}`,
      title: item.title,
      description: 'Imported from JSONPlaceholder public API',
      completed: item.completed,
      createdAt: new Date().toISOString(),
      source: 'jsonplaceholder',
    }));
    await mergeImportedTasks(imported);
    setImportMessage(`Imported ${imported.length} JSONPlaceholder tasks.`);
  };

  const createHolidayTask = async (name: string, date: string) => {
    await addStoredTask({
      id: generateId(),
      title: `Prepare for ${name}`,
      description: `Public holiday on ${date}`,
      completed: false,
      createdAt: new Date().toISOString(),
      source: 'holiday',
    });
    setImportMessage(`Created holiday task for ${name}.`);
  };

  const createBookTask = async (title: string) => {
    await addStoredTask({
      id: generateId(),
      title: `Read: ${title}`,
      description: 'Book suggestion from Open Library.',
      completed: false,
      createdAt: new Date().toISOString(),
      source: 'book',
    });
    setImportMessage(`Created reading task for "${title}".`);
  };

  const createMealTask = async (name: string) => {
    await addStoredTask({
      id: generateId(),
      title: `Try meal: ${name}`,
      description: 'Meal idea from TheMealDB.',
      completed: false,
      createdAt: new Date().toISOString(),
      source: 'meal',
    });
    setImportMessage(`Created meal task for "${name}".`);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Public API Hub" />
      <ScrollView contentContainerStyle={styles.content}>
        <FadeInView>
        <Text style={styles.subheading}>
          Explore all free APIs used in this app. Each card loads independently.
        </Text>
        </FadeInView>

        {importMessage ? (
          <FadeInView delay={80}>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>{importMessage}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tasks')}>
              <Text style={styles.bannerLink}>View tasks</Text>
            </TouchableOpacity>
          </View>
          </FadeInView>
        ) : null}

        <ApiWidgetCard
          title="DummyJSON Todos"
          subtitle="Starter task import"
          loading={dummy.loading}
          error={dummy.error}
          onRefresh={dummy.reload}
          actionLabel="Import DummyJSON Tasks"
          onAction={importDummy}
          animationIndex={0}
        >
          {dummy.data?.slice(0, 3).map((item) => (
            <Text key={item.id} style={styles.line}>
              • {item.todo}
            </Text>
          ))}
        </ApiWidgetCard>

        <ApiWidgetCard
          title="JSONPlaceholder Todos"
          subtitle="Alternative starter import"
          loading={placeholder.loading}
          error={placeholder.error}
          onRefresh={placeholder.reload}
          actionLabel="Import JSONPlaceholder Tasks"
          onAction={importPlaceholder}
          animationIndex={1}
        >
          {placeholder.data?.slice(0, 3).map((item) => (
            <Text key={item.id} style={styles.line}>
              • {item.title}
            </Text>
          ))}
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Suggested People"
          subtitle="Random User API"
          loading={users.loading}
          error={users.error}
          onRefresh={users.reload}
          animationIndex={2}
        >
          {users.data?.map((user) => (
            <View key={user.email} style={styles.personRow}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.personName}>{user.name}</Text>
                <Text style={styles.personEmail}>{user.email}</Text>
              </View>
            </View>
          ))}
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Working Weather"
          subtitle="Open-Meteo API"
          loading={weather.loading}
          error={weather.error}
          onRefresh={weather.reload}
          animationIndex={3}
        >
          {weather.data ? (
            <Text style={styles.line}>
              {weather.data.temperature}°C · Wind {weather.data.windspeed} km/h ·{' '}
              {weatherCodeLabel(weather.data.weathercode)}
            </Text>
          ) : null}
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Holiday Reminder"
          subtitle="Nager.Date API"
          loading={holidays.loading}
          error={holidays.error}
          onRefresh={holidays.reload}
          animationIndex={4}
        >
          {holidays.data?.slice(0, 4).map((holiday) => (
            <View key={holiday.date + holiday.name} style={styles.actionRow}>
              <Text style={styles.line}>
                {holiday.localName} — {holiday.date}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  createHolidayTask(holiday.localName, holiday.date)
                }
              >
                <Text style={styles.link}>Create task</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Pokémon Reward"
          subtitle="PokéAPI"
          loading={pokemon.loading}
          error={pokemon.error}
          onRefresh={pokemon.reload}
          animationIndex={5}
        >
          {pokemon.data ? (
            <>
              <Image source={{ uri: pokemon.data.sprite }} style={styles.pokemon} />
              <Text style={styles.line}>
                {pokemon.data.name} · H {pokemon.data.height} · W{' '}
                {pokemon.data.weight}
              </Text>
            </>
          ) : null}
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Learning Suggestions"
          subtitle="Open Library API"
          loading={books.loading}
          error={books.error}
          onRefresh={books.reload}
          animationIndex={6}
        >
          {books.data?.map((book) => (
            <View key={book.title} style={styles.actionRow}>
              <Text style={styles.line}>
                {book.title}
                {book.author ? ` — ${book.author}` : ''}
              </Text>
              <TouchableOpacity onPress={() => createBookTask(book.title)}>
                <Text style={styles.link}>Create task</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Motivational Dog"
          subtitle="Dog CEO API"
          loading={dog.loading}
          error={dog.error}
          onRefresh={dog.reload}
          animationIndex={7}
        >
          {dog.data ? (
            <Image source={{ uri: dog.data }} style={styles.dogImage} />
          ) : null}
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Cat Fact"
          subtitle="Cat Facts API"
          loading={cat.loading}
          error={cat.error}
          onRefresh={cat.reload}
          animationIndex={8}
        >
          <Text style={styles.line}>{cat.data?.fact}</Text>
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Daily Advice"
          subtitle="Advice Slip API"
          loading={advice.loading}
          error={advice.error}
          onRefresh={advice.reload}
          animationIndex={9}
        >
          <Text style={styles.line}>{advice.data?.advice}</Text>
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Programming Joke"
          subtitle="JokeAPI"
          loading={joke.loading}
          error={joke.error}
          onRefresh={joke.reload}
          animationIndex={10}
        >
          <Text style={styles.line}>{joke.data?.joke}</Text>
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Quick Brain Break"
          subtitle="Open Trivia DB"
          loading={trivia.loading}
          error={trivia.error}
          onRefresh={() => {
            setShowAnswer(false);
            trivia.reload();
          }}
          animationIndex={11}
        >
          {trivia.data ? (
            <>
              <Text style={styles.line}>
                {decodeHtml(trivia.data.question)}
              </Text>
              {trivia.data.incorrectAnswers.map((answer) => (
                <Text key={answer} style={styles.answer}>
                  • {decodeHtml(answer)}
                </Text>
              ))}
              {showAnswer ? (
                <Text style={styles.correct}>
                  Answer: {decodeHtml(trivia.data.correctAnswer)}
                </Text>
              ) : (
                <TouchableOpacity onPress={() => setShowAnswer(true)}>
                  <Text style={styles.link}>Show Answer</Text>
                </TouchableOpacity>
              )}
            </>
          ) : null}
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Meal Break Idea"
          subtitle="TheMealDB"
          loading={meal.loading}
          error={meal.error}
          onRefresh={meal.reload}
          actionLabel={
            meal.data ? `Create task: ${meal.data.name}` : undefined
          }
          onAction={
            meal.data ? () => createMealTask(meal.data!.name) : undefined
          }
          animationIndex={12}
        >
          {meal.data ? (
            <>
              <Image source={{ uri: meal.data.image }} style={styles.mealImage} />
              <Text style={styles.line}>
                {meal.data.name} · {meal.data.category} · {meal.data.area}
              </Text>
            </>
          ) : null}
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Market Watch"
          subtitle="CoinGecko API"
          loading={crypto.loading}
          error={crypto.error}
          onRefresh={crypto.reload}
          animationIndex={13}
        >
          {crypto.data ? (
            <Text style={styles.line}>
              BTC ${crypto.data.bitcoin.toLocaleString()} · ETH $
              {crypto.data.ethereum.toLocaleString()}
            </Text>
          ) : null}
        </ApiWidgetCard>

        <ApiWidgetCard
          title="Fun Space Status"
          subtitle="Open Notify ISS API"
          loading={iss.loading}
          error={iss.error}
          onRefresh={iss.reload}
          animationIndex={14}
        >
          {iss.data ? (
            <Text style={styles.line}>
              Lat {iss.data.latitude.toFixed(2)} · Lon{' '}
              {iss.data.longitude.toFixed(2)}
            </Text>
          ) : null}
        </ApiWidgetCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32 },
  subheading: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  banner: {
    backgroundColor: colors.accentLight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  bannerText: { color: colors.text, marginBottom: 6 },
  bannerLink: { color: colors.accent, fontWeight: '600' },
  line: { fontSize: 14, color: colors.text, lineHeight: 22, marginBottom: 4 },
  answer: { fontSize: 13, color: colors.textSecondary, marginLeft: 4 },
  correct: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
  },
  link: { color: colors.accent, fontWeight: '600', fontSize: 13 },
  actionRow: {
    marginBottom: 8,
    gap: 4,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  personName: { fontSize: 14, fontWeight: '600', color: colors.text },
  personEmail: { fontSize: 12, color: colors.textSecondary },
  pokemon: { width: 80, height: 80, marginBottom: 8 },
  dogImage: { width: '100%', height: 160, borderRadius: 10 },
  mealImage: { width: '100%', height: 140, borderRadius: 10, marginBottom: 8 },
});
