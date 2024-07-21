'use client'

import { lazy } from 'react'

import { usePathname } from 'next/navigation'

import PropTypes from 'prop-types'

// project-import
import { SimpleLayoutType } from 'config'

const Header = lazy(() => import('./Header'))
const FooterBlock = lazy(() => import('./FooterBlock'))

export default function Layout({ children }) {
  const pathname = usePathname()
  const layout =
    pathname === 'landing' || pathname === '/'
      ? SimpleLayoutType.LANDING
      : SimpleLayoutType.SIMPLE

  return (
    <>
      <Header />
      {children}
      <FooterBlock isFull={layout === SimpleLayoutType.LANDING} />
    </>
  )
}

Layout.propTypes = { children: PropTypes.node }
