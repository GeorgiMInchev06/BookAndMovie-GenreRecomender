'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

export default function BooksSearchBox() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      router.push(`/home/books?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <form
      className={`flex items-center justify-between max-w-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 ml-auto shadow-md hover:shadow-lg transition`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search for books..."
        className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 px-3"
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
