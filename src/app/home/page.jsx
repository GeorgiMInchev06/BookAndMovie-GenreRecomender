'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

export default function HomePage() {

  const[user] = useAuthState(auth);
  const router = useRouter()

  console.log({user})

  if (!user){
    return router.push('/register')
  }

  return (
    <div>
        <Button className="absolute top-6 left-6 text-white bg-slate-700 text-lg z-20" onClick={() => signOut(auth)}>Log out</Button>
    </div>
  )
}
