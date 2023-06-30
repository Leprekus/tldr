import React, { ReactNode, cloneElement } from 'react'

export default function ListItem({ type='ul', children, justify='center' } : { type?: 'ul' | 'ol', children: string | ReactNode, justify?: 'normal' | 'start' | 'end' | 'center' }) {
  
    return type === 'ul' ? (
    <li className={`flex justify-center justify-${justify} items-center w-full h-full p-4 rounded-md hover:bg-gray-700 hover:transition-all`}
    >{ children }</li>
  ) : (
    <ol>List</ol>
  )
}
