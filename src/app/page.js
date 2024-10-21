import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative h-screen w-screen bg-black">
      <Link legacyBehavior href="/login">
      <a className="absolute top-6 right-6 text-white text-lg z-20">Login</a>
      </Link>
      <div className="absolute inset-0 z-0">
      <Image
          src="/images/WelcomeScreenBackgroun.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
        <div className="flex items-center mb-8 text-4xl font-bold">
          <span className="mr-4">Book</span>
          <span className="text-5xl">&</span>
          <span className="ml-4">Movie</span>
        </div>
        <Link legacyBehavior href="/register">
          <a className="bg-red-600 text-white py-3 px-12 rounded-md text-2xl hover:bg-red-700 transition duration-300">
            Register
          </a>
        </Link>
      </div>
    </div>
  );
}

