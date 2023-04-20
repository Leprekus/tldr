import Link from 'next/link'
import React, { ReactNode, useState } from 'react'


export function NavButtonMobile({ children, href }: { children: string | ReactNode, href: string }) {
  
  return (
    
    <Link
    className='bg-slate-800 py-3 px-10 rounded-md'
    href={href}
    >{ children }</Link>
  )
}


export function NavButtonDfesktop() {
  return (
    <div>nav-button</div>
  )
}
