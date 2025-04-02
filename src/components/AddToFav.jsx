'use client';
import { Star, StarOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function AddToFav({
  movieId,
  title,
  image,
  overview,
  releaseDate,
  voteCount,
  duration,
  genres,
  productionCompanies,
  languages,
  cast,
  trailer,
  recommendations,
  isFav: initialIsFav = false
}) {
  const [isFav, setIsFav] = useState(initialIsFav);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  // ✅ Sync prop changes into local state (fixes refresh bug)
  useEffect(() => {
    setIsFav(initialIsFav);
  }, [initialIsFav]);

  const handleFavClick = async () => {
    setIsLoading(true);

    if (!isSignedIn) {
      setIsLoading(false);
      router.push('/sign-in');
      return;
    }

    try {
      const res = await fetch('/api/user/fav', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId,
          title,
          overview,
          releaseDate,
          voteCount,
          image,
          duration,
          genres,
          productionCompanies,
          languages,
          cast,
          trailer,
          recommendations,
        }),
      });

      if (res.ok) {
        setIsFav((prev) => !prev);
      } else {
        console.error('Failed to update favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
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
  </div>
  );
}
