import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import MixedChartConstructionStarts from 'sections/construction/construction/chart/MixedChartConstructionStarts'
import MixedChartPublicWorksContract from 'sections/construction/construction/chart/MixedChartPublicWorksContract'
import DashboardConstructionCompanies from 'sections/construction/construction/dashboard/DashboardConstructionCompanies'
import DashboardValueOfCompletedConstructionWorkByPrimeContractors from 'sections/construction/construction/dashboard/DashboardValueOfCompletedConstructionWorkByPrimeContractors'
import DashboardValueOfCompletedConstructionWorkBySubcontractors from 'sections/construction/construction/dashboard/DashboardValueOfCompletedConstructionWorkBySubcontractors'
import TableConstructionCompanies from 'sections/construction/construction/table/TableConstructionCompanies'
import TableConstructionStarts from 'sections/construction/construction/table/TableConstructionStarts'
import TablePublicWorksContract from 'sections/construction/construction/table/TablePublicWorksContract'
import TableValueOfCompletedConstructionWorkByPrimeContractors from 'sections/construction/construction/table/TableValueOfCompletedConstructionWorkByPrimeContractors'
import TableValueOfCompletedConstructionWorkBySubcontractors from 'sections/construction/construction/table/TableValueOfCompletedConstructionWorkBySubcontractors'
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
              <DashboardConstructionCompanies prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardValueOfCompletedConstructionWorkByPrimeContractors
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardValueOfCompletedConstructionWorkBySubcontractors
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <MixedChartPublicWorksContract prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <MixedChartConstructionStarts prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableConstructionCompanies prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableConstructionStarts prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableValueOfCompletedConstructionWorkByPrimeContractors
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableValueOfCompletedConstructionWorkBySubcontractors
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TablePublicWorksContract prefecture={currentPrefecture} />
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
