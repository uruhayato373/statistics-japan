/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'
import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CircularProgressCards from 'components/CircularProgressCards'
import D3MapChart from 'components/d3js/D3MapChart'
import MainCard from 'components/MainCard'
import SelectTime from 'components/SelectTime'

import { time } from 'atoms'
import useEstatAPIs from 'hooks/useEstatAPIs'
import useGeoshape from 'hooks/useGeoshape'
import formatD3charts from 'utils/d3charts'
import { EstatParamsType } from 'utils/e-stat'

import { useAtom } from 'jotai'

interface Props {
  params: EstatParamsType[]
}

/**
 * e-Stat APIから取得したデータをD3 Map Chartで表示するコンポーネント
 *
 * @description
 * Suspenseの影響範囲を限定するため、データ取得と描画を担う部分だけ分離している。
 */
function ChartComponent({ params }: Props) {
  // 選択中の年次はJotaiを使用して管理
  const [selectedTime] = useAtom(time)

  // e-Stat APIからデータを取得（selectedTimeが変更されるたびに再取得）
  const { document } = useEstatAPIs(
    params.map((d) => ({ ...d, cdTime: `${selectedTime.timeCode}100000` })),
    'ratio'
  )

  // geoShapeリポジトリからTopojsonデータを取得（一度だけ取得）
  const { geoShape } = useGeoshape('prefecture')

  // D3 Map Chartのコンテンツを整形

  const contents = formatD3charts(document).mapChart()

  return <D3MapChart contents={contents} geoShape={geoShape} />
}

/**
 * 2つのe-Stat APIからデータを取得し、都道府県ランキングのチャートを表示するコンポーネント
 *
 * @description
 * useEstatAPIとuseEstatAPIsのカスタムフックを条件分岐下で使用することができないため、
 * それぞれ別のコンポーネントとして実装している。
 */
export default function CardsEstatPrefRankChartMultiParams({ params }: Props) {
  // e-Stat APIからtimesを取得（都道府県コードは00000）
  const { document: { times } = {} } = useEstatAPIs(
    params.map((d) => ({ ...d, cdArea: '00000' }))
  )

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2, pb: 0, height: '600px' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <SelectTime times={times} />
          {/* <ToggleMapBar
            chartType={chartType}
            handleChartChange={handleChartChange}
          /> */}
        </Stack>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Suspense fallback={<CircularProgressCards />}>
          <ChartComponent params={params} />
        </Suspense>
        <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="text.secondary">
            地図は『歴史的行政区域データセットβ版』（CODH作成）を利用
          </Typography>
        </Box>
      </Box>
    </MainCard>
  )
}