import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CheckPrefectures from 'components/CheckPrefectures'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import PrefRankTotalArea from 'sections/landweather/total-area/PrefRankTotalArea'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function prefRankTotalArea({
  routerProps,
  searchParams,
}: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
    const { chart, table, selectPrefecture } = await PrefRankTotalArea({
      searchParams,
    })

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
            <Grid item xs={12} sx={{ mb: -2.25 }}>
              <Typography variant="h4">都道府県の比較</Typography>
            </Grid>
            {/* 都道府県を選択するチェックボックス */}
            <Grid item xs={12} md={3}>
              <CheckPrefectures />
            </Grid>
            {/* 選択した都道府県をLineChartで表示 */}
            <Grid item xs={12} md={9}>
              {selectPrefecture}
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
