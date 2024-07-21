import { useEffect } from 'react'

import { usePathname } from 'next/navigation'

import PropTypes from 'prop-types'

export default function ScrollTop({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname])

  return children || null
}

ScrollTop.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any, PropTypes.node]),
}
