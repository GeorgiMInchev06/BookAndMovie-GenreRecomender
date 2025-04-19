'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function BookDetailsPage({ params }) {
  const { id } = params;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!res.ok) throw new Error('Book not found');
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setBook(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // 🌀 Loading State (Same as Movie Page)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <Image
          className="h-16 mt-16"
          src="/spinner.svg"
          alt="loading..."
          width={64}
          height={64}
        />
        <p className="text-lg text-gray-600 mt-4">Loading book details...</p>
      </div>
    );
  }

  // ❌ Error / Not Found
  if (!book || !book.title) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center animate-fade-in">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8 border border-gray-200 dark:border-gray-700 max-w-xl w-full">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-3">
            Book Not Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
            This book is currently unavailable. It may have been removed, renamed, or temporarily offline.
          </p>
          <Link
            href="/home/books"
            className="inline-block px-6 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 rounded-md shadow-sm transition"
          >
            ⬅ Go back to Books
          </Link>
        </div>
      </div>
    );
  }

  // 📖 Book Data
  const title = book.title;
  const description = book.description?.value || book.description || 'No description available.';
  const subjects = book.subjects?.slice(0, 5) || [];
  const coverId = book.covers?.[0];
  const imageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : '/images/no_image_available.jpg';

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="relative w-full md:w-1/3 h-[500px] bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-md text-gray-700 dark:text-gray-300 mb-4">{description}</p>

          {subjects.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">Subjects:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                {subjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href="/home/books"
            className="inline-block mt-6 text-blue-600 hover:underline"
          >
            ← Back to Books
          </Link>
        </div>
      </div>
    </div>
  );
}
