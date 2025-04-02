import Results from '@/components/Results';
import { auth } from '@clerk/nextjs/server'; // or import your method to get the user
import { cookies } from 'next/headers';

const MOVIES_API_KEY = process.env.MOVIES_API_KEY;

export default async function MoviesPage({ searchParams }) {
  const genre = searchParams.genre || 'fetchTrending';

  // 1. Fetch movies from TMDB
  const res = await fetch(
    `https://api.themoviedb.org/3${
      genre === 'fetchTopRated' ? '/movie/top_rated' : '/trending/all/week'
    }?api_key=${MOVIES_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const results = data.results;

  // 2. Fetch user favorites from your backend
  let favoriteIds = [];
  try {
    const cookieStore = cookies(); // needed for server API fetch to include auth
    const favRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/user/getFav`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString()
      },
      cache: 'no-store',
    });

    if (favRes.ok) {
      const favData = await favRes.json();
      favoriteIds = favData.favs.map((f) => f.movieId);
    }
  } catch (error) {
    console.error('Error fetching favorites:', error);
  }

  // 3. Annotate each movie with isFav
  const annotatedResults = results.map((movie) => ({
    ...movie,
    isFav: favoriteIds.includes(movie.id),
  }));

  return (
    <div>
      <Results results={annotatedResults} />
    </div>
  );
}
