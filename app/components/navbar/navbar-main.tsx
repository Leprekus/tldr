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
    <nav className='flex flex-col gap-y-4'>
    <NavbarProfile/>
    <div className='flex justify-evenly flex-wrap
    sm:gap-x-4 sm:mx-8'>
      {navItems.map((item, i) => (
        <NavButtonMobile
        key={i}
        href={item.href}
        >
          {item.title}
        </NavButtonMobile>
      ))}
        <input
          className='hidden sm:block mx-auto text-gray-600 rounded-md'
          value={inputText}
          placeholder='Search'
          onChange={(e) => setInputText(e.target.value)}
        />
    </div>
    </nav>
  );
}
