import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/@extended/Breadcrumbs'
import CheckPrefectures from 'components/CheckPrefectures'
import MainCard from 'components/MainCard'
import CircularProgressViews from 'components/progress/CircularProgressViews'
import TabPage from 'components/TabPage'

import PrefRankOldPopulation from 'sections/population/total-population/PrefRankOldPopulation'
import PrefRankTotalPopulation from 'sections/population/total-population/PrefRankTotalPopulation'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

interface Props {
  routerProps: RouterProps
}

/**
 * pageIdに応じてコンポーネントを取得
 *
 * @description
 * pageIdはrouterPropsに含まれる。
 * 取得するコンポーネントはchart, table, selectPrefectureの3つ。
 */
async function getComponents(routerProps: RouterProps) {
  switch (routerProps.pageId) {
    case 'total-population':
      return PrefRankTotalPopulation({ routerProps })
    case 'old-population':
      return PrefRankOldPopulation({ routerProps })
    default:
      throw new Error('Invalid pageId')
  }
}

export default async function TotalPopulationPrefectureRank({
  routerProps,
}: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()
    const { chart, table, selectPrefecture } = await getComponents(routerProps)

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <MainCard border={false} boxShadow>
          <TabPage />
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
        </MainCard>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
