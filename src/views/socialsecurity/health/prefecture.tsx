import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import ColumnChartNumberOfDeathsDueToLifestyleRelatedDiseases from 'sections/socialsecurity/health/ColumnChartNumberOfDeathsDueToLifestyleRelatedDiseases'
import ColumnChartNumberOfDeathsDueToMalignantTumors from 'sections/socialsecurity/health/ColumnChartNumberOfDeathsDueToMalignantTumors'
import DashboardFoodSelfSufficiencyRate from 'sections/socialsecurity/health/DashboardFoodSelfSufficiencyRate'
import LineChartNumberOfDeaths from 'sections/socialsecurity/health/LineChartNumberOfDeaths'
import TableHealthyLifeExpectancy from 'sections/socialsecurity/health/TableHealthyLifeExpectancy'
import TableNumberOfPeopleUndergoingCancerScreening from 'sections/socialsecurity/health/TableNumberOfPeopleUndergoingCancerScreening'
import TableNumberOfPeopleUndergoingHealthCheckups from 'sections/socialsecurity/health/TableNumberOfPeopleUndergoingHealthCheckups'
import TablePregnancy from 'sections/socialsecurity/health/TablePregnancy'
import TableTestInspection from 'sections/socialsecurity/health/TableTestInspection'
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
              <DashboardFoodSelfSufficiencyRate
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <LineChartNumberOfDeaths
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <ColumnChartNumberOfDeathsDueToLifestyleRelatedDiseases
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <ColumnChartNumberOfDeathsDueToMalignantTumors
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TableHealthyLifeExpectancy
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TableNumberOfPeopleUndergoingHealthCheckups
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TablePregnancy
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TableTestInspection
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TableNumberOfPeopleUndergoingCancerScreening
                routerProps={routerProps}
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