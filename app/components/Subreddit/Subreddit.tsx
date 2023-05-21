import { IAboutSubreddit } from '@/typings'
import Link from 'next/link'
import React from 'react'

export default function Subreddit({ post, mini=false }: { post: IAboutSubreddit, mini: boolean}) {

  return (
    <Link href={post.display_name_prefixed}
     className={`bg-gray-100 hover:bg-gray-200 hover:bg-opacity-70 transition-all rounded-md ${mini ? 'py-1 px-2' :'py-4 px-4'}`}>
        {mini ?
        <h3 className='text-sm font-semibold line-clamp-1'>{post.display_name_prefixed}</h3>:
        <>
        <h3 className='text-xl font-semibold'>{post.display_name_prefixed}</h3>
        <p>{post.title}</p>
        </>
      }
    </Link>
  )
}
