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
      style={{ display: 'inline-block', width: '250px', height: '250px' }}
      data-ad-client="ca-pub-7995274743017484"
      data-ad-slot="1514473550"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
