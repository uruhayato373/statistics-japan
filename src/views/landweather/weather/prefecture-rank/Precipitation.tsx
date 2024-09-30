import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsAdsResponsive from 'cards/CardsAdsResponsive'

import RankingChartPrecipitation from 'sections/landweather/weather/prefecture-rank/RankingChartPrecipitation'
import RankingChartPrecipitationPerRainyDays from 'sections/landweather/weather/prefecture-rank/RankingChartPrecipitationPerRainyDays'
import RankingTablePrecipitation from 'sections/landweather/weather/prefecture-rank/RankingTablePrecipitation'
import RankingTablePrecipitationPerRainyDays from 'sections/landweather/weather/prefecture-rank/RankingTablePrecipitationPerRainyDays'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function Precipitation({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} md={6}>
              <RankingChartPrecipitation />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingTablePrecipitation />
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
              <RankingChartPrecipitationPerRainyDays />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingTablePrecipitationPerRainyDays />
            </Grid>
            {/* row 4 */}
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
