
import { IAboutSubreddit } from '@/typings'
import Image from 'next/image'
import React from 'react'
import Pill from './Pill'

export default function About({ data }: { data: IAboutSubreddit }) {
  //console.log({ data })
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
  console.log({ subs: data.primary_color})

    return (
    <div 
    className={`h-fit w-96 mx-auto flex flex-col relative px-1 py-2 ${data.primary_color ? `bg-[${data.primary_color}]` : 'bg-slate-400 bg-opacity-10'} rounded-md shadow flex items-center gap-y-2`}>
          
          {data.icon_img && <Image src={data.icon_img.replace(/&amp;/g, '&')} width={72} height={72} alt='subreddit-icon' className='rounded-full shadow'/> }
          
          <h1 className='text-xl md:text-3xl text-gray-700 font-bold'>r/{data.title}</h1>
      
      
      <div className=' flex justify-center w-full gap-x-4 z-10'>
            <p>subs: {formatNumber(data.subscribers)}</p>
            <Pill variant='tertiary'
            className='border-indigo-300 border-2'
            >{data.user_is_subscriber ? 'Joined' : 'Join'}</Pill>
            <p>active: {data.active_user_count}</p>
      </div>
        

    </div>

  )
}
