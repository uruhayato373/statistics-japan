// import useMediaQuery from '@mui/material/useMediaQuery'

import AdsSquare from 'components/adsense/AdsSquare'
import SimpleBar from 'components/third-party/SimpleBar'

// import { useGetMenuMaster } from 'api/menu'

import Navigation from './Navigation'

export default function DrawerContent() {
  // const { menuMaster } = useGetMenuMaster()
  // const drawerOpen = menuMaster.isDashboardDrawerOpened

  // const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  return (
    <>
      <SimpleBar
        sx={{
          '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Navigation />
        <AdsSquare />
      </SimpleBar>
      {/* <NavUser /> */}
    </>
  )
}
