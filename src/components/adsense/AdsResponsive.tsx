'use client'

import { useEffect } from 'react'

export default function AdsResponsive() {
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
      style={{ display: 'block' }}
      data-ad-client="ca-pub-7995274743017484"
      data-ad-slot="3260113140"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
