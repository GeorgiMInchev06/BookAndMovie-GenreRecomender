export const dynamic = 'force-dynamic';

import Results from '@/components/Results';
import Link from 'next/link';

const OPEN_LIBRARY_SEARCH_API = 'https://openlibrary.org/search.json';

export default async function BooksPage({ searchParams }) {
  const query = searchParams.q || 'bestsellers';
  const language = searchParams.language;
  const subject = searchParams.subject;
  const author = searchParams.author;
  const sort = searchParams.sortBy; // "new"

  const urlParams = new URLSearchParams({ q: query, limit: '20' });

  if (language) urlParams.append('language', language);
  if (subject) urlParams.append('subject', subject);
  if (author) urlParams.append('author', author);
  if (sort === 'new') urlParams.append('sort', 'new');

  const url = `${OPEN_LIBRARY_SEARCH_API}?${urlParams.toString()}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch books');

    const data = await res.json();
    const books = data.docs?.filter((b) => b.title) || [];

    // 🎯 Active filter tags
    const activeFilters = [];

    if (query && query !== 'bestsellers') activeFilters.push({ label: `🔍 ${query}`, param: 'q' });
    if (language) activeFilters.push({ label: `🌐 ${language}`, param: 'language' });
    if (subject) activeFilters.push({ label: `📚 ${subject}`, param: 'subject' });
    if (author) activeFilters.push({ label: `✍️ ${author}`, param: 'author' });
    if (sort === 'new') activeFilters.push({ label: '🆕 Newest', param: 'sortBy' });

    const clearFiltersUrl = '/home/books';

    return (
      <div className="px-4 sm:px-6 py-4">
        {/* 🎯 Active Tags */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 items-center justify-start">
            {activeFilters.map((filter, i) => (
              <span
                key={i}
                className="inline-flex items-center bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-purple-900 dark:text-purple-300"
              >
                {filter.label}
              </span>
            ))}
            <Link href={clearFiltersUrl} className="ml-2 text-sm font-medium text-red-600 hover:underline">
              Clear All
            </Link>
          </div>
        )}

        <Results results={books} type="book" />
      </div>
    );
  } catch (error) {
    console.error('📕 Error fetching books:', error);
    return <div className="p-6 text-center text-red-600">⚠️ Could not fetch books data. Try again later.</div>;
  }
}
