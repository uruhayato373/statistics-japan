import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import RankingChartTotalExpenditures from 'sections/administrativefinancial/finances/prefecture-rank/RankingChartTotalExpenditures'
import RankingChartTotalRevenueSettlement from 'sections/administrativefinancial/finances/prefecture-rank/RankingChartTotalRevenueSettlement'
import RankingTableTotalExpenditures from 'sections/administrativefinancial/finances/prefecture-rank/RankingTableTotalExpenditures'
import RankingTableTotalRevenueSettlement from 'sections/administrativefinancial/finances/prefecture-rank/RankingTableTotalRevenueSettlement'
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
              <RankingChartTotalRevenueSettlement routerProps={routerProps} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <RankingTableTotalRevenueSettlement routerProps={routerProps} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <RankingChartTotalExpenditures routerProps={routerProps} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <RankingTableTotalExpenditures routerProps={routerProps} />
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