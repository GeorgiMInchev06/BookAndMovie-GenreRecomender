import Link from 'next/link';
import Image from 'next/image';
import { FiThumbsUp } from 'react-icons/fi';

export default function MoviesCard({ result }) {
  const imagePath = result.backdrop_path || result.poster_path;
  const imageUrl = imagePath
    ? `https://image.tmdb.org/t/p/original/${imagePath}`
    : "/images/no_image_available.jpg"; // fallback image

  return (
    <div className="group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200">
      <Link href={`/home/movies/movie/${result.id}`}>
        <div>
          <Image
            src={imageUrl}
            alt={result.title || result.name}
            width={500}
            height={300}
            className="sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300 w-full sm:h-40 object-cover"
            priority
          />
          <div className="p-2">
            <p className="line-clamp-2 text-md">{result.overview}</p>
            <h2 className="text-lg font-bold truncate">{result.title || result.name}</h2>
            <p className="flex items-center">
              {result.release_date || result.first_air_date}
              <FiThumbsUp className="h-5 mr-1 ml-3" />
              {result.vote_count}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
