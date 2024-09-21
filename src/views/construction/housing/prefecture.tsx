import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import BarChartNumberOfHousesByStructure from 'sections/construction/housing/BarChartNumberOfHousesByStructure'
import BarChartNumberOfHousesByYearOfConstruction from 'sections/construction/housing/BarChartNumberOfHousesByYearOfConstruction'
import DashboardTotalNumberOfHouses from 'sections/construction/housing/DashboardTotalNumberOfHouses'
import PieChartNumberOfHomesOwned from 'sections/construction/housing/PieChartNumberOfHomesOwned'
import TableNumberOfApartments from 'sections/construction/housing/TableNumberOfApartments'
import TableNumberOfNewHousingUnitsStarted from 'sections/construction/housing/TableNumberOfNewHousingUnitsStarted'
import TableNumberOfSingleFamilyHomes from 'sections/construction/housing/TableNumberOfSingleFamilyHomes'
import TableNumberOfTenementHouses from 'sections/construction/housing/TableNumberOfTenementHouses'
import TablePerHouse from 'sections/construction/housing/TablePerHouse'
import TableTotalNumberOfHouses from 'sections/construction/housing/TableTotalNumberOfHouses'
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
              <DashboardTotalNumberOfHouses
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PieChartNumberOfHomesOwned
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BarChartNumberOfHousesByStructure
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BarChartNumberOfHousesByYearOfConstruction
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableTotalNumberOfHouses
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfSingleFamilyHomes
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfTenementHouses
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfApartments
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableNumberOfNewHousingUnitsStarted
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TablePerHouse
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
