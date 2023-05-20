import { IRedditPost } from '@/typings'
import React from 'react'

export default function ImagePost({ post }: { post: IRedditPost }) {
  const url = post?.preview?.images[0]?.resolutions[2]?.url!.replace(/&amp;/g, '&')
  
  return (
    <div className='h-fit w-auto flex justify-center'>
      <img loading='lazy' src={url} alt='post' className='rounded-md shadow'/>
      </div>
  )
}
