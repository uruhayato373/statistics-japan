import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import RankingHabitableArea from 'sections/landweather/total-area/RankingHabitableArea'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function prefRankHabitableArea({
  routerProps,
  searchParams,
}: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
    const { chart, table, comparison } = await RankingHabitableArea({
      searchParams,
    })

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              {chart}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              {table}
            </Grid>
            <Grid item xs={12} md={9}>
              {comparison}
            </Grid>
            {/* <Grid item xs={12} md={6} lg={6}>
              {scatterTotalArea}
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
