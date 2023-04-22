'use client'
import React, { useState } from 'react'
import Button from './Button'

export default function Card({ title, text }: {title: string, text: string}) {
    const [height, setHeight] = useState('500')
    const [showMore, setShowMore] = useState(true)
    const [dimStyle, setDimStyle] = useState('opacity-100')
    const handleShowMore = () => {
        if(height === '500') {
            setHeight('fit')
            setShowMore(false)
            return
        }
        setHeight('500')
        setShowMore(true)
        return 
    }
    const handleMouseLeave = () => {
    
        if(showMore) {
            setDimStyle('opacity-100')
        }
        if(!showMore) {
            setDimStyle('opacity-20 hover:opacity-100')
        }
    
    }
    return (
    <div 
    style={{ height: height }}
    className='w-full sm:w-96 bg-zinc-950 my-4 rounded-md overflow-hidden relative'>
        <div className='bg-zinc-900 py-4 px-6'>
            <h1 className='text-lg'>{title}</h1>
        </div>
        <div className='p-6 h-72 overflow-hidden text-sm'>
            {showMore ? <p>tldr;</p>: <p>{text}</p> }
        </div>

        
        <div className={`${showMore ? 'bg-transparent' : 'bg-gradient-to-b from-transparent to-zinc-950'} w-full h-36 absolute bottom-24 flex items-end justify-center`}>
            <Button 
            className={dimStyle}
            onMouseLeave={handleMouseLeave}
            onClick={handleShowMore} variant='secondary'>{showMore ? 'show more' : 'show less'}</Button>
        </div>
        <div 
        style={{ borderTopWidth: 1 }}
        className='h-24 p-6 bg-zinc-900 border-gray-800'>
            <p>upvote | downvote comments</p>
        </div>
    </div>
  )
}
