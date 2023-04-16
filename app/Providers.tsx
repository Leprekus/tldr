'use client'
import { SessionProvider, useSession } from "next-auth/react"
import React, { ReactNode } from 'react'

//used for the client side to make requests
export default function Providers({children}:{children: ReactNode}) {
  
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}
