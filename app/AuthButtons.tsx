'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function AuthButtons() {
 const { data: session, update } = useSession()


  return (
    <>
    <button onClick={() => signIn()}>Sign In</button>
    <button onClick={() => signOut()}>Sign Out</button>
    </>
  )
}
