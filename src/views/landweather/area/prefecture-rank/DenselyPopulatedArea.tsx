import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsAdsResponsive from 'cards/CardsAdsResponsive'

import RankingChartDenselyPopulatedArea from 'sections/landweather/area/prefecture-rank/RankingChartDenselyPopulatedArea'
import RankingChartDenselyPopulatedAreaPerHabitableArea from 'sections/landweather/area/prefecture-rank/RankingChartDenselyPopulatedAreaPerHabitableArea'
import RankingChartDenselyPopulatedAreaPerTotalArea from 'sections/landweather/area/prefecture-rank/RankingChartDenselyPopulatedAreaPerTotalArea'
import RankingTableDenselyPopulatedArea from 'sections/landweather/area/prefecture-rank/RankingTableDenselyPopulatedArea'
import RankingTableDenselyPopulatedAreaPerHabitableArea from 'sections/landweather/area/prefecture-rank/RankingTableDenselyPopulatedAreaPerHabitableArea'
import RankingTableDenselyPopulatedAreaPerTotalArea from 'sections/landweather/area/prefecture-rank/RankingTableDenselyPopulatedAreaPerTotalArea'
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
              <RankingChartDenselyPopulatedArea />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingTableDenselyPopulatedArea />
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
              <RankingChartDenselyPopulatedAreaPerTotalArea />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingTableDenselyPopulatedAreaPerTotalArea />
            </Grid>
            {/* row 4 */}
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
            </Grid>
            {/* row 5 */}
            <Grid item xs={12} md={6}>
              <RankingChartDenselyPopulatedAreaPerHabitableArea />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingTableDenselyPopulatedAreaPerHabitableArea />
            </Grid>
            {/* row 6 */}
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
