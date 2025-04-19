'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpenText } from 'lucide-react';

export default function BooksCard({ book }) {
  if (!book || typeof book !== 'object') return null;

  const title = book.title || 'Untitled';
  const author = book.author_name?.join(', ') || 'Unknown Author';
  const year = book.first_publish_year || '—';
  const coverId = book.cover_i;
  const imageUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : '/images/no_image_available.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group cursor-pointer w-[200px] sm:w-[200px] h-[400px] bg-white dark:bg-gray-900 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 overflow-hidden"
    >
      <Link href={`/home/books/book/${book.key.replace('/works/', '')}`} className="block h-full">
        <div className="relative w-full h-[270px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-t"
            priority
          />
        </div>

        <div className="p-3 flex flex-col justify-between h-[calc(100%-270px)]">
          <h2 className="text-sm font-semibold leading-snug line-clamp-2">{title}</h2>
          <p className="text-sm text-muted-foreground truncate mt-1">{author}</p>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <BookOpenText className="w-4 h-4" />
            {year}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
