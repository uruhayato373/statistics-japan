import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import CircularProgressViews from 'components/progress/CircularProgressViews'

import RankingTotalRevenueSettlement from 'sections/administrativefinancial/finances/prefecture-rank/RankingTotalRevenueSettlement'
import { RouterProps } from 'utils/props'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'
import ViewsHeader from 'views-grid/ViewsHeader'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <Suspense fallback={<CircularProgressViews />}>
      <ViewsHeader routerProps={routerProps} />
      <Box sx={{ mt: 2.5 }}>
        <Grid container rowSpacing={4.5} columnSpacing={3}>
          {/* 歳入決算総額 */}
          <PrefectureRankingCards
            Section={RankingTotalRevenueSettlement}
            routerProps={routerProps}
          />
        </Grid>
      </Box>
    </Suspense>
  )
}
