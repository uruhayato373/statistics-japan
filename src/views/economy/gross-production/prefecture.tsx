import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardGrossPrefecturalProduct from 'sections/economy/gross-production/DashboardGrossPrefecturalProduct'
import PieGrossPrefecturalProduct from 'sections/economy/gross-production/PieGrossPrefecturalProduct'
import TableGrossPrefecturalProduct from 'sections/economy/gross-production/TableGrossPrefecturalProduct'
import TablePrefecturalIncome from 'sections/economy/gross-production/TablePrefecturalIncome'
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
              <DashboardGrossPrefecturalProduct
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5}>
              <PieGrossPrefecturalProduct
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={7}>
              <TableGrossPrefecturalProduct
                routerProps={routerProps}
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={7}>
              <TablePrefecturalIncome
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