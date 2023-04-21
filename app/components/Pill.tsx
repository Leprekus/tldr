'use client'
import React, { MouseEventHandler, ReactNode } from 'react'

export default function Pill({ children, onClick, fontSize='sm', variant='secondary'}: { children: string | ReactNode, onClick?: MouseEventHandler | undefined, fontSize?: 'xs' | 'sm'| 'lg'| 'xl'| '2xl'| '3xl'| '4xl'| '5xl'| '6xl'| '7xl'| '8xl'| '9xl', variant?: 'primary' | 'secondary' }) {
    let variantStyle = variant === 'primary' ? 'bg-purple-500 hover:bg-purple-600 active:bg-purple-700' : 'bg-opacity-20 bg-purple-700 hover:bg-opacity-40 active:bg-opacity-60'
    return (
    <button
    onClick={onClick}
    className={`rounded-full py-1 px-5 transition-all text-${fontSize} ${variantStyle}`}
    >{ children }</button>
  )
}
