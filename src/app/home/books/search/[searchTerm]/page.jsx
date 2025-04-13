'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Results from '@/components/Results';

const OPEN_LIBRARY_SEARCH_API = 'https://openlibrary.org/search.json';

export default function SearchPage() {
  const { searchTerm } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchTerm) return;
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${OPEN_LIBRARY_SEARCH_API}?q=${encodeURIComponent(searchTerm)}&limit=20`);
        const data = await res.json();
        setBooks(data.docs || []);
      } catch (err) {
        console.error(err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchTerm]);

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-muted">Searching for books...</p>
      ) : (
        <Results results={books} type="book" />
      )}
    </div>
  );
}
