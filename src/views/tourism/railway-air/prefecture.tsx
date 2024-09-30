import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardAirTransportPersonnel from 'sections/tourism/railway-air/DashboardAirTransportPersonnel'
import DashboardJRCargoShipmentVolume from 'sections/tourism/railway-air/DashboardJRCargoShipmentVolume'
import DashboardJRTransportationPersonnel from 'sections/tourism/railway-air/DashboardJRTransportationPersonnel'
import DashboardPassengerShipTransportPersonnel from 'sections/tourism/railway-air/DashboardPassengerShipTransportPersonnel'
import DashboardPrivateRailwayTransportationPersonnel from 'sections/tourism/railway-air/DashboardPrivateRailwayTransportationPersonnel'
import LineChartPassengerTransport from 'sections/tourism/railway-air/LineChartPassengerTransport'
import MixedChartAirTransport from 'sections/tourism/railway-air/MixedChartAirTransport'
import MixedChartJapanRailwayTransport from 'sections/tourism/railway-air/MixedChartJapanRailwayTransport'
import MixedChartPassengerShipTransportation from 'sections/tourism/railway-air/MixedChartPassengerShipTransportation'
import TableBusinessOperator from 'sections/tourism/railway-air/TableBusinessOperator'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureView({ routerProps }: Props) {
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
              <DashboardJRCargoShipmentVolume prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardJRTransportationPersonnel
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardPrivateRailwayTransportationPersonnel
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardAirTransportPersonnel prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardPassengerShipTransportPersonnel
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <MixedChartJapanRailwayTransport prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <MixedChartAirTransport prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <MixedChartPassengerShipTransportation
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <LineChartPassengerTransport prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TableBusinessOperator prefecture={currentPrefecture} />
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
