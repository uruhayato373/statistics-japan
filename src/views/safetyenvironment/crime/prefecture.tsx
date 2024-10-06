import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardNumberOfPoliceOfficers from 'sections/safetyenvironment/crime/dashboard/DashboardNumberOfPoliceOfficers'
import MixedChartProstitutionOffender from 'sections/safetyenvironment/crime/MixedChartProstitutionOffender'
import MixedChartSpecialLawOffender from 'sections/safetyenvironment/crime/MixedChartSpecialLawOffender'
import TableCrimePreventionVolunteer from 'sections/safetyenvironment/crime/table/TableCrimePreventionVolunteer'
import TableIncident from 'sections/safetyenvironment/crime/table/TableIncident'
import TableNumberOfCriminalOffensesCleared from 'sections/safetyenvironment/crime/table/TableNumberOfCriminalOffensesCleared'
import TableNumberOfPeopleArrestedForCriminalLawCrimes from 'sections/safetyenvironment/crime/table/TableNumberOfPeopleArrestedForCriminalLawCrimes'
import TableNumberOfPeopleArrestedForJuvenileCriminalLawOffenses from 'sections/safetyenvironment/crime/table/TableNumberOfPeopleArrestedForJuvenileCriminalLawOffenses'
import TableNumberOfRecognizedCriminalLawOffenses from 'sections/safetyenvironment/crime/table/TableNumberOfRecognizedCriminalLawOffenses'
import TableRoadTrafficLawViolation from 'sections/safetyenvironment/crime/table/TableRoadTrafficLawViolation'
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
              <DashboardNumberOfPoliceOfficers prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MixedChartSpecialLawOffender prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MixedChartProstitutionOffender prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfRecognizedCriminalLawOffenses
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfCriminalOffensesCleared
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfPeopleArrestedForCriminalLawCrimes
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfPeopleArrestedForJuvenileCriminalLawOffenses
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableRoadTrafficLawViolation prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableIncident prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableCrimePreventionVolunteer prefecture={currentPrefecture} />
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
