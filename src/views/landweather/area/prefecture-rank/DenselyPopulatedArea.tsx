import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import MapChartDenselyPopulatedArea from 'sections/landweather/area/prefecture-rank/MapChartDenselyPopulatedArea'
import MapChartDenselyPopulatedAreaPerHabitableArea from 'sections/landweather/area/prefecture-rank/MapChartDenselyPopulatedAreaPerHabitableArea'
import MapChartDenselyPopulatedAreaPerTotalArea from 'sections/landweather/area/prefecture-rank/MapChartDenselyPopulatedAreaPerTotalArea'
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
            <Grid item xs={12} md={10}>
              <Grid container rowSpacing={4.5} columnSpacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <MapChartDenselyPopulatedArea routerProps={routerProps} />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <RankingTableDenselyPopulatedArea routerProps={routerProps} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MapChartDenselyPopulatedAreaPerTotalArea
                routerProps={routerProps}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <RankingTableDenselyPopulatedAreaPerTotalArea
                routerProps={routerProps}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MapChartDenselyPopulatedAreaPerHabitableArea
                routerProps={routerProps}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <RankingTableDenselyPopulatedAreaPerHabitableArea
                routerProps={routerProps}
              />
            </Grid>
            {/* <Grid item xs={12} md={2}>
              <CardsAdsResponsive />
            </Grid> */}
            {/* row 2 */}
            {/* <Grid item xs={12} md={9}>
              <ScatterChartTotalAreaHabitableArea routerProps={routerProps} />
            </Grid> */}
            {/* <Grid item xs={12} md={3}>
              <CardsAdsResponsive height={'300px'} />
            </Grid> */}

            {/* <Grid item xs={12} md={12} lg={6}>
              <CardsAdsResponsive />
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={6}>
              {perTotalAreaChart}
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={6}>
              {perTotalAreaTable}
            </Grid> */}
          </Grid>
        </Box>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
