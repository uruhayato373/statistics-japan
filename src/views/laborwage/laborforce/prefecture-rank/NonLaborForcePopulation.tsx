import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import MapChartNonLaborForcePopulation from 'sections/laborwage/laborforce/prefecture-rank/MapChartNonLaborForcePopulation'
import RankingTableNonLaborForcePopulation from 'sections/laborwage/laborforce/prefecture-rank/RankingTableNonLaborForcePopulation'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function Laborforce({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* row 1 */}
            <Grid item xs={12} md={6} lg={7}>
              <MapChartNonLaborForcePopulation routerProps={routerProps} />
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <RankingTableNonLaborForcePopulation routerProps={routerProps} />
            </Grid>
            {/* row 2 */}
            {/* <Grid item xs={12} md={9}>
              {comparison}
            </Grid> */}
          </Grid>
        </Box>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}