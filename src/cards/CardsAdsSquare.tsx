import Box from '@mui/material/Box'

import AdsSquare from 'components/adsense/AdsSquare'
import MainCard from 'components/MainCard'

export default function CardsAdsSquare() {
  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2, pb: 0, height: '250px' }}>
        <AdsSquare />
      </Box>
    </MainCard>
  )
}
