import { IRedditUser } from '@/typings'
import cakeDay from '@/utils/cakeDay'
import formatRedditUrl from '@/utils/formatRedditUrl'
import Image from 'next/image'
import React from 'react'

export default function AboutUser({ data }: { data: IRedditUser}) {
    console.log(data || 'null')

  return (
    <div>
        <img className='bg-gray-200 rounded-md' loading='lazy' src={formatRedditUrl(data.icon_img)} width={48} height={48} alt='user-avatar'/>
        <p>{data.name}</p>
        <p>{data.description}</p>
        <p>Cake Day: {cakeDay(data.created_utc)}</p>
        <p>Karma: {data.total_karma}</p>
    </div>
  )
}
