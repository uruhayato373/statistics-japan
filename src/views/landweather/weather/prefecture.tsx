import { Suspense } from 'react'

import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardAveHum from 'sections/landweather/weather/DashboardAveHum'
import DashboardAveTemp from 'sections/landweather/weather/DashboardAveTemp'
import DashboardMaxTemp from 'sections/landweather/weather/DashboardMaxTemp'
import DashboardMinTemp from 'sections/landweather/weather/DashboardMinTemp'
import DashboardPrecipitation from 'sections/landweather/weather/DashboardPrecipitation'
import DashboardRainyDays from 'sections/landweather/weather/DashboardRainyDays'
import DashboardSunshineHours from 'sections/landweather/weather/DashboardSunshineHours'
import Precipitation from 'sections/landweather/weather/Precipitation'
import TableDays from 'sections/landweather/weather/TableDays'
import TableTemplatures from 'sections/landweather/weather/TableTemplatures'
import Templatures from 'sections/landweather/weather/Templatures'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function Prefecture({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Grid container rowSpacing={4.5} columnSpacing={3}>
          {/* row 1 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardSunshineHours routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardRainyDays routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardPrecipitation routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardMaxTemp routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardMinTemp routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardAveTemp routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardAveHum routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <Templatures routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <Precipitation routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TableTemplatures routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TableDays routerProps={routerProps} />
          </Grid>
        </Grid>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
