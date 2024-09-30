import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsAdsResponsive from 'cards/CardsAdsResponsive'

import RankingChartLowestTemperature from 'sections/landweather/weather/prefecture-rank/RankingChartLowestTemperature'
import RankingTableLowestTemperature from 'sections/landweather/weather/prefecture-rank/RankingTableLowestTemperature'
import SourceLowestTemperature from 'sections/landweather/weather/prefecture-rank/SourceLowestTemperature'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function LowestTemperature({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} md={6}>
              <RankingChartLowestTemperature />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingTableLowestTemperature />
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
              <SourceLowestTemperature />
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
