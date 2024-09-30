import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardNumberOfFireStations from 'sections/safetyenvironment/fire/DashboardNumberOfFireStations'
import TableEmergencyDispatch from 'sections/safetyenvironment/fire/TableEmergencyDispatch'
import TableFireDepartment from 'sections/safetyenvironment/fire/TableFireDepartment'
import TableFireEngineDispatched from 'sections/safetyenvironment/fire/TableFireEngineDispatched'
import TableFireInsurance from 'sections/safetyenvironment/fire/TableFireInsurance'
import TableFireWaterSupply from 'sections/safetyenvironment/fire/TableFireWaterSupply'
import TableNumberOfFireCasualties from 'sections/safetyenvironment/fire/TableNumberOfFireCasualties'
import TableNumberOfFires from 'sections/safetyenvironment/fire/TableNumberOfFires'
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
              <DashboardNumberOfFireStations prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableFireDepartment prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableFireWaterSupply prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableFireEngineDispatched prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableEmergencyDispatch prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfFires prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfFireCasualties prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableFireInsurance prefecture={currentPrefecture} />
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
