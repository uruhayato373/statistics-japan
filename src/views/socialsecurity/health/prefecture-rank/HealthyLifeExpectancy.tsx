import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import RankingChartHealthyLifeExpectancyMan from 'sections/socialsecurity/health/prefecture-rank/RankingChartHealthyLifeExpectancyMan'
import RankingChartHealthyLifeExpectancyWoman from 'sections/socialsecurity/health/prefecture-rank/RankingChartHealthyLifeExpectancyWoman'
import RankingTableHealthyLifeExpectancyMan from 'sections/socialsecurity/health/prefecture-rank/RankingTableHealthyLifeExpectancyMan'
import RankingTableHealthyLifeExpectancyWoman from 'sections/socialsecurity/health/prefecture-rank/RankingTableHealthyLifeExpectancyWoman'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} md={6} lg={6}>
              <RankingChartHealthyLifeExpectancyMan routerProps={routerProps} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <RankingTableHealthyLifeExpectancyMan routerProps={routerProps} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <RankingChartHealthyLifeExpectancyWoman
                routerProps={routerProps}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <RankingTableHealthyLifeExpectancyWoman
                routerProps={routerProps}
              />
            </Grid>
          </Grid>
        </Box>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
