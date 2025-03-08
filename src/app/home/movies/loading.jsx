import Image from 'next/image'
import React from 'react'

export default function loading() {
  return (
    <div className='flex justify-center'>
        <Image className='h-16 mt-16' src='\spinner.svg' alt="loading..." />
    </div>
  )
}
