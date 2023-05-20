import { IAboutSubreddit } from '@/typings'
import Link from 'next/link'
import React from 'react'

export default function Subreddit({ post }: { post: IAboutSubreddit}) {

  return (
    <Link href={post.display_name_prefixed}
     className='bg-gray-100 hover:bg-gray-200 hover:bg-opacity-70 transition-all py-4 rounded-md px-4'>
        <h3 className='text-xl font-semibold'>{post.display_name_prefixed}</h3>
        <p>{post.title}</p>
    </Link>
  )
}
