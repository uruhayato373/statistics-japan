import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import { actionSaveJapan } from 'actions/saveJapan'
import DashboardNumberOfManufacturingEmployees from 'sections/miningindustry/products/DashboardNumberOfManufacturingEmployees'
import DashboardNumberOfManufacturingEstablishments from 'sections/miningindustry/products/DashboardNumberOfManufacturingEstablishments'
import DashboardProductShipmentAmount from 'sections/miningindustry/products/DashboardProductShipmentAmount'
import TableProductShipmentAmount from 'sections/miningindustry/products/TableProductShipmentAmount'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function JapanView({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    const title = breadcrumbsProps.currentMenu.menuTitle
    await actionSaveJapan(title, routerProps)

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
              <DashboardProductShipmentAmount prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfManufacturingEstablishments
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfManufacturingEmployees
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={7}>
              <TableProductShipmentAmount prefecture={currentPrefecture} />
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
