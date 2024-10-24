import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import CircularProgressViews from 'components/progress/CircularProgressViews'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'
import ViewsHeader from 'components/views/ViewsHeader'

import RankingUnmarriedPopulationMan from 'sections/population/marriage/prefecture-rank/RankingUnmarriedPopulationMan'
import RankingUnmarriedPopulationWoman from 'sections/population/marriage/prefecture-rank/RankingUnmarriedPopulationWoman'

import { ViewsPropsType } from 'types/views'

export default async function PrefectureRankView({
  routerProps,
}: ViewsPropsType) {
  return (
    <Suspense fallback={<CircularProgressViews />}>
      <ViewsHeader routerProps={routerProps} />
      <Box sx={{ mt: 2.5 }}>
        <Grid container rowSpacing={4.5} columnSpacing={3}>
          <PrefectureRankingCards
            Section={RankingUnmarriedPopulationMan}
            routerProps={routerProps}
          />
          <PrefectureRankingCards
            Section={RankingUnmarriedPopulationWoman}
            routerProps={routerProps}
          />
        </Grid>
      </Box>
    </Suspense>
  )
}
