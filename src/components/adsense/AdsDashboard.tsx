'use client'

import { useEffect } from 'react'

export default function AdsSquare() {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'inline-block', width: '200px', height: '100px' }}
      data-ad-client="ca-pub-7995274743017484"
      data-ad-slot="9312875747"
    />
  )
}
