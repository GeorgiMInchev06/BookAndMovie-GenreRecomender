'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Star, StarOff } from 'lucide-react';

export default function AddBookToFav({
  bookId,
  title,
  description,
  image,
  authors,
  publishYear,
}) {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Check if the book is already in favorites
  useEffect(() => {
    const fetchFavStatus = async () => {
      if (!isSignedIn || !isLoaded) return;

      const res = await fetch('/api/user/getFav', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        const found = data.favBooks.some((book) => book.bookId === bookId);
        setIsFav(found);
      }
    };

    fetchFavStatus();
  }, [bookId, isLoaded, isSignedIn]);

  const handleFavClick = async () => {
    if (!isSignedIn) return router.push('/sign-in');

    setIsLoading(true);

    try {
      const res = await fetch('/api/user/favBook', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            bookId,
            title,
            description,
            image,
            authors,
            publishYear }),
      });

      if (res.ok) {
        setIsFav((prev) => !prev);
      }
    } catch (err) {
      console.error('Failed to update book favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFavClick}
      className={`p-2 rounded-full transition-colors duration-300 ${
        isFav ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-gray-600'
      }`}
      disabled={isLoading}
      title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
    >
      {isLoading ? (
        <span className="animate-pulse">⏳</span>
      ) : isFav ? (
        <Star className="w-5 h-5 fill-white" />
      ) : (
        <StarOff className="w-5 h-5" />
      )}
    </button>
  );
}
