import Box from '@mui/material/Box'

import AdsDashboard from 'components/adsense/AdsDashboard'
import MainCard from 'components/MainCard'

export default function CardsAdsDashboard() {
  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2, pb: 0, height: '250px' }}>
        <AdsDashboard />
      </Box>
    </MainCard>
  )
}
