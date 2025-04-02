'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi'; // Import a search icon

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      router.push(`/home/movies/search/${search}`);
    }
  };

  return (
    <form
      className={`flex items-center justify-between max-w-2xl mx-auto bg-white rounded-full border border-gray-300 px-4 py-2 transition-shadow duration-200 
        ${search ? 'shadow-lg' : 'shadow-md'} 
        hover:shadow-xl`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search for movies..."
        className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 px-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="bg-slate-900 text-white px-4 py-1 rounded-full hover:bg-slate-950 transition duration-200 disabled:bg-gray-300"
        disabled={search.trim() === ''}
      >
        <FiSearch className="text-lg" />
      </button>
    </form>
  );
}
