import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import PrefRankHabitableAreaRatio from 'sections/landweather/total-area/PrefRankHabitableAreaRatio'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

export default async function prefRankHabitableAreaRatio({
  routerProps,
}: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
    const { chart, table } = await PrefRankHabitableAreaRatio()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* 都道府県ランキングのChart */}
            <Grid item xs={12} md={6} lg={6}>
              {chart}
            </Grid>
            {/* 都道府県ランキングのTable */}
            <Grid item xs={12} md={6} lg={6}>
              {table}
            </Grid>
            {/* <Grid item xs={12} sx={{ mb: -2.25 }}>
              <Typography variant="h4">都道府県の比較</Typography>
            </Grid> */}
            {/* 都道府県を選択するチェックボックス */}
            {/* <Grid item xs={12} md={3}>
              <CheckPrefectures />
            </Grid> */}
            {/* 選択した都道府県をLineChartで表示 */}
            {/* <Grid item xs={12} md={9}>
              {selectPrefecture}
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
