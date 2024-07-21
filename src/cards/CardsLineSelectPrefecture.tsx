'use client'

import { Suspense } from 'react'

import Box from '@mui/material/Box'

import ApexLineChart from 'components/apexcharts/ApexLineChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import useSWR, { SWRResponse } from 'swr'

import { checkedPrefectures } from 'atoms'
import formatApexcharts from 'utils/apexcharts'
import { EstatParamsType, DocumentType } from 'utils/e-stat'
import paramsSerializer from 'utils/e-stat/modules/paramsSerializer'
import fetcher from 'utils/fetcher'
import { PrefectureType } from 'utils/prefecture'

import { useAtom } from 'jotai'

interface Props {
  params: EstatParamsType
}

/**
 * e-Stat APIからデータを取得してChartを生成するコンポーネント
 *
 * @remarks
 * e-Stat APIからデータを取得して、整形されたDocumenとして受け取る。
 * ApexchartでChartを表示する。
 */
function LineChart({ url }: { url: string }) {
  /**
   * e-Stat APIからデータを取得
   */
  const { data: document }: SWRResponse<DocumentType, Error> = useSWR(
    url,
    fetcher,
    { suspense: true }
  )

  /**
   * Apexchartsのコンテンツに整形
   */
  const contents = formatApexcharts(document).timeChart('area')

  return <ApexLineChart contents={contents} />
}

/**
 * 都道府県のLineChartを表示するコンポーネント
 *
 * @remarks
 * 選択した都道府県のデータをe-Stat APIから取得し、ApexLineChartで表示する。
 * 都道府県の選択状態はJotaiを使用して管理される。
 * Suspenseの範囲を限定するため、LineChartを切り離している。
 */
export default function CardsLineSelectPrefecture({ params }: Props) {
  /**
   * 選択した都道府県をJotaiで管理
   */
  const [selectedPrefectures] = useAtom<PrefectureType[]>(checkedPrefectures)

  /**
   * e-Stat APIのリクエストURLを生成
   */
  const estatParams = {
    ...params,
    cdArea: selectedPrefectures.map((d) => d.prefCode),
  }
  const url = `/api/e-stat?${paramsSerializer(estatParams)}`

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2 }}>
        <Suspense fallback={<CircularProgressCards />}>
          <LineChart url={url} />
        </Suspense>
      </Box>
    </MainCard>
  )
}
