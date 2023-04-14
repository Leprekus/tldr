'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function AuthButtons() {
 const { data: session } = useSession()
  const handleSignIn = async() => {
    const req = await fetch('/api/auth/signin')
    const res = await req.json()
    console.log(res)

  
  }
  return (
    <>
    <button onClick={() => signIn()}>Sign In</button>
    <button onClick={() => signOut()}>Sign Out</button>
    <button onClick={handleSignIn}>test</button>
    </>
  )
}
