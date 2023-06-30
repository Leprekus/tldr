import { IRedditPost } from '@/typings'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Button from '../ui/Button';

export default function LinkPost({ post }: { post: IRedditPost }) {


  return (
    <div className='pb-4 flex gap-4 items-center flex-wrap justify-center'>
        {post.thumbnail!.includes('https') && <img src={post.thumbnail} loading='lazy' alt='thumbnail' className='object-fit max-h-[40] rounded-md shadow'/>}
        <Button 
        variant='secondary' className='lowercase line-clamp-1 leading-8' href={post.url}>{post.url}</Button>
        
    </div>
  )
}
