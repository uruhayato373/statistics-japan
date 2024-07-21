'use client'

import { useEffect } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import { pageview } from 'libs/gtag'

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      pageview(pathname)
    }
  }, [pathname, searchParams])

  return null
}
