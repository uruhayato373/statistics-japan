import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsAdsResponsive from 'cards/CardsAdsResponsive'

import RankingChartAverageAgeOfFirstMarriageHusband from 'sections/population/marriage/prefecture-rank/RankingChartAverageAgeOfFirstMarriageHusband'
import RankingChartAverageAgeOfFirstMarriageWife from 'sections/population/marriage/prefecture-rank/RankingChartAverageAgeOfFirstMarriageWife'
import RankingTableAverageAgeOfFirstMarriageHusband from 'sections/population/marriage/prefecture-rank/RankingTableAverageAgeOfFirstMarriageHusband'
import RankingTableAverageAgeOfFirstMarriageWife from 'sections/population/marriage/prefecture-rank/RankingTableAverageAgeOfFirstMarriageWife'
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
            <Grid item xs={12} md={6}>
              <RankingChartAverageAgeOfFirstMarriageHusband />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingTableAverageAgeOfFirstMarriageHusband />
            </Grid>
            {/* row 2 */}
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
            </Grid>
            {/* row 3 */}
            <Grid item xs={12} md={6}>
              <RankingChartAverageAgeOfFirstMarriageWife />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingTableAverageAgeOfFirstMarriageWife />
            </Grid>
            {/* row 4 */}
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
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
