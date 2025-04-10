import Results from '@/components/Results';
import Link from 'next/link';

const NEXT_PUBLIC_MOVIES_API_KEY = process.env.NEXT_PUBLIC_MOVIES_API_KEY;

export default async function MoviesPage({ searchParams }) {
  // Read filters from search params
  const genre = searchParams.genre;
  const minRating = searchParams.minRating;
  const actorName = searchParams.actor;
  const certification = searchParams.certification;

  let actorId = null;

  // 🔍 Convert actor name → TMDB ID
  if (actorName) {
    const actorSearchRes = await fetch(
      `https://api.themoviedb.org/3/search/person?api_key=${NEXT_PUBLIC_MOVIES_API_KEY}&query=${encodeURIComponent(actorName)}`
    );
    if (actorSearchRes.ok) {
      const actorData = await actorSearchRes.json();
      actorId = actorData.results?.[0]?.id;
    }
  }

  // 🛠️ Build query for Discover API
  const queryParams = new URLSearchParams({
    api_key: NEXT_PUBLIC_MOVIES_API_KEY,
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: 'false',
    include_video: 'false',
    page: '1',
  });

  if (genre) queryParams.append('with_genres', genre);
  if (minRating) queryParams.append('vote_average.gte', minRating);
  if (certification) queryParams.append('certification', certification);
  if (actorId) queryParams.append('with_cast', actorId);

  const url = `https://api.themoviedb.org/3/discover/movie?${queryParams.toString()}`;

  const res = await fetch(url, { next: { revalidate: 10000 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const results = data.results;

  // 🎯 Prepare filter tags to show above results
  const activeFilters = [];
  if (genre) activeFilters.push({ label: `🎬 ${genre}`, param: 'genre' });
  if (minRating) activeFilters.push({ label: `⭐ ${minRating}+`, param: 'minRating' });
  if (certification) activeFilters.push({ label: `🔞 ${certification}`, param: 'certification' });
  if (actorName) activeFilters.push({ label: `🧑 ${actorName}`, param: 'actor' });

  const clearFiltersUrl = '/home/movies';

  return (
    <div className="px-4 sm:px-6">
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 items-center justify-start">
          {activeFilters.map((filter, i) => (
            <span
              key={i}
              className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300"
            >
              {filter.label}
            </span>
          ))}
          <Link
            href={clearFiltersUrl}
            className="ml-2 text-sm font-medium text-red-600 hover:underline"
          >
            Clear All
          </Link>
        </div>
      )}
      
      <Results results={results} />
    </div>
  );
}
