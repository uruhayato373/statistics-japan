import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import MapChartTotalArea from 'sections/landweather/area/prefecture-rank/MapChartTotalArea'
import RankingTableTotalArea from 'sections/landweather/area/prefecture-rank/RankingTableTotalArea'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function TotalArea({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 0.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} md={10}>
              <Grid container rowSpacing={4.5} columnSpacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <MapChartTotalArea />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <RankingTableTotalArea />
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
