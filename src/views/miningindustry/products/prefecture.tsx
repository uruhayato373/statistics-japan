import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import { actionSavePrefecture } from 'actions/savePrefecture'
import PieChartProductShipmentAmountByIndustrialClassification from 'sections/miningindustry/products/PieChartProductShipmentAmountByIndustrialClassification'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureView({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
    const { currentPrefecture } = breadcrumbsProps

    const title = breadcrumbsProps.currentMenu.menuTitle
    await actionSavePrefecture(title, routerProps)

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardProductShipmentAmount
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfManufacturingEstablishments
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfManufacturingEmployees
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MixedChartProductShipmentAmount
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <LineChartNumberOfManufacturing
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid> */}
            <Grid item xs={12} md={6} lg={6}>
              <PieChartProductShipmentAmountByIndustrialClassification
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={8}>
              <TableProductShipmentAmount
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid> */}
          </Grid>
        </Box>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
