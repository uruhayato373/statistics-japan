'use client'
import { useEffect, useState } from 'react'

import MainBlock from 'sections/landing/MainBlock'

export default function Landing() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const listenToScroll = () => {
      let heightToHideFrom = 250
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop

      if (winScroll > heightToHideFrom) {
        setVisible(true)
      } else {
        visible && setVisible(false)
      }
    }

    window.addEventListener('scroll', listenToScroll)
    return () => window.removeEventListener('scroll', listenToScroll)
  }, [visible])

  return (
    <>
      <MainBlock />
    </>
  )
}
