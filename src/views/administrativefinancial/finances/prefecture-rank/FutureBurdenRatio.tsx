import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import CircularProgressViews from 'components/progress/CircularProgressViews'

import RankingFutureBurdenRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingFutureBurdenRatio'
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
          {/* 将来負担比率 */}
          <PrefectureRankingCards
            Section={RankingFutureBurdenRatio}
            routerProps={routerProps}
          />
        </Grid>
      </Box>
    </Suspense>
  )
}
