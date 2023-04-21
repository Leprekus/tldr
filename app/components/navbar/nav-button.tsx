import Link from 'next/link'
import React, { ReactNode, useState } from 'react'


export function NavButtonMobile({ children, href }: { children: string | ReactNode, href: string }) {
  
  return (
    
    <Link
    className='bg-opacity-20 bg-purple-700 hover:bg-opacity-40 active:bg-opacity-60 transition-all
    py-2 px-7 rounded-md'
    href={href}
    >{ children }</Link>
  )
}


export function NavButtonDfesktop() {
  return (
    <div>nav-button</div>
  )
}
