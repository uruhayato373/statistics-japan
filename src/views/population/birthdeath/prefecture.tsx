import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import LineChartNumberOfStillbirths from 'sections/population/birthdeath/chart/LineChartNumberOfStillbirths'
import PieChartNumberOfBirthsByMothersAge from 'sections/population/birthdeath/chart/PieChartNumberOfBirthsByMothersAge'
import PyramidChartNumberOfDeaths from 'sections/population/birthdeath/chart/PyramidChartNumberOfDeaths'
import DashboardBirth from 'sections/population/birthdeath/dashboard/DashboardBirth'
import DashboardNumberOfDeaths from 'sections/population/birthdeath/dashboard/DashboardNumberOfDeaths'
import DashboardTotalFertilityRate from 'sections/population/birthdeath/dashboard/DashboardTotalFertilityRate'
import TableBirth from 'sections/population/birthdeath/table/TableBirth'
import TableDeath from 'sections/population/birthdeath/table/TableDeath'
import TableMortalityRate from 'sections/population/birthdeath/table/TableMortalityRate'
import TableNumberOfNeonatalDeaths from 'sections/population/birthdeath/table/TableNumberOfNeonatalDeaths'
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
              <DashboardBirth prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfDeaths prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardTotalFertilityRate prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <PyramidChartNumberOfDeaths prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5}>
              <PieChartNumberOfBirthsByMothersAge
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={8}>
              <LineChartNumberOfStillbirths prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableBirth prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableDeath prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfNeonatalDeaths prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableMortalityRate prefecture={currentPrefecture} />
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
