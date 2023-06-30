'use client'
import Link from 'next/link'
import React from 'react'
import Button from './components/ui/Button'

export default function error() {
   
  return (
    <div className='flex flex-col items-center justify-center'>
        <h1 className='text-5xl'>Looks Like something went wrong.</h1>
        <Button href='/'>Home</Button>
    </div>
  )
}
