'use client'
import navItems from '@/lib/navItems'
import React, { useState } from 'react'
import { NavButtonMobile } from './nav-button'

export default function NavbarMobile() {

  const [elmStyle, setElmstyle] = useState<React.CSSProperties | {}>({})
  var xDown: null | number = null;
  var yDown: null | number = null;
  var elm: null | Element = null;
  
  function getTouches(evt: React.TouchEvent<HTMLAnchorElement> | any) {
    return evt.touches || evt.originalEvent.touches;
  }
  
  function handleTouchStart(evt: React.TouchEvent<HTMLAnchorElement>) {
    console.log('started')
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
    elm = firstTouch.target;
  };
  
  function handleTouchMove(evt: React.TouchEvent<HTMLAnchorElement>) {
    if ( ! xDown || ! yDown ) {
      return;
    }
  
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
  
    var xDiff = xDown - xUp;
  
    if ( xDiff > 0 ) {
      setElmstyle({left: 0});
    } else {
      setElmstyle({left: 80});
    }
  
    xDown = null;
    yDown = null;
  };



  return (
    <div className='flex flex-col justify-center gap-x-4 my-2
    absolute transition-all top-0 left-0 bg-purple-300 w-52'
    onTouchStartCapture={(evt) => console.log('touched')}
    onTouchMove={ (evt) => handleTouchMove(evt as any) }
    style={ elmStyle }
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
  )
}
