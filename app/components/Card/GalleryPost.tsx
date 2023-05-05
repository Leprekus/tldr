import { IRedditPost } from '@/typings'
import React, { useState } from 'react'
import Button from '../Button'
import Pill from '../Pill'

export default function GalleryPost({ post }: { post: any }) {
  
  const keys = Object.keys(post.media_metadata)
  const preview = keys.map(key => post.media_metadata[key].p[2].u.replace(/&amp;/g, "&"))
  return (
    <div>GalleryPost
      {preview.map((url, i) => (
        <img src={url} key={i}/>
      ))}
    </div>
  )
}

type CarouselProps = {
  post: IRedditPost;
}

export function Carousel({ post }: any) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const keys = Object.keys(post.media_metadata)
  const preview = keys.map(key => post.media_metadata[key].p[2].u.replace(/&amp;/g, "&"))
  
  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? preview.length - 1 : currentIndex - 1)
  }
  
  const handleNext = () => {
    setCurrentIndex(currentIndex === preview.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <div>
      <div
      className='flex items-center justify-center flex-col gap-y-2' 
      >
        <img src={preview[currentIndex]} loading='lazy' className='rounded-md'/>
        <div className='flex gap-x-4 items-center'>
          <Button variant='secondary' onClick={handlePrev}>Prev</Button>
          <Pill variant='display' className='text-white shadow'>{currentIndex + 1} | {preview.length}</Pill>
          <Button  variant='secondary'onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  )
}
