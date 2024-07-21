// import { useMemo } from 'react'

// import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

import { MenuOrientation } from 'config'
import useConfig from 'hooks/useConfig'
import DrawerHeader from 'layout/DashboardLayout/Drawer/DrawerHeader'

// import Customization from './Customization'
import FullScreen from './FullScreen'
// import MegaMenuSection from './MegaMenuSection'
// import Message from './Message'
// import MobileSection from './MobileSection'
// import Notification from './Notification'
import SelectKind from './SelectKind'

export default function HeaderContent() {
  const { menuOrientation } = useConfig()

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  // const megaMenu = useMemo(() => <MegaMenuSection />, [])

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && (
        <DrawerHeader open={true} />
      )}

      <SelectKind />
      {/* {!downLG && megaMenu}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />} */}

      {/* <Notification /> */}
      {/* <Message /> */}
      {!downLG && <FullScreen />}
      {/* {!downLG && <Search />} */}
      {/* <Customization /> */}
      {/* {downLG && <MobileSection />} */}
    </>
  )
}
