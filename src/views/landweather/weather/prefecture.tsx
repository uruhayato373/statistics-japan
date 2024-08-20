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
import LineChartPrecipitation from 'sections/landweather/weather/LineChartPrecipitation'
import LineChartTemplatures from 'sections/landweather/weather/LineChartTemplatures'
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
        <Grid container rowSpacing={4.5} columnSpacing={3}>
          {/* row 1 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardSunshineHours prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardRainyDays prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardPrecipitation prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardMaxTemp prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardMinTemp prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardAveTemp prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <DashboardAveHum prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <LineChartTemplatures prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <LineChartPrecipitation prefecture={currentPrefecture} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TableTemplatures prefecture={currentPrefecture}  />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TableDays prefecture={currentPrefecture}  />
          </Grid>
        </Grid>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
