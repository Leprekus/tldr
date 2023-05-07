import React from 'react'
import Button from '../Button'
import { IInitialState } from '@/typings'
import useStore from '@/app/hooks/store'

export default function Comment({id, fullname }: { id: string, fullname: string}) {
    const removeCurrentCommentId = useStore((state:IInitialState) => state.removeCurrentCommentId)
  return ( 
    <div className='w-80 h-72 bg-red-500'>Comment 
    <Button onClick={() => removeCurrentCommentId()}>x</Button></div>

  )
}