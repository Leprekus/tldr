
import { IAboutSubreddit } from '@/typings'
import Image from 'next/image'
import React from 'react'
import Pill from './Pill'
import posts from '@/lib/posts'

export default async function About({ subreddit }: { subreddit: string }) {
  
  const data = await posts({ page: 'subredditAbout', query: subreddit})

  function formatNumber(number: number) {
    const units = ['', 'k', 'M', 'B', 'T', 'Q'];
    let unitIndex = 0;
    let numberMagnitude = 0;
    
    // Calculate the magnitude of the input number
    if (number >= 1000) {
      numberMagnitude = Math.floor(Math.log10(number) / 3);
    }
  
    // If the magnitude is greater than the number of available units, use the last available unit
    if (numberMagnitude >= units.length) {
      unitIndex = units.length - 1;
    } else {
      unitIndex = numberMagnitude;
    }
  
    const formattedNumber = Math.floor((number / Math.pow(1000, unitIndex)));
  
    return `${formattedNumber}${units[unitIndex]}`;
  }
  
    return (
    <div 
    className='h-fit w-full mx-auto flex flex-col relative p-1'>
        
          <span 
          className={`w-full h-36 md:visible invisible ${data.primary_color ? 'bg-[${data.primary_color}]' : 'bg-slate-400 bg-opacity-10'} bg-opacity-10 rounded-md shadow flex items-center justify-center`}>
            <h1 className='text-xl md:text-3xl'>{data.title}</h1>
          </span>
        

      <div className='absolute bottom-0 flex justify-center w-full gap-x-4 z-10'>
        <label htmlFor="">Users </label>
            <p>Subscribers: {formatNumber(data.subscribers)}</p>
            <Pill variant='tertiary'
            className='border-indigo-300 border-2'
            >{data.user_is_subscriber ? 'Joined' : 'Join'}</Pill>
            <p>Active: {formatNumber(data.active_user_count)}</p>
      </div>
    </div>

  )
}
