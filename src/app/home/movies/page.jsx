import Results from '@/components/Results';
import Link from 'next/link';

const NEXT_PUBLIC_MOVIES_API_KEY = process.env.NEXT_PUBLIC_MOVIES_API_KEY;

export default async function MoviesPage({ searchParams }) {

  const genreNameMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };
  

  const {
    genre,
    minRating,
    certification,
    language,
    sortBy,
    fromYear,
    toYear,
  } = searchParams;

  const queryParams = new URLSearchParams({
    api_key: NEXT_PUBLIC_MOVIES_API_KEY,
    language: 'en-US',
    sort_by: sortBy || 'popularity.desc',
    include_adult: 'false',
    include_video: 'false',
    page: '1',
  });

  // 🔁 Handle multi-genre (OR logic)
  if (genre) {
    const genreArray = genre.split(',').filter((g) => g.trim() !== '');
    if (genreArray.length > 0) {
      queryParams.append('with_genres', genreArray.join(','));
    }
  }

  if (minRating) queryParams.append('vote_average.gte', minRating);
  if (certification) queryParams.append('certification', certification);
  if (language) queryParams.append('with_original_language', language);

  // Year filters
  if (fromYear) queryParams.append("primary_release_date.gte", `${fromYear}-01-01`);
  if (toYear) queryParams.append("primary_release_date.lte", `${toYear}-12-31`);

  // Special logic for top rated
  if (sortBy === 'vote_average.desc') {
    queryParams.append('vote_count.gte', '1000');
  }

  const url = `https://api.themoviedb.org/3/discover/movie?${queryParams.toString()}`;
  const res = await fetch(url, { next: { revalidate: 10000 } });

  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  const results = data.results;

  // Build filter tags
  const activeFilters = [];

  if (genre) {
    const genreLabels = genre
      .split(',')
      .map((g) => `🎬 ${genreNameMap[g] || `Genre ${g}`}`);

    genreLabels.forEach((label) => activeFilters.push({ label, param: 'genre' }));
  }

  if (minRating) activeFilters.push({ label: `⭐ ${minRating}+`, param: 'minRating' });
  if (certification) activeFilters.push({ label: `🔞 ${certification}`, param: 'certification' });
  if (language) activeFilters.push({ label: `🌐 ${language}`, param: 'language' });
  if (fromYear || toYear) {
    activeFilters.push({ label: `📅 ${fromYear || '...'} - ${toYear || '...'}`, param: 'fromYear' });
  }
  if (sortBy) {
    const sortLabelMap = {
      'popularity.desc': '🔥 Most Popular',
      'vote_average.desc': '⭐ Top Rated',
    };
    const label = sortLabelMap[sortBy] || `↕ Sort: ${sortBy}`;
    activeFilters.push({ label, param: 'sortBy' });
  }

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
            href="/home/movies"
            className="ml-2 text-sm font-medium text-red-600 hover:underline"
          >
            Clear All
          </Link>
        </div>
      )}

      <Results results={results} type="movie" />
    </div>
  );
}
