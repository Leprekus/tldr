import { IError } from '@/typings'
import React from 'react'
import Button from './Button'

export default function Error({ error }: { error: IError }) {
  console.log({ error })
  return (
    <div role="alert" className='flex flex-col items-center jusify-center mx-auto my-12 gap-4'>
    <h1 className='text-8xl'>Uh Oh! 😨</h1>
    <h1 className='text-5xl'>{error.error}</h1>
    <h1 className='text-5xl'>{error.message}</h1>
    <Button href='/' variant='primary'>Home</Button>
  </div>
  )
}
