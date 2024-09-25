import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardConstructionCompanies from 'sections/construction/construction/DashboardConstructionCompanies'
import DashboardValueOfCompletedConstructionWorkByPrimeContractors from 'sections/construction/construction/DashboardValueOfCompletedConstructionWorkByPrimeContractors'
import DashboardValueOfCompletedConstructionWorkBySubcontractors from 'sections/construction/construction/DashboardValueOfCompletedConstructionWorkBySubcontractors'
import MixedChartConstructionStarts from 'sections/construction/construction/MixedChartConstructionStarts'
import MixedChartPublicWorksContract from 'sections/construction/construction/MixedChartPublicWorksContract'
import TableConstructionCompanies from 'sections/construction/construction/TableConstructionCompanies'
import TableConstructionStarts from 'sections/construction/construction/TableConstructionStarts'
import TablePublicWorksContract from 'sections/construction/construction/TablePublicWorksContract'
import TableValueOfCompletedConstructionWorkByPrimeContractors from 'sections/construction/construction/TableValueOfCompletedConstructionWorkByPrimeContractors'
import TableValueOfCompletedConstructionWorkBySubcontractors from 'sections/construction/construction/TableValueOfCompletedConstructionWorkBySubcontractors'
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
              <DashboardConstructionCompanies
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardValueOfCompletedConstructionWorkByPrimeContractors
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardValueOfCompletedConstructionWorkBySubcontractors
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <MixedChartPublicWorksContract
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <MixedChartConstructionStarts
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableConstructionCompanies
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableConstructionStarts
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableValueOfCompletedConstructionWorkByPrimeContractors
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableValueOfCompletedConstructionWorkBySubcontractors
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TablePublicWorksContract
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
