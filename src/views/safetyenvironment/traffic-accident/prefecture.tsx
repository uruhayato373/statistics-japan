import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardNumberOfTrafficAccidentCasualties from 'sections/safetyenvironment/traffic-accident/DashboardNumberOfTrafficAccidentCasualties'
import DashboardNumberOfTrafficAccidents from 'sections/safetyenvironment/traffic-accident/DashboardNumberOfTrafficAccidents'
import DashboardTrafficAccidentFatalities from 'sections/safetyenvironment/traffic-accident/DashboardTrafficAccidentFatalities'
import LineChartNumberOfTrafficAccidentCasualties from 'sections/safetyenvironment/traffic-accident/LineChartNumberOfTrafficAccidentCasualties'
import TableAutomobileLiabilityInsurance from 'sections/safetyenvironment/traffic-accident/TableAutomobileLiabilityInsurance'
import TableNumberOfDrivingLicenseHolders from 'sections/safetyenvironment/traffic-accident/TableNumberOfDrivingLicenseHolders'
import TableNumberOfPeopleTakingCoursesForTheElderly from 'sections/safetyenvironment/traffic-accident/TableNumberOfPeopleTakingCoursesForTheElderly'
import TableTrafficAccident from 'sections/safetyenvironment/traffic-accident/TableTrafficAccident'
import TableVoluntaryCarInsurance from 'sections/safetyenvironment/traffic-accident/TableVoluntaryCarInsurance'
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
              <DashboardNumberOfTrafficAccidents
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfTrafficAccidentCasualties
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardTrafficAccidentFatalities
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChartNumberOfTrafficAccidentCasualties
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableTrafficAccident prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableVoluntaryCarInsurance prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableAutomobileLiabilityInsurance
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfDrivingLicenseHolders
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfPeopleTakingCoursesForTheElderly
                prefecture={currentPrefecture}
              />
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
