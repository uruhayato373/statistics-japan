import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardDisasterDamageAmount from 'sections/safetyenvironment/disaster-pollution/DashboardDisasterDamageAmount'
import DashboardNumberOfDisasterAffectedHousingUnits from 'sections/safetyenvironment/disaster-pollution/DashboardNumberOfDisasterAffectedHousingUnits'
import DashboardNumberOfPollutionComplaints from 'sections/safetyenvironment/disaster-pollution/DashboardNumberOfPollutionComplaints'
import TableDisasterDamageAmount from 'sections/safetyenvironment/disaster-pollution/TableDisasterDamageAmount'
import TableGreenhouseGasEmissions from 'sections/safetyenvironment/disaster-pollution/TableGreenhouseGasEmissions'
import TableNumberOfFacilitiesGeneratingSootAndSmoke from 'sections/safetyenvironment/disaster-pollution/TableNumberOfFacilitiesGeneratingSootAndSmoke'
import TableNumberOfPollutionComplaints from 'sections/safetyenvironment/disaster-pollution/TableNumberOfPollutionComplaints'
import TablePostalLifeInsurance from 'sections/safetyenvironment/disaster-pollution/TablePostalLifeInsurance'
import TablePrivateLifeInsurance from 'sections/safetyenvironment/disaster-pollution/TablePrivateLifeInsurance'
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
              <DashboardDisasterDamageAmount prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfPollutionComplaints
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfDisasterAffectedHousingUnits
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableDisasterDamageAmount prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfPollutionComplaints
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfFacilitiesGeneratingSootAndSmoke
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableGreenhouseGasEmissions prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TablePrivateLifeInsurance prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TablePostalLifeInsurance prefecture={currentPrefecture} />
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
