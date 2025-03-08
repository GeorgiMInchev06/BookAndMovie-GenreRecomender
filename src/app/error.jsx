'use client';

import React from 'react'
import { useEffect } from 'react';

export default function error({Error, reset}) {
    useEffect(() => {
        console.log(Error);
    }, [Error]);
    return (
    <div className='text-center mt-10'>
        <h1>Something went wrong. Please try again later.</h1>
        <button className='hover:text-indigo-950' onClick={() => reset()}>
            Try Again
        </button>
    </div>
  );
}
