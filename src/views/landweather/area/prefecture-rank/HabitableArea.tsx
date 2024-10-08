import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsAdsResponsive from 'cards/CardsAdsResponsive'

import RankingChartHabitableArea from 'sections/landweather/area/prefecture-rank/RankingChartHabitableArea'
import RankingChartHabitableAreaPerTotalArea from 'sections/landweather/area/prefecture-rank/RankingChartHabitableAreaPerTotalArea'
import RankingTableHabitableArea from 'sections/landweather/area/prefecture-rank/RankingTableHabitableArea'
import RankingTableHabitableAreaPerTotalArea from 'sections/landweather/area/prefecture-rank/RankingTableHabitableAreaPerTotalArea'
import ScatterChartTotalAreaHabitableArea from 'sections/landweather/area/prefecture-rank/ScatterChartTotalAreaHabitableArea'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function HabitableArea({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} md={6}>
              <RankingChartHabitableArea />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingTableHabitableArea />
            </Grid>
            {/* row 2 */}
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
            </Grid>
            {/* row 3 */}
            <Grid item xs={12} md={6}>
              <ScatterChartTotalAreaHabitableArea />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
            </Grid>
            {/* row 4 */}
            <Grid item xs={12} md={6}>
              <RankingChartHabitableAreaPerTotalArea />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingTableHabitableAreaPerTotalArea />
            </Grid>
            {/* row 5 */}
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
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
