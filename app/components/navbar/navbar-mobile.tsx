'use client'
import navItems from '@/lib/navItems'
import React, { useState } from 'react'
import { NavButtonMobile } from './nav-button'

export default function NavbarMobile() {
const [display, setDisplay] = useState('hidden')
const toggleMenu = () => {
  if(display === 'hidden') {
    setDisplay('block')
    return 
  }
  setDisplay('hidden')
}
return (
    <>
    <div 
    onClick={toggleMenu}
    className='h-12 w-12 rounded-full active:bg-red-700 flex flex-col justify-between p-4 m-4 items-center'>
      <span className='w-6 h-1 bg-white rounded-full'/>
      <span className='w-6 h-1 bg-white rounded-full'/>
    </div>
    <div className={`${display} `}
    >
    {navItems.map((item, i) => (
      <NavButtonMobile 
      key={i} 
      href={item.href}
      >
        {item.title}
      </NavButtonMobile>
    ))}
    </div>
    </>
  )
}
