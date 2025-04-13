'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Results from '@/components/Results';

const OPEN_LIBRARY_SEARCH_API = 'https://openlibrary.org/search.json';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Default query for homepage
  const query = searchParams.get('q') || 'bestsellers';

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${OPEN_LIBRARY_SEARCH_API}?q=${encodeURIComponent(query)}&limit=20`);
        const data = await res.json();
        const filtered = data.docs.filter((book) => book.title); // Only keep books with title
        setBooks(filtered);
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-muted">Loading books...</p>
      ) : (
        <Results results={books} type="book" />
      )}
    </div>
  );
}
