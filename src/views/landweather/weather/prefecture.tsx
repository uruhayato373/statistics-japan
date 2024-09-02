import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardAveHum from 'sections/landweather/weather/DashboardAveHum'
import DashboardAverageTemperature from 'sections/landweather/weather/DashboardAverageTemperature'
import DashboardLowestTemperature from 'sections/landweather/weather/DashboardLowestTemperature'
import DashboardMaximumTemperature from 'sections/landweather/weather/DashboardMaximumTemperature'
import DashboardPrecipitation from 'sections/landweather/weather/DashboardPrecipitation'
import DashboardRainyDays from 'sections/landweather/weather/DashboardRainyDays'
import DashboardSunshineHours from 'sections/landweather/weather/DashboardSunshineHours'
import LineChartPrecipitation from 'sections/landweather/weather/LineChartPrecipitation'
import LineChartTemplatures from 'sections/landweather/weather/LineChartTemplatures'
import SourceAnnotationWeather from 'sections/landweather/weather/SourceAnnotationWeather'
import TableDays from 'sections/landweather/weather/TableDays'
import TableTemplatures from 'sections/landweather/weather/TableTemplatures'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function Prefecture({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
    const { currentPrefecture } = breadcrumbsProps

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardSunshineHours
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardRainyDays
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardPrecipitation
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardMaximumTemperature
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardLowestTemperature
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardAverageTemperature
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardAveHum
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <LineChartTemplatures
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <LineChartPrecipitation
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <TableTemplatures
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <TableDays
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <SourceAnnotationWeather />
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
