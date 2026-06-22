import {
  HOLIDAY_COUNTRY_CODE,
  HOLIDAY_YEAR,
  OPEN_LIBRARY_QUERY,
  WEATHER_LATITUDE,
  WEATHER_LONGITUDE,
} from '../constants/config';
import type {
  Advice,
  CatFact,
  CryptoPrices,
  DummyTodo,
  ISSLocation,
  JsonPlaceholderTodo,
  MealIdea,
  OpenLibraryBook,
  PokemonReward,
  ProgrammingJoke,
  PublicHoliday,
  RandomUser,
  TriviaQuestion,
  WeatherData,
} from '../types/api';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function fetchDummyTodos(): Promise<DummyTodo[]> {
  const data = await fetchJson<{ todos: DummyTodo[] }>(
    'https://dummyjson.com/todos?limit=10',
  );
  if (!Array.isArray(data.todos)) throw new Error('Invalid DummyJSON response');
  return data.todos;
}

export async function fetchJsonPlaceholderTodos(): Promise<JsonPlaceholderTodo[]> {
  const data = await fetchJson<JsonPlaceholderTodo[]>(
    'https://jsonplaceholder.typicode.com/todos?_limit=10',
  );
  if (!Array.isArray(data)) throw new Error('Invalid JSONPlaceholder response');
  return data;
}

export async function fetchRandomUsers(): Promise<RandomUser[]> {
  const data = await fetchJson<{
    results: {
      name: { first: string; last: string };
      email: string;
      picture: { thumbnail: string };
    }[];
  }>('https://randomuser.me/api/?results=5');

  return data.results.map((user) => ({
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    avatar: user.picture.thumbnail,
  }));
}

export async function fetchWeather(): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LATITUDE}&longitude=${WEATHER_LONGITUDE}&current_weather=true`;
  const data = await fetchJson<{
    current_weather: WeatherData;
  }>(url);

  if (!data.current_weather) throw new Error('Weather data unavailable');
  return data.current_weather;
}

export async function fetchPublicHolidays(): Promise<PublicHoliday[]> {
  const data = await fetchJson<PublicHoliday[]>(
    `https://date.nager.at/api/v3/PublicHolidays/${HOLIDAY_YEAR}/${HOLIDAY_COUNTRY_CODE}`,
  );
  if (!Array.isArray(data)) throw new Error('Invalid holidays response');
  return data;
}

export async function fetchPokemonReward(): Promise<PokemonReward> {
  const data = await fetchJson<{
    name: string;
    sprites: { front_default: string };
    height: number;
    weight: number;
  }>('https://pokeapi.co/api/v2/pokemon/pikachu');

  return {
    name: data.name,
    sprite: data.sprites.front_default,
    height: data.height,
    weight: data.weight,
  };
}

export async function fetchOpenLibraryBooks(): Promise<OpenLibraryBook[]> {
  const data = await fetchJson<{
    docs: {
      title?: string;
      author_name?: string[];
      first_publish_year?: number;
    }[];
  }>(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(OPEN_LIBRARY_QUERY)}&limit=3`,
  );

  return (data.docs ?? []).slice(0, 3).map((book) => ({
    title: book.title ?? 'Untitled',
    author: book.author_name?.[0],
    year: book.first_publish_year?.toString(),
  }));
}

export async function fetchRandomDogImage(): Promise<string> {
  const data = await fetchJson<{ message: string; status: string }>(
    'https://dog.ceo/api/breeds/image/random',
  );
  if (data.status !== 'success' || !data.message) {
    throw new Error('Could not load dog image');
  }
  return data.message;
}

export async function fetchCatFact(): Promise<CatFact> {
  const data = await fetchJson<{ fact: string }>('https://catfact.ninja/fact');
  if (!data.fact) throw new Error('Could not load cat fact');
  return { fact: data.fact };
}

export async function fetchAdvice(): Promise<Advice> {
  const data = await fetchJson<{ slip: { advice: string } }>(
    'https://api.adviceslip.com/advice',
  );
  if (!data.slip?.advice) throw new Error('Could not load advice');
  return { advice: data.slip.advice };
}

export async function fetchProgrammingJoke(): Promise<ProgrammingJoke> {
  const data = await fetchJson<{
    error?: boolean;
    type?: string;
    joke?: string;
    setup?: string;
    delivery?: string;
  }>('https://v2.jokeapi.dev/joke/Programming?type=single');

  if (data.error) throw new Error('Joke unavailable');
  if (data.joke) return { joke: data.joke };
  if (data.setup && data.delivery) {
    return { joke: `${data.setup} ${data.delivery}` };
  }
  throw new Error('No joke found');
}

export async function fetchTrivia(): Promise<TriviaQuestion> {
  const data = await fetchJson<{
    response_code: number;
    results: {
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
    }[];
  }>('https://opentdb.com/api.php?amount=5&type=multiple');

  const item = data.results?.[0];
  if (!item) throw new Error('No trivia available');

  return {
    question: item.question,
    correctAnswer: item.correct_answer,
    incorrectAnswers: item.incorrect_answers,
  };
}

export async function fetchRandomMeal(): Promise<MealIdea> {
  const data = await fetchJson<{
    meals: {
      strMeal: string;
      strCategory: string;
      strArea: string;
      strMealThumb: string;
    }[];
  }>('https://www.themealdb.com/api/json/v1/1/random.php');

  const meal = data.meals?.[0];
  if (!meal) throw new Error('No meal found');

  return {
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    image: meal.strMealThumb,
  };
}

export async function fetchCryptoPrices(): Promise<CryptoPrices> {
  const data = await fetchJson<{
    bitcoin?: { usd?: number };
    ethereum?: { usd?: number };
  }>(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd',
  );

  const bitcoin = data.bitcoin?.usd;
  const ethereum = data.ethereum?.usd;
  if (bitcoin == null || ethereum == null) {
    throw new Error('Crypto prices unavailable');
  }

  return { bitcoin, ethereum };
}

export async function fetchISSLocation(): Promise<ISSLocation> {
  try {
    const data = await fetchJson<{
      iss_position: { latitude: string; longitude: string };
      timestamp: number;
    }>('http://api.open-notify.org/iss-now.json');

    return {
      latitude: parseFloat(data.iss_position.latitude),
      longitude: parseFloat(data.iss_position.longitude),
      timestamp: data.timestamp,
    };
  } catch {
    throw new Error('ISS data could not be loaded on this device.');
  }
}

export function weatherCodeLabel(code: number): string {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 67) return 'Rainy';
  if (code <= 77) return 'Snowy';
  if (code <= 82) return 'Rain showers';
  return 'Stormy';
}
