'use client';
import React from 'react';
import { NavButtonMobile } from './nav-button';
import navItems from '@/lib/navItems';
import NavbarProfile from '../navbar-profile';
import SearchBar from '../SearchBar';
import Pill from '../Pill';

export default function NavbarMain() {  
  return (
    <nav className='flex flex-col gap-y-4 max-w-7xl'>
    <NavbarProfile/>
     <SearchBar/>
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
      
    </nav>
  );
}
