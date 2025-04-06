'use client';

import AddToFav from '@/components/AddToFav';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function MoviePage({ params }) {
  const { id: movieId } = params;
  const { isSignedIn, user, isLoaded } = useUser();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [cast, setCast] = useState([]);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_MOVIES_API_KEY}`
      );
      const movieData = await movieRes.json();
      setMovie(movieData);

      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_MOVIES_API_KEY}`
      );
      const creditsData = await creditsRes.json();
      setCredits(creditsData);
      setCast(creditsData.cast?.slice(0, 10) || []);

      const videoRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_MOVIES_API_KEY}`
      );
      const videoData = await videoRes.json();
      const officialTrailer = videoData.results?.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );
      setTrailer(officialTrailer);

      const recommendationsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_MOVIES_API_KEY}`
      );
      const recommendationsData = await recommendationsRes.json();
      console.log(recommendationsData)
      setRecommendations(recommendationsData.results?.slice(0, 5) || []);
    };

    

    fetchData();
  }, [movieId]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const fetchFavStatus = async () => {
        const favRes = await fetch(`/api/user/getFav`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (favRes.ok) {
          const { favs } = await favRes.json();
          setIsFav(favs.some(fav => fav.movieId === movieId.toString()));
        }
      };
      fetchFavStatus();
    }
  }, [isLoaded, isSignedIn, user, movieId]);

  // Handle loading
if (!movie || !credits) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <Image className='h-16 mt-16' src='\spinner.svg' alt="loading..." width={16} height={16}/>
      <p className="text-lg text-gray-600">Loading movie details...</p>
    </div>
  );
}

// Handle failure (e.g., invalid movie or API error)
if (movie.success === false || movie.status_code === 34) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center animate-fade-in">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8 border border-gray-200 dark:border-gray-700 max-w-xl w-full">
        <div className="text-5xl mb-4">🎬</div>
        <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-3">
          Movie Not Available
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
          This movie is currently unavailable. It may have been removed, renamed, or temporarily offline.
        </p>
        <Link
          href="/home/movies"
          className="inline-block px-6 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 rounded-md shadow-sm transition"
        >
          ⬅ Go back to Movies
        </Link>
      </div>
    </div>
  );
}


  
  

  return (
    <div className='w-full'>
      <div className='py-4 md:pt-2 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
          width={500}
          height={300}
          className='rounded-lg w-full md:w-96 h-56 object-cover'
          alt={`${movie.title || movie.name}Image`}
        />
        <div className='p-2'>
          <h2 className='text-xl mb-3 font-bold'>{movie.title || movie.name}</h2>
          <p className='text-lg mb-3'>{movie.overview}</p>
          <p className='mb-2'>
            <span className="font-semibold mr-1">Genres:</span> {movie.genres.map(g => g.name).join(', ')}
          </p>
          <p className='mb-2'>
            <span className="font-semibold mr-1">Production:</span> 
            {movie.production_companies.map(p => p.name).join(', ')} ({movie.production_countries.map(c => c.name).join(', ')})
          </p>
          <div className='flex flex-row'>
            <p className='mr-10'>
              <span className='font-semibold mr-1'>Date Released:</span>
              {movie.release_date || movie.first_air_date}
            </p>
            <p className='mb-2'>
              <span className="font-semibold">Languages:</span> {movie.spoken_languages.map(l => l.english_name).join(', ')}
            </p>
          </div>
          <div className='flex flex-row'>
            <p className='mr-10'>
              <span className="font-semibold">Duration:</span> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </p>
            <p className='mb-2 mr-auto'>
              <span className='font-semibold mr-1'>Rating:</span>
              {movie.vote_count}
            </p>
            <AddToFav
              movieId={movieId}
              title={movie.title || movie.name}
              image={movie.backdrop_path || movie.poster_path}
              overview={movie.overview}
              releaseDate={movie.release_date || movie.first_air_date}
              voteCount={movie.vote_count}
              duration={`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
              genres={movie.genres.map(g => g.name).join(', ')}
              productionCompanies={movie.production_companies.map(p => p.name).join(', ')}
              languages={movie.spoken_languages.map(l => l.english_name).join(', ')}
              cast={cast.map(actor => ({
                name: actor.name,
                character: actor.character,
                image: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : null
              }))}
              trailer={trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null}
              recommendations={recommendations.map(rec => ({
                movieId: rec.id,
                title: rec.title || rec.name,
                image: rec.backdrop_path ? `https://image.tmdb.org/t/p/w500${rec.backdrop_path}` : null
              }))}
              isFav={isFav}
            />
          </div>
        </div>
      </div>
      {trailer ? (
        <div className='mt-1 flex justify-center'>
          <iframe
            width='1150'
            height='650'
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title='Movie Trailer'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='rounded-lg shadow-lg'
          ></iframe>
        </div>
      ) : (
        <Image
          src="/images/Trailer_unavailable.png" // Make sure this is inside /public
          width={1150}
          height={650}
          className="mx-auto rounded-lg"
          alt="No trailer available"
        />
      )}
      
      {/* Movie Cast */}
      {cast?.length > 0 && (
        <div className='max-w-6xl mx-auto mt-8 p-4'>
          <h2 className='text-xl font-bold mb-4'>Cast</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {cast.map((actor) => {
              const actorImage = actor.profile_path
                ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                : '/images/actors_default_pic.jpg'; // Use a placeholder image
          
              return (
                <div key={actor.id} className='text-center'>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(actor.name)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Image
                      src={actorImage}
                      width={100}
                      height={150}
                      className='rounded-md mx-auto cursor-pointer transition-transform transform hover:scale-105'
                      alt={actor.name}
                    />
                  </a>
                  <p className='font-semibold'>{actor.name}</p>
                  <p className='text-sm text-gray-600'>as {actor.character}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {recommendations.length > 0 && (
        <div className='max-w-6xl mx-auto mt-8 p-4'>
          <h2 className='text-xl font-bold mb-4'>You May Also Like</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {recommendations.map(rec => (
              <div key={rec.id} className='text-center'>
                <Link href={`/home/movies/movie/${rec.id}`}>
                  <Image 
                    src={`https://image.tmdb.org/t/p/w200/${rec.poster_path}`} 
                    width={165} 
                    height={215} 
                    className="rounded-md mx-auto cursor-pointer transition-transform transform hover:scale-105"
                    alt={rec.title}
                  />
                  <p className="font-semibold mt-1">{rec.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}