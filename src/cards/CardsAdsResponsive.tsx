import Box from '@mui/material/Box'

import AdsResponsive from 'components/adsense/AdsResponsive'
import MainCard from 'components/MainCard'

interface Props {
  height?: string
}

export default function CardsAdsResponsive({ height = '600px' }: Props) {
  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2, pb: 0, height }}>
        <AdsResponsive />
      </Box>
    </MainCard>
  )
}
