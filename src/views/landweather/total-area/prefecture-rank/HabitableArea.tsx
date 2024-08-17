import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import RankingHabitableArea from 'sections/landweather/total-area/prefecture-rank/HabitableArea'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'
import CardsAdsResponsive from 'cards/CardsAdsResponsive'

interface Props {
  routerProps: RouterProps
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function HabitableArea({
  routerProps,
  searchParams,
}: Props) {
  const {
    chart,
    table,
    comparison,
    scatterTotalArea,
    perTotalAreaChart,
    perTotalAreaTable,
  } = await RankingHabitableArea({
    searchParams,
  })

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
                  {chart}
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  {table}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
              <CardsAdsResponsive />
            </Grid>
            {/* row 2 */}
            <Grid item xs={12} md={9}>
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
