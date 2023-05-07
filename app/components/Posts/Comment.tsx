import React from 'react'

export default function Comment({ display }: { display: boolean }) {
  return (
    <>    
    {display  &&  
    <div className='w-80 h-72 bg-red-500'>Comment</div>}
    </>
  )
}
