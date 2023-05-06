
import { IAboutSubreddit } from '@/typings'
import Image from 'next/image'
import React from 'react'
import Pill from './Pill'

export default function About({ data }: { data: IAboutSubreddit }) {
  //console.log({ data })
    return (
    <div 
    className='h-fit w-full mx-auto flex flex-col relative p-1'>
         { data.banner_background_image &&
         <img 
          src={data.banner_background_image.replace(/&amp;/g, '&')}
          loading='lazy'
          alt='banner'
          className='w-full h-36 md:visible invisible rounded-md'/>
          ||
          data.primary_color && 
          <span 
          className={`w-full h-36 md:visible invisible bg-[${data.primary_color}] bg-opacity-10 rounded-md`}/>
          ||
          <span 
          className='w-full h-36 md:visible invisible bg-slate-400 bg-opacity-10 rounded-md'/>

          }
      <div className='absolute bottom-0 flex justify-center w-full gap-x-4 z-10'>
            <p>{data.accounts_active}</p>
            <Pill variant='tertiary'
            className='border-indigo-300 border-2'
            >{data.user_is_subscriber ? 'Joined' : 'Join'}</Pill>
            <p>{data.active_user_count}</p>
      </div>
    </div>

  )
}
