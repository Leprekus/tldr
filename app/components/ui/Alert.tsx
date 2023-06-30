'use client'
import React, { useEffect, useState } from 'react'
import { InformationIcon } from './Icons'

export default function Alert({ severity='informational', message, setDisplay }: { severity?: 'informational' | 'success' |'warning' | 'error', message: string, setDisplay: Function }) {
    const [opacity, setOpacity] = useState('')
    const [position, setPosition] = useState('translate(-50%, 0)')
    useEffect(() => {
        const id = setTimeout(() => {
            //setOpacity('opacity-0')
            setDisplay(false)
        }, 5000)
        return () => clearTimeout(id)
    }, [])

    let style = ''
    if(severity === 'informational') style ='bg-gradient-to-r from-blue-100 to-blue-50 text-blue-900'
    if(severity === 'success') style =''
    if(severity === 'warning') style ='bg-yellow-100 text-yellow-600'
    if(severity === 'error') style ='bg-red-500'
    return (
    <div 
    style={{ minWidth: 350, left: '50%',top: 25, transform: 'translate(-50%,0)' }}
    className={ style + ` fixed h-fit max-w-md rounded-md
    z-50 p-4 flex ${opacity} gap-x-4 text-sm transition-all`}
    >
        <div className='w-6 h-6'>
            {severity === 'informational' && <InformationIcon fill='rgb(30 58 138)'/>}
        </div>
        <p>{ message }</p>
    </div>
  )
}
