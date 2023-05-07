import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { IInitialState } from '@/typings'
import useStore from '@/app/hooks/store'

export default function Comment({id, fullname }: { id: string, fullname: string}) {
    const removeCurrentCommentId = useStore((state:IInitialState) => state.removeCurrentCommentId)
    const [data, setData] = useState([])
    const { comments } = useStore()
    useEffect(() => {
      const response =  fetch('/api/user/vote', {
        method: 'POST',
        body: JSON.stringify({ name: post.name, dir: value }),
      });
    })
    return ( 
    <div className='w-80 h-72 bg-red-500'>Comment 
    <Button onClick={() => removeCurrentCommentId()}>x</Button>
    
    </div>

  )
}