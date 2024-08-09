/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'
import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import ApexScatterChart from 'components/apexcharts/ApexScatterChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import useEstatAPIs from 'hooks/useEstatAPIs'
import { EstatParamsType, TimeType } from 'utils/e-stat'

interface Props {
  /** カードのタイトル */
  title: string
  /** X軸のe-Stat APIパラメータ */
  xparams: EstatParamsType
  /** Y軸のe-Stat APIパラメータ */
  yparams: EstatParamsType
  /** 除外する地域コード
   *  @description 例えば総面積では北海道が突出しているので、除外する
   */
  excludedAreaCode?: string[]
}

interface ChartComponentProps extends Props {
  latestTime: TimeType
}

/**
 * e-Stat APIから取得したデータをD3 Map Chartで表示するコンポーネント
 *
 * @description
 * Suspenseの影響範囲を限定するため、データ取得と描画を担う部分だけ分離している。
 */
function ChartComponent({
  xparams,
  yparams,
  latestTime,
  excludedAreaCode,
}: ChartComponentProps) {
  /**
   * e-Stat APIからデータを取得
   */
  const { documents } = useEstatAPIs([
    {
      ...xparams,
      cdTime: `${latestTime.timeCode}100000`,
    },
    {
      ...yparams,
      cdTime: `${latestTime.timeCode}100000`,
    },
  ])

  const areas = documents[0].areas
    .filter((f) => f.areaCode !== '00000')
    .filter((f) => !excludedAreaCode?.includes(f.areaCode))

  const contents = {
    categories: documents.flatMap((d) => d.categories),
    series: areas.map((d) => {
      return {
        name: d.areaName,
        type: 'scatter',
        data: [
          {
            x: documents[0].values.find((f) => f.areaCode === d.areaCode).value,
            y: documents[1].values.find((f) => f.areaCode === d.areaCode).value,
          },
        ],
      }
    }),
  }

  return <ApexScatterChart contents={contents} />
}

export default function CardsApexScatter({
  title,
  xparams,
  yparams,
  excludedAreaCode,
}: Props) {
  /**
   * e-Stat APIから最新の年次を取得（都道府県コードは00000）
   */
  const { documents } = useEstatAPIs([
    { ...xparams, cdArea: '00000' },
    { ...yparams, cdArea: '00000' },
  ])
  const latestTime = documents
    .flatMap((d) => d.times)
    .sort((a, b) => parseInt(b.timeCode) - parseInt(a.timeCode))[0]

  return (
    <MainCard title={title} sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2, pb: 0, height: '600px' }}>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Suspense fallback={<CircularProgressCards />}>
          <ChartComponent
            xparams={xparams}
            yparams={yparams}
            excludedAreaCode={excludedAreaCode}
            latestTime={latestTime}
          />
        </Suspense>
      </Box>
    </MainCard>
  )
}
