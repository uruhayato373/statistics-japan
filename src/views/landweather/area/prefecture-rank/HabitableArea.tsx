import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import MapChartHabitableAreaClient from 'sections/landweather/area/prefecture-rank/MapChartHabitableAreaClient'
import RankingTableHabitableAreaClient from 'sections/landweather/area/prefecture-rank/RankingTableHabitableAreaClient'
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
                  <MapChartHabitableAreaClient />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <RankingTableHabitableAreaClient />
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} md={2}>
              <CardsAdsResponsive />
            </Grid> */}
            {/* row 2 */}
            {/* <Grid item xs={12} md={9}>
              {comparison}
            </Grid>
            <Grid item xs={12} md={3}>
              <CardsAdsResponsive height={'300px'} />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              {scatterTotalArea}
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <CardsAdsResponsive />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              {perTotalAreaChart}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
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
