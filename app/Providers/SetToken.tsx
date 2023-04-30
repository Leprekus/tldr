'use client'
import options from '@/lib/Options'
import { getCookie, setCookie } from 'cookies-next'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect } from 'react'

export default function SetToken({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  //priorities:
  const key = 'session'
  const cookieToken = JSON.parse(getCookie(key)) 

  useEffect(() => {
    
      const setServerCookie = () => {
        //set session in cookie to null if there is no session
      if(!session) {
        setCookie(key, null)
      }

    //if session exists and tokens do not match update token
    if(session && session?.accessToken !== cookieToken?.accessToken) {
      setCookie(key, { 
        accessToken :session.accessToken, 
        name: session.user.name,
        accessTokenExpires: Date.parse(session.expires) 
      })

      //if session exists and cookie is null create session
      if(!cookieToken && session) {
        setCookie(key, {
          accessToken :session.accessToken, 
          name: session.user.name,
          accessTokenExpires: Date.parse(session.expires)
        })
      }

      }
      window.addEventListener('onload', () => setServerCookie)
      return () => window.removeEventListener('onload', setServerCookie)
    }

  }, [ session ])
  console.log({ cookieToken })
    return (
    <>
    { children }
    </>
  )
}
