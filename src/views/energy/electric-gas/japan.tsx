import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardCityGasSalesVolume from 'sections/energy/electric-gas/dashboard/DashboardCityGasSalesVolume'
import DashboardElectricityConsumptionForElectricLights from 'sections/energy/electric-gas/dashboard/DashboardElectricityConsumptionForElectricLights'
import DashboardElectricityDemand from 'sections/energy/electric-gas/dashboard/DashboardElectricityDemand'
import DashboardGasolineSalesVolume from 'sections/energy/electric-gas/dashboard/DashboardGasolineSalesVolume'
import DashboardGeneratedPowerAmount from 'sections/energy/electric-gas/dashboard/DashboardGeneratedPowerAmount'
import TableCityGas from 'sections/energy/electric-gas/table/TableCityGas'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function JapanView({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    const currentPrefecture = {
      prefCode: '00000',
      prefName: '日本',
    }

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardCityGasSalesVolume prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardElectricityDemand prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardGasolineSalesVolume prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardGeneratedPowerAmount prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardElectricityConsumptionForElectricLights
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={7}>
              <TableCityGas prefecture={currentPrefecture} />
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
