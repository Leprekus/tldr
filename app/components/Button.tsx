import Link from 'next/link'
import React, { CSSProperties, EventHandler, MouseEventHandler, ReactNode, useState } from 'react'


export default function Button({ variant='primary', rounded=false, children, className='', href, disabled, label, onClick, onMouseOver, onMouseEnter, onMouseLeave }: { variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost', rounded?: boolean, children: string | ReactNode, className?: string, href?: string, disabled?: boolean, label?: string, onClick?: MouseEventHandler, onMouseOver?: MouseEventHandler, onMouseEnter?: MouseEventHandler, onMouseLeave?: MouseEventHandler,}) {
 let style = ''
 if(variant === 'primary') style = ''
 if(variant === 'secondary') style = 'text-blue-500 border-blue-500 hover:bg-blue-500 hover:bg-opacity-10 active:bg-opacity-30'
 if(variant === 'tertiary') style = 'opacity-100'
 if(variant === 'ghost') style = 'hover:bg-zinc-200 p-2 focus:outline-zinc-300'
 

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

 if(href) {
  if (disabled) {
    return<button
      aria-label={label} 
      disabled 
      className={className}
      >{ children }</button>;
  }
  return (
    <Link href={href}
    onMouseOver={(e) => mouseEventHandler(e)}
    onMouseEnter={(e) => mouseEventHandler(e)}
    onMouseLeave={(e) => mouseEventHandler(e)}
    onClick={onClick}
    className={`transition-all
    uppercase rounded-md ${style} ${className}
    `}
    >
      { children }
    </Link>
  )

 }
 // removed from classname py-2 px-4
 return (
  <button 
  onMouseOver={(e) => mouseEventHandler(e)}
  onMouseEnter={(e) => mouseEventHandler(e)}
  onMouseLeave={(e) => mouseEventHandler(e)}
  onClick={onClick}
  className={`transition-all
  uppercase ${style} ${className} ${rounded ? 'rounded-full' : 'rounded-md'}
  `}>{ children }</button>
 )


}
