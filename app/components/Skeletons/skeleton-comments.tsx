import React from 'react'
import Paper from '../Card/Paper'

export default function SkeletonComments() {
  return (
    
    <Paper className='p-4 gap-4' flex='wrap'>
            <div className='min-w-full h-10 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='min-w-full h-10 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='min-w-full h-10 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='min-w-full h-10 bg-gray-200 animate-pulse rounded-md'></div>
            <div className='min-w-full h-10 bg-gray-200 animate-pulse rounded-md'></div>
    </Paper>
  )
}
