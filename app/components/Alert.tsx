'use client'
import React, { useEffect, useState } from 'react'
import { InformationIcon } from './Icons'

export default function Alert({ severity='informational', message, setDisplay }: { severity?: 'informational' | 'success' |'warning' | 'error', message: string, setDisplay: Function }) {
    const [opacity, setOpacity] = useState('')
    const [position, setPosition] = useState('translate(-50%, 0)')
    useEffect(() => {
        const id = setTimeout(() => {
            setOpacity('opacity-0')
            setDisplay(false)
        }, 5000)
        return () => clearTimeout(id)
    }, [])

    let style = ''
    if(severity === 'informational') style ='bg-gradient-to-r from-blue-400 to-blue-50 text-blue-950'
    if(severity === 'success') style =''
    if(severity === 'warning') style ='bg-yellow-400'
    if(severity === 'error') style ='bg-red-500'
    return (
    <div 
    style={{ minWidth: 350, left: '50%', transform: 'translate(-50%,0)' }}
    className={ style + ` absolute h-fit max-w-md rounded-md 
    z-50 p-4 flex ${opacity} gap-x-4 text-sm transition-all`}
    >
        <div className='w-6 h-6'>
            <InformationIcon fill='#172554'/>
        </div>
        <p>Alert { message }</p>
    </div>
  )
}
