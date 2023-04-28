'use client';
import React from 'react';
import { NavButtonMobile } from './nav-button';
import navItems from '@/lib/navItems';
import NavbarProfile from '../navbar-profile';
import SearchBar from '../SearchBar';
import Pill from '../Pill';

export default function NavbarMain() {  
  return (
    <nav className='flex flex-col gap-y-4 max-w-7xl mx-auto'>
    <NavbarProfile/>
     <SearchBar/>
      <div className='flex justify-center gap-x-4'>
        {navItems.map((item, i) => (
          <NavButtonMobile
          key={i}
          href={item.href}
          >
            {item.title}
          </NavButtonMobile>
        ))}
      </div>
      
    </nav>
  );
}
