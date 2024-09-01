import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import AreaChartTotalArea from 'sections/landweather/area/AreaChartTotalArea'
import DashboardDenselyPopulatedArea from 'sections/landweather/area/DashboardDenselyPopulatedArea'
import DashboardForestArea from 'sections/landweather/area/DashboardForestArea'
import DashboardHabitableArea from 'sections/landweather/area/DashboardHabitableArea'
import DashboardTotalArea from 'sections/landweather/area/DashboardTotalArea'
import PieChartHabitableArea from 'sections/landweather/area/PieChartHabitableArea'
import TableParkArea from 'sections/landweather/area/TableParkArea'
import TableTotalArea from 'sections/landweather/area/TableTotalArea'
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
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <DashboardTotalArea
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <DashboardHabitableArea
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <DashboardForestArea
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <DashboardDenselyPopulatedArea
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={6} lg={3}>
              <CardsAdsResponsive height={'150px'} />
            </Grid> */}
            {/* row 2 */}
            <Grid item xs={12} sm={12} md={12} lg={7}>
              <AreaChartTotalArea
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5}>
              <PieChartHabitableArea
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TableTotalArea
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TableParkArea
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
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
