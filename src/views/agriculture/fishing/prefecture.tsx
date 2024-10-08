import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import DashboardAquacultureYield from 'sections/agriculture/fishing/DashboardAquacultureYield'
import DashboardCatchAmount from 'sections/agriculture/fishing/DashboardCatchAmount'
import DashboardFisheryOutputValue from 'sections/agriculture/fishing/DashboardFisheryOutputValue'
import DashboardNumberOfFishermenEmployed from 'sections/agriculture/fishing/DashboardNumberOfFishermenEmployed'
import TableAquacultureYield from 'sections/agriculture/fishing/TableAquacultureYield'
import TableCatchAmount from 'sections/agriculture/fishing/TableCatchAmount'
import TableFisheryOutputValue from 'sections/agriculture/fishing/TableFisheryOutputValue'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function FishingPrefecture({ routerProps }: Props) {
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
              <DashboardFisheryOutputValue prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardCatchAmount prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardAquacultureYield prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <DashboardNumberOfFishermenEmployed
                prefecture={currentPrefecture}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableFisheryOutputValue prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableCatchAmount prefecture={currentPrefecture} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableAquacultureYield prefecture={currentPrefecture} />
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
