'use client';

import MoviesCard from './MoviesCard';
import BooksCard from './BooksCard';

export default function Results({ results, type = 'movie' }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-full mx-auto py-4">
      {results.map((item) =>
        type === 'book' ? (
          <BooksCard key={item.id} book={item} />
        ) : (
          <MoviesCard key={item.id} result={item} />
        )
      )}
    </div>
  );
}
