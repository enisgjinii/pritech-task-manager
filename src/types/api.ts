export type DummyTodo = { id: number; todo: string; completed: boolean };
export type JsonPlaceholderTodo = { id: number; title: string; completed: boolean };

export type RandomUser = {
  name: string;
  email: string;
  avatar: string;
};

export type WeatherData = {
  temperature: number;
  windspeed: number;
  weathercode: number;
};

export type PublicHoliday = {
  date: string;
  localName: string;
  name: string;
};

export type PokemonReward = {
  name: string;
  sprite: string;
  height: number;
  weight: number;
};

export type OpenLibraryBook = {
  title: string;
  author?: string;
  year?: string;
};

export type CatFact = { fact: string };

export type Advice = { advice: string };

export type ProgrammingJoke = { joke: string };

export type TriviaQuestion = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};

export type MealIdea = {
  name: string;
  category: string;
  area: string;
  image: string;
};

export type CryptoPrices = {
  bitcoin: number;
  ethereum: number;
};

export type ISSLocation = {
  latitude: number;
  longitude: number;
  timestamp: number;
};
