import Link from 'next/link'
import React, { CSSProperties, EventHandler, MouseEventHandler, ReactNode, useState } from 'react'


export default function Button({ sx, variant='primary', rounded=false, children, className='', href, disabled, label, onClick, onMouseOver, onMouseEnter, onMouseLeave }: { sx?: CSSProperties, variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost', rounded?: boolean, children: string | ReactNode, className?: string, href?: string, disabled?: boolean, label?: string, onClick?: MouseEventHandler | any, onMouseOver?: MouseEventHandler, onMouseEnter?: MouseEventHandler, onMouseLeave?: MouseEventHandler,}) {
 let style = ''
 if(variant === 'primary') style = 'text-white px-4 py-2 bg-indigo-400 hover:bg-white border border-transparent hover:text-indigo-400 hover:border-indigo-400'
 if(variant === 'secondary') style = 'py-2 px-4 text-blue-500 border-blue-500 hover:bg-blue-500 hover:bg-opacity-10 active:bg-opacity-30'
 if(variant === 'tertiary') style = 'opacity-100 py-1 px-2 hover:bg-indigo-50 text-indigo-400'
 if(variant === 'ghost') style = 'hover:bg-zinc-200 p-2 focus:outline-zinc-300 active:border-zinc-300 '
 
 let masterStyle = `transition-all uppercase ${style} ${className} ${rounded ? 'rounded-full' : 'rounded-md'}`

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

 if (disabled) {
  return<button
    aria-label={label} 
    disabled 
    className={masterStyle + ' hover:cursor-not-allowed'}
    style={ sx }
    >{ children }</button>;
}

 if(href) return (
  <Link href={href}
  onMouseOver={(e) => mouseEventHandler(e)}
  onMouseEnter={(e) => mouseEventHandler(e)}
  onMouseLeave={(e) => mouseEventHandler(e)}
  onClick={onClick}
  style={ sx }

  className={masterStyle}
  >
    { children }
  </Link>
)
 // removed from classname py-2 px-4
 return (
  <button 
  onMouseOver={(e) => mouseEventHandler(e)}
  onMouseEnter={(e) => mouseEventHandler(e)}
  onMouseLeave={(e) => mouseEventHandler(e)}
  onClick={onClick}
  style={ sx }

  className={masterStyle}>{ children }</button>
 )


}
