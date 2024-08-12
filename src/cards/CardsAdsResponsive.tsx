import Box from '@mui/material/Box'

import AdsResponsive from 'components/adsense/AdsResponsive'
import MainCard from 'components/MainCard'

export default function CardsAdsResponsive() {
  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2, pb: 0, height: '600px' }}>
        <AdsResponsive />
      </Box>
    </MainCard>
  )
}
