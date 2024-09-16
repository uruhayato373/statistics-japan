import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import RankingChartAdministrativeDepartmentEmployees from 'sections/administrativefinancial/staff/prefecture-rank/RankingChartAdministrativeDepartmentEmployees'
import RankingTableAdministrativeDepartmentEmployees from 'sections/administrativefinancial/staff/prefecture-rank/RankingTableAdministrativeDepartmentEmployees'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} md={6} lg={6}>
              <RankingChartAdministrativeDepartmentEmployees
                routerProps={routerProps}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <RankingTableAdministrativeDepartmentEmployees
                routerProps={routerProps}
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
