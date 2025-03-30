import AddToFav from '@/components/AddToFav';
import Link from 'next/link';
import Image from 'next/image';

export default async function MoviePage({ params }) {
  const { id: movieId } = await params;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIES_API_KEY}`
  );
  const movie = await res.json();

  const creditsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.MOVIES_API_KEY}`
  );
  const credits = await creditsRes.json();
  const cast = credits.cast?.slice(0, 10);

  const videoRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.MOVIES_API_KEY}`
  );
  const videoData = await videoRes.json();

  // Find an official trailer from the results
  const trailer = videoData.results?.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  const recommendationsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.MOVIES_API_KEY}`
  );
  const recommendations = await recommendationsRes.json();
  

  if (!res.ok) {
    return (
      <div className='text-center mt-10'>
        <h1 className='text-xl my-5'>
          Movie details are not available at the moment!
        </h1>
        {/* return home */}
        <p>
          <Link href='/home/movies' className='hover:text-amber-600'>
            Go Home
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='py-4 md:pt-2 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={500}
          height={300}
          className='rounded-lg w-full md:w-96 h-56 object-cover'
          alt={`${movie.title || movie.name}Image`}
        ></Image>
        <div className='p-2'>
          <h2 className='text-xl mb-3 font-bold'>
            {movie.title || movie.name}
          </h2>
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
          />
          </div>
         
        </div>
      </div>
      {trailer ? (
      <div className='mt-1 flex justify-center'>
          <iframe
            width='1150'
            height='650 '
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
        {recommendations.results.length > 0 && (
      <div className='max-w-6xl mx-auto mt-8 p-4'>
        <h2 className='text-xl font-bold mb-4'>You May Also Like</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {recommendations.results.slice(0, 5).map(rec => (
            <div key={rec} className='text-center'>
              <Link key={rec.id} href={`/home/movies/movie/${rec.id}`}>
            <Image 
              src={`https://image.tmdb.org/t/p/w200/${rec.poster_path}`} 
              width={165} 
              height={215} 
              className="rounded-md mx-auto cursor-pointer transition-transform transform hover:scale-105"
              alt={rec.title}
            />
            <p className="font-semibold mt-1">
                    {rec.title}
            </p>
          </Link>
          </div>
            
          ))}
        </div>
      </div>
    )}
    </div>
  );
}