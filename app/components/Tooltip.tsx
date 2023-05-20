import React, { ReactNode, useState } from 'react'

export default function Tooltip({ children, className, title }: { children: ReactNode, className?: string, title: string }) {
    const [display, setDisplay] = useState('opacity-0')
    const handleToggle = () => {
        display === 'opacity-0' ? setDisplay('opacity-100') : setDisplay('opacity-0')
    }
    return (
    <div
    onMouseEnter={handleToggle}
    onMouseLeave={handleToggle}
    className='relative w-fit'
    >
        <span 
        style={{ minWidth: 'fit'}}
        className={display + ' px-2 rounded-md bg-opacity-80 absolute bg-black text-white transition-all bottom-12 text-center right-0'}>{title}</span>
        { children }</div>
  )
}
