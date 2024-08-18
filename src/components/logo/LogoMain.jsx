'use client'
import Image from 'next/image'

import PropTypes from 'prop-types'

export default function LogoMain() {
  const logoLight = '/assets/images/logo.png'

  return (
    <Image
      src={logoLight}
      alt="statistics-japan"
      width={200}
      height={35}
      priority
    />
  )
}

LogoMain.propTypes = {
  reverse: PropTypes.bool,
}
