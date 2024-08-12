import useMediaQuery from '@mui/material/useMediaQuery'

import AdsResponsive from 'components/adsense/AdsResponsive'
import SimpleBar from 'components/third-party/SimpleBar'

import { useGetMenuMaster } from 'api/menu'

import Navigation from './Navigation'

export default function DrawerContent() {
  const { menuMaster } = useGetMenuMaster()
  const drawerOpen = menuMaster.isDashboardDrawerOpened

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'))

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
        {drawerOpen && !downLG && <AdsResponsive />}
      </SimpleBar>
      {/* <NavUser /> */}
    </>
  )
}
