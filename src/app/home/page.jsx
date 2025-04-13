'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function HomePage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (!isSignedIn) {
    router.push('/');
    return null;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* 🔲 Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/WelcomeScreenBackgroun.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ⚡ Split Interactive Areas */}
      <div className="relative z-10 flex h-full">
        {/* 📚 Books Side */}
        <Link href="/home/books" className="flex-1 group relative overflow-hidden">
          <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{  type: 'spring', stiffness: 120, damping: 15 }}
            className="flex items-center justify-center h-full bg-gradient-to-r from-black/60 to-transparent hover:from-black/80 transition-all duration-300"
          >
            <motion.h2
              whileHover={{ scale: 1.1, textShadow: '0px 0px 12px white' }}
              className="text-white text-5xl font-bold"
            >
              📚 Books
            </motion.h2>
          </motion.div>
        </Link>

        {/* 🎬 Movies Side */}
        <Link href="/home/movies" className="flex-1 group relative overflow-hidden">
          <motion.div
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            transition={{  type: 'spring', stiffness: 120, damping: 15 }}
            className="flex items-center justify-center h-full bg-gradient-to-l from-black/60 to-transparent hover:from-black/80 transition-all duration-300"
          >
            <motion.h2
              whileHover={{ scale: 1.1, textShadow: '0px 0px 12px white' }}
              className="text-white text-5xl font-bold"
            >
              🎬 Movies
            </motion.h2>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
