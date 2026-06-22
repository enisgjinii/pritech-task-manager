export interface Quote {
  content: string;
  author: string;
}

const QUOTE_API_URL = 'https://api.quotable.io/random';

export async function fetchRandomQuote(): Promise<Quote> {
  const response = await fetch(QUOTE_API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch quote');
  }

  const data = (await response.json()) as { content?: string; author?: string };

  if (!data.content || !data.author) {
    throw new Error('Invalid quote response');
  }

  return {
    content: data.content,
    author: data.author,
  };
}
