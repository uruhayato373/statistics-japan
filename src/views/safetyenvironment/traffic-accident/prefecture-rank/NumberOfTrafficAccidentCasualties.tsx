import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import RankingChartNumberOfTrafficAccidentCasualties from 'sections/safetyenvironment/traffic-accident/prefecture-rank/RankingChartNumberOfTrafficAccidentCasualties'
import RankingTableNumberOfTrafficAccidentCasualties from 'sections/safetyenvironment/traffic-accident/prefecture-rank/RankingTableNumberOfTrafficAccidentCasualties'
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
              <RankingChartNumberOfTrafficAccidentCasualties
                routerProps={routerProps}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <RankingTableNumberOfTrafficAccidentCasualties
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
