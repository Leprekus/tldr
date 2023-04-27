'use client'
import { SessionProvider, useSession } from "next-auth/react"
import React, { ReactNode } from 'react'
import SetToken from './SetToken'

//used for the client side to make requests
export default function Providers({children}:{children: ReactNode}) {
  
  return (
    <SessionProvider>
      <SetToken>{children}</SetToken>
    </SessionProvider>
  )
}
