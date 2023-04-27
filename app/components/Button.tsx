import React, { CSSProperties, EventHandler, MouseEventHandler, ReactNode, useState } from 'react'


export default function Button({ variant='primary', rounded=false, children, className='', onClick, onMouseOver, onMouseEnter, onMouseLeave }: { variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost', rounded?: boolean, children: string | ReactNode, className?: string,onClick?: MouseEventHandler, onMouseOver?: MouseEventHandler, onMouseEnter?: MouseEventHandler, onMouseLeave?: MouseEventHandler,}) {
 let style = ''
 if(variant === 'primary') style = ''
 if(variant === 'secondary') style = 'text-blue-500 border-blue-500 hover:bg-blue-500 hover:bg-opacity-10 active:bg-opacity-30'
 if(variant === 'tertiary') style = 'opacity-100'
 if(variant === 'ghost') style = 'hover:bg-zinc-200'
 if(rounded) style += 'rounded-full'

 const [dimStyle, setDimStyle] = useState()
 const mouseEventHandler = (e: any) => {
  if(onMouseOver) {
    onMouseOver(e)
  }
  if(onMouseEnter) {
    onMouseEnter(e)
  }
  if(onMouseLeave) {
    onMouseLeave(e)
  }
 }
 return (
  <button 
  onMouseOver={(e) => mouseEventHandler(e)}
  onMouseEnter={(e) => mouseEventHandler(e)}
  onMouseLeave={(e) => mouseEventHandler(e)}
  onClick={onClick}
  className={`transition-all 
  uppercase py-2 px-4 rounded-md ${style} ${className}
  `}>{ children }</button>
 )


}
