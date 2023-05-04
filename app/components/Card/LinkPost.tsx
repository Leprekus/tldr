import { IRedditPost } from '@/typings'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Button from '../Button';

export default function LinkPost({ post }: { post: IRedditPost }) {


  return (
    <div className='pb-4'>
        <Button 
        variant='secondary' className='lowercase line-clamp-1 leading-8' href={post.url}>{post.url}</Button>
        
    </div>
  )
}
