'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

export default function HomePage() {

  const[user] = useAuthState(auth);
  const router = useRouter()

  console.log({user})

  // if (!user){
  //   return router.push('/')
  // }

  return (
    <div className="relative h-screen w-screen bg-black">
        <Button className="absolute top-6 left-6 text-white bg-slate-700 text-lg z-20" onClick={() => signOut(auth)}>Log out</Button>
      <div className="absolute inset-0 z-0">
        <Image 
            src="/images/WelcomeScreenBackgroun.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="object-center object-cover pointer-events-none"
          />
      </div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
        <div className="flex items-center mb-8 text-4xl font-bold">
          <Link href="/home/books" className="mr-72">Books</Link>
          <Link href="/home/movies" className="ml-72">Movies</Link>
        </div>
      </div>
    </div>
  )
}
