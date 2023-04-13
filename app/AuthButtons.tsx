'use client'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'

export default function Button() {
  return (
    <>
    <button onClick={() => signIn()}>Sign In</button>
    <button onClick={() => signOut()}>Sign Out</button>
    </>
  )
}
