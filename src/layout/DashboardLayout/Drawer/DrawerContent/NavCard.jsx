import Stack from '@mui/material/Stack'

import AdsResponsive from 'components/adsense/AdsResponsive'
import MainCard from 'components/MainCard'

export default function NavCard() {
  return (
    <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
      <Stack alignItems="center">
        <AdsResponsive />
      </Stack>
    </MainCard>
  )
}
