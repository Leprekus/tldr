import React from 'react'

export default function SkeletonComments() {
  return (
    <ul className='flex h-full flex-wrap gap-y-1 px-1'>
        <li className='min-w-full h-10 bg-gray-200 animate-pulse rounded-md'></li>
        <li className='min-w-full h-10 bg-gray-200 animate-pulse rounded-md'></li>
        <li className='min-w-full h-10 bg-gray-200 animate-pulse rounded-md'></li>
        <li className='min-w-full h-10 bg-gray-200 animate-pulse rounded-md'></li>
        <li className='min-w-full h-10 bg-gray-200 animate-pulse rounded-md'></li>
    </ul>
  )
}
