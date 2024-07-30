import { Suspense } from 'react'

import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/@extended/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardCloudyDays from 'sections/landweather/weather/DashboardCloudyDays'
import DashboardPrecipitation from 'sections/landweather/weather/DashboardPrecipitation'
import DashboardRainyDays from 'sections/landweather/weather/DashboardRainyDays'
import DashboardSnowDays from 'sections/landweather/weather/DashboardSnowDays'
import DashboardSunnyDays from 'sections/landweather/weather/DashboardSunnyDays'
import DashboardSunshineHours from 'sections/landweather/weather/DashboardSunshineHours'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function WeatherPrecture({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Grid container rowSpacing={4.5} columnSpacing={3}>
          {/* row 1 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardRainyDays routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardCloudyDays routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardSunnyDays routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardSnowDays routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardPrecipitation routerProps={routerProps} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardSunshineHours routerProps={routerProps} />
          </Grid>
        </Grid>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
