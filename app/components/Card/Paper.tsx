import React, { CSSProperties, ReactNode } from 'react'

export default function Paper({ children, sx={}, flex='row' }: { children: ReactNode | string, sx?: CSSProperties, flex?: 'row' | 'col' }) {
  return (
    <div
    style={ sx }
    className={`w-full bg-white my-4 rounded-md h-fit
  overflow-hidden transition-all shadow-md shadow-zinc-100 flex flex-${flex}`}
  >
    { children }
  </div>
  )
}
