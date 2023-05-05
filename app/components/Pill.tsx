'use client'
import React, { MouseEventHandler, ReactNode } from 'react'

export default function Pill({ children, onClick, fontSize='sm', variant='secondary', className='',}: { children: string | ReactNode, onClick?: MouseEventHandler | undefined, fontSize?: 'xs' | 'sm'| 'lg'| 'xl'| '2xl'| '3xl'| '4xl'| '5xl'| '6xl'| '7xl'| '8xl'| '9xl', variant?: 'primary' | 'secondary' | 'display' | 'tertiary', className?: string }) {
    let variantStyle = '' 
    if(variant === 'primary') variantStyle = 'bg-purple-500 hover:bg-purple-600 active:bg-purple-700'
    if(variant === 'secondary') variantStyle = 'bg-opacity-20 bg-purple-700 hover:bg-opacity-40 active:bg-opacity-60'
    if(variant === 'secondary') variantStyle = 'bg-opacity-20 bg-purple-700 hover:bg-opacity-40 active:bg-opacity-60'
    if(variant === 'tertiary') variantStyle = ''
    if(variant === 'display') variantStyle = 'bg-opacity-20 bg-purple-700 active:bg-opacity-60 cursor-default'
    return (
    <button
    onClick={onClick}
    className={`rounded-full py-1 px-5 transition-all text-${fontSize} ${variantStyle} ${className}`}
    >{ children }</button>
  )
}
