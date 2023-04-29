'use client'
import options from '@/lib/Options'
import { getCookie, setCookie } from 'cookies-next'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect } from 'react'

export default function SetToken({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  //priorities:
  const key = 'session'
  useEffect(() => {
    //set session in cookie or null if there is no session
    setCookie(key, session ? { 
      accessToken :session.accessToken,
      name: session.user.name,
      accessTokenExpires: session.expires
      }
        : null)

    //if session exists and tokens do not match update token
    if(session?.accessToken && session.accessToken !== getCookie(key)) {
      setCookie(key, { accessToken :session.accessToken, name: session.user.name })
    }

  }, [ session ])
  console.log({ clientTOken: session?.accessToken })
    return (
    <>
    { children }
    </>
  )
}
