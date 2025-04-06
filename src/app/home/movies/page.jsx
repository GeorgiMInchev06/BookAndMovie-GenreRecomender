import Results from '@/components/Results';
const NEXT_PUBLIC_MOVIES_API_KEY = process.env.NEXT_PUBLIC_MOVIES_API_KEY;

export default async function MoviesPage({searchParams}) {
  const genre = searchParams.genre || 'fetchTrending';
  const res = await fetch(
    `https://api.themoviedb.org/3${
      genre === 'fetchTopRated' ? `/movie/top_rated` : `/trending/all/week`
    }?api_key=${NEXT_PUBLIC_MOVIES_API_KEY}&language=en-US&page=1`,
    {next: {revalidate: 10000}}
  );
  const data = await res.json();
  if(!res.ok){
    throw new Error('Failed to fetch data')
  }
  const results = data.results;

  return (
    <div>
      <Results results={results} />
    </div>
  )
}