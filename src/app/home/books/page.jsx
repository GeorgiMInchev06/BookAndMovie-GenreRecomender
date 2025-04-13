export const dynamic = 'force-dynamic';

import Results from '@/components/Results';

const OPEN_LIBRARY_SEARCH_API = 'https://openlibrary.org/search.json';

export default async function BooksPage() {
  const res = await fetch(`${OPEN_LIBRARY_SEARCH_API}?q=bestsellers&limit=20`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const books = data.docs?.filter((b) => b.title) || [];

  return (
    <div className="p-6">
      <Results results={books} type="book" />
    </div>
  );
}
