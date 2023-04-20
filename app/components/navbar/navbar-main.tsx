'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import NavbarMobile from './navbar-mobile';

export default function NavbarMain() {
    const [inputText, setInputText] = useState('')
  return (
    <nav className=''>
     <NavbarMobile/>
      <input 
      className='block mx-auto text-gray-600' 
      value={inputText}
      placeholder='Search'
      onChange={(e) => setInputText(e.target.value)}/>
    </nav>
  );
}
