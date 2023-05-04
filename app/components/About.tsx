'use client'
import { IAboutSubreddit } from '@/typings'
import Image from 'next/image'
import React from 'react'

export default function About({ data }: { data: IAboutSubreddit }) {
  //console.log({ data })

    return (
    <div className='w-96 h-96 bg-blue-700'>

          <h1>{data.banner_background_image}</h1>
          <p>{data.accounts_active}</p>
          <p>{data.active_user_count}</p>
          <Image width={30} height={30} alt='banner' src={data.banner_background_image}/>
    </div>

  )
}
