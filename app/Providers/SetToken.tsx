'use client'
import options from '@/lib/Options'
import { getCookie, setCookie } from 'cookies-next'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useEffect } from 'react'

export default function SetToken({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  //priorities:
  const key = 'accessToken'
  useEffect(() => {
    //create cookie
    setCookie(key, session ? session.accessToken : null)

    //if session exists and tokens do not match update token
    if(session?.accessToken && session.accessToken !== getCookie(key)) {
      setCookie(key, session.accessToken)
    }

    //if session is null set accessToken cookie to null
    if(!session) {
      setCookie(key, null)
    }

  }, [ session ])

    return (
    <>
    { children }
    </>
  )
}
