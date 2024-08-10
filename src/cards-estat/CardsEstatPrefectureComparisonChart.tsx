import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsPrefectureComparisonChart from 'cards/CardsPrefectureComparisonChart'

import handleEstatAPI, { EstatParamsType } from 'utils/e-stat'

interface Props {
  estatParams?: EstatParamsType
  searchParams?: { areaCode?: string | string[] }
}

/**
 * 都道府県のLineChartを表示するコンポーネント
 *
 * @remarks
 * 選択した都道府県のデータをe-Stat APIから取得し、ApexLineChartで表示する。
 * 都道府県の選択状態はJotaiを使用して管理される。
 * Suspenseの範囲を限定するため、LineChartを切り離している。
 */
export default async function CardsEstatPrefectureComparisonChart({
  estatParams,
  searchParams,
}: Props) {
  return (
    <Suspense fallback={<CircularProgressCards />}>
      <FetchComponent estatParams={estatParams} searchParams={searchParams} />
    </Suspense>
  )
}

async function FetchComponent({ estatParams, searchParams }: Props) {
  const areaCode = searchParams.areaCode

  const document = areaCode
    ? await handleEstatAPI({
        ...estatParams,
        cdArea: areaCode,
      }).fetchDocument()
    : null

  return <CardsPrefectureComparisonChart document={document} />
}
