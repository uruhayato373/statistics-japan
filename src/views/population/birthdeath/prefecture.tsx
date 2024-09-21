import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardBirth from 'sections/population/birthdeath/DashboardBirth'
import DashboardNumberOfDeaths from 'sections/population/birthdeath/DashboardNumberOfDeaths'
import DashboardTotalFertilityRate from 'sections/population/birthdeath/DashboardTotalFertilityRate'
import LineChartNumberOfStillbirths from 'sections/population/birthdeath/LineChartNumberOfStillbirths'
import PieChartNumberOfBirthsByMothersAge from 'sections/population/birthdeath/PieChartNumberOfBirthsByMothersAge'
import PyramidChartNumberOfDeaths from 'sections/population/birthdeath/PyramidChartNumberOfDeaths'
import TableBirth from 'sections/population/birthdeath/TableBirth'
import TableDeath from 'sections/population/birthdeath/TableDeath'
import TableMortalityRate from 'sections/population/birthdeath/TableMortalityRate'
import TableNumberOfNeonatalDeaths from 'sections/population/birthdeath/TableNumberOfNeonatalDeaths'
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
              <DashboardBirth
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfDeaths
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardTotalFertilityRate
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <PyramidChartNumberOfDeaths
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5}>
              <PieChartNumberOfBirthsByMothersAge
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={8}>
              <LineChartNumberOfStillbirths
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableBirth
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableDeath
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfNeonatalDeaths
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableMortalityRate
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
