'use client';
import React from 'react';
import navItems from '@/lib/navItems';
import NavbarProfile from './navbar-profile';
import SearchBar from './SearchBar';

import Button from '../Button';

export default function NavbarMain() {  
  return (
    <nav className='flex flex-col gap-y-4 max-w-7xl mx-auto'>
    <NavbarProfile/>
     <SearchBar/>
      <div className='flex justify-center gap-x-4'>
        {navItems.map((item, i) => (
          <Button
          variant='secondary'
          key={i}
          href={item.href}
          >
            {item.title}
          </Button>
        ))}
      </div>
      
    </nav>
  );
}
