import React, { CSSProperties, ReactNode } from 'react'

export default function Paper({ children, sx={}, flex='row', className }: { children: ReactNode | string, sx?: CSSProperties, flex?: 'row' | 'col', className?: string}) {
  return (
    <div
    style={ sx }
    className={`w-full bg-white rounded-md h-fit ${className}
  overflow-hidden transition-all shadow-md shadow-zinc-100 flex flex-${flex}`}
  >
    { children }
  </div>
  )
}
