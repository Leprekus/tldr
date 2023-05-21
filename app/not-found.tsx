'use client'
import React from 'react'
import Error from './components/Error'

export default function NotFound() {
  const error ={ error: 404, message: 'Page Not Found' }
  return (
   <Error error={error}/>
  )
}
