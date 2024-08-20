import { Suspense } from 'react'

import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsAdsResponsive from 'cards/CardsAdsResponsive'

import ApexAreaChartTotalArea from 'sections/landweather/total-area/ApexAreaChartTotalArea'
import DashboardForestLandArea from 'sections/landweather/total-area/DashboardForestLandArea'
import DashboardHabitableArea from 'sections/landweather/total-area/DashboardHabitableArea'
import DashboardTotalArea from 'sections/landweather/total-area/DashboardTotalArea'
import PieChartHabitableArea from 'sections/landweather/total-area/PieChartHabitableArea'
import TableParks from 'sections/landweather/total-area/TableParks'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function TotalAreaPrefecture({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
    const { currentPrefecture } = breadcrumbsProps

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Grid container rowSpacing={4.5} columnSpacing={3}>
          {/* row 1 */}
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <DashboardTotalArea routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <DashboardHabitableArea routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <DashboardForestLandArea routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <CardsAdsResponsive height={'150px'} />
          </Grid>
          {/* row 2 */}
          <Grid item xs={12} sm={12} md={12} lg={7}>
            <ApexAreaChartTotalArea prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={5}>
            <PieChartHabitableArea prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <TableParks routerProps={routerProps} />
          </Grid>
        </Grid>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
