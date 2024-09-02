import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardAverageAgeOfFirstMarriageHusband from 'sections/population/marriage/DashboardAverageAgeOfFirstMarriageHusband'
import DashboardAverageAgeOfFirstMarriageWife from 'sections/population/marriage/DashboardAverageAgeOfFirstMarriageWife'
import DashboardNumberOfDivorces from 'sections/population/marriage/DashboardNumberOfDivorces'
import DashboardNumberOfMarriages from 'sections/population/marriage/DashboardNumberOfMarriages'
import LineChartUnmarriedPopulation from 'sections/population/marriage/LineChartUnmarriedPopulation'
import PyramidChartBereavementPopulation from 'sections/population/marriage/PyramidChartBereavementPopulation'
import PyramidChartMaritalPopulation from 'sections/population/marriage/PyramidChartMaritalPopulation'
import PyramidChartSeparatedPopulation from 'sections/population/marriage/PyramidChartSeparatedPopulation'
import PyramidChartUnmarriedPopulation from 'sections/population/marriage/PyramidChartUnmarriedPopulation'
import TableMarriage from 'sections/population/marriage/TableMarriage'
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
              <DashboardNumberOfMarriages
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfDivorces
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardAverageAgeOfFirstMarriageHusband
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardAverageAgeOfFirstMarriageWife
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <LineChartUnmarriedPopulation
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <PyramidChartMaritalPopulation
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <PyramidChartUnmarriedPopulation
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <PyramidChartSeparatedPopulation
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <PyramidChartBereavementPopulation
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={7}>
              <TableMarriage
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
