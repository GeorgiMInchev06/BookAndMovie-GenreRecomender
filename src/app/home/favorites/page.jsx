'use client';

import Results from '@/components/Results';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function Favorites() {
  const [results, setResults] = useState({ favs: [], favBooks: [] });
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user/getFav', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          const data = await res.json();
          setResults({
            favs: data.favs || [],
            favBooks: data.favBooks || [],
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (isLoaded && isSignedIn && user) {
      fetchData();
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isSignedIn) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl my-5">Please sign in to view your favorites</h1>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {results.favs.length === 0 && results.favBooks.length === 0 && (
        <h1 className="text-center pt-6">No favorites yet</h1>
      )}

      {results.favs.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-2">🎬 Favorite Movies</h2>
          <Results
            results={results.favs.map((result) => ({
              id: result.movieId,
              title: result.title,
              backdrop_path: result.image,
              overview: result.description,
              first_air_date: result.dateReleased?.substring(0, 10) || 'N/A',
              vote_count: result.rating,
              duration: result.duration,
              genres: result.genres || [],
              productionCompanies: result.productionCompanies || [],
              languages: result.languages || [],
              cast: result.cast || [],
              trailer: result.trailer || null,
              recommendations: result.recommendations || [],
              isFav: true,
            }))}
          />
        </>
      )}

      {results.favBooks.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-10 mb-2">📚 Favorite Books</h2>
          <Results
            type="book"
            results={results.favBooks.map((book) => ({
              id: book.bookId,
              title: book.title,
              image: book.image,
              author_name: Array.isArray(book.authors) ? book.authors : [book.authors],
              first_publish_year: book.publishYear,
            }))}
          />
        </>
      )}
    </div>
  );
}
