'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';

export default function WelcomePage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (isSignedIn) {
    router.push('/home');
    return null;
  }

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/*Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/WelcomeScreenBackgroun.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="object-center object-cover pointer-events-none"
        />
        {/* Top & Bottom gradient blur */}
        <div className="absolute top-0 left-0 w-full h-44 bg-gradient-to-b from-black/80 via-black/50 to-transparent blur-lg rounded-b-full" />
        <div className="absolute bottom-0 left-0 w-full h-44 bg-gradient-to-t from-black/80 via-black/50 to-transparent blur-lg rounded-t-full" />
      </div>

      {/* Centered Glass Panel */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl px-10 py-12 max-w-2xl w-full text-white"
        >
          {/* Header Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
            Book<span className="text-red-500 mx-2">&</span>Movie Recommender
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl mx-auto leading-relaxed">
          Here you’ll discover the best movies and books tailored to your taste. Filter, search, and create your own list of favorite titles! Find inspiration for your next adventure 📖🍿
          </p>

          {/* Buttons */}
          <div className="flex flex-col space-y-4 items-center">
            <Link
              href="/sign-up"
              className="w-52 text-lg bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            >
              🚀 Sign Up
            </Link>
            <Link
              href="/sign-in"
              className="w-52 text-lg border border-white hover:border-red-500 text-white hover:text-red-500 font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              🔑 Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
