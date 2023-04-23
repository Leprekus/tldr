'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import NavbarMobile from './navbar-mobile';
import { NavButtonMobile } from './nav-button';
import navItems from '@/lib/navItems';
import NavbarProfile from '../navbar-profile';

export default function NavbarMain() {
  const [inputText, setInputText] = useState('');
  
  return (
    <nav className='flex flex-col gap-y-4 max-w-7xl'>
    <NavbarProfile/>
    <div className='flex flex-col gap-y-4 flex-shrink-0
    justify-start'>
      <input
          className=' text-gray-600 rounded-md w-44 h-8'
          value={inputText}
          placeholder='Search'
          onChange={(e) => setInputText(e.target.value)}
        />
      <div className='flex justify-between'>
        {navItems.map((item, i) => (
          <NavButtonMobile
          key={i}
          href={item.href}
          >
            {item.title}
          </NavButtonMobile>
        ))}
      </div>
      
    </div>
    </nav>
  );
}
