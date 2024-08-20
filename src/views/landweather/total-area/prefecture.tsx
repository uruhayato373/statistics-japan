import { Suspense } from 'react'

import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import ApexChartTotalArea from 'sections/landweather/total-area/ApexChartTotalArea'
import ApexPie from 'sections/landweather/total-area/ApexPie'
import DashboardForestLandArea from 'sections/landweather/total-area/DashboardForestLandArea'
import DashboardHabitableArea from 'sections/landweather/total-area/DashboardHabitableArea'
import DashboardTotalArea from 'sections/landweather/total-area/DashboardTotalArea'
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
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardTotalArea routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardHabitableArea routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardForestLandArea routerProps={routerProps} />
          </Grid>
          {/* row 2 */}
          <Grid item xs={12} sm={6} md={4} lg={8}>
            <ApexChartTotalArea prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <ApexPie routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
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
