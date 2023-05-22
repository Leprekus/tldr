'use client'
import formatRedditUrl from '@/utils/formatRedditUrl'
import React from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'

export default function ReactPlayerWrapper(props: ReactPlayerProps) {
  return (
    <ReactPlayer {...props} />

  )
}
