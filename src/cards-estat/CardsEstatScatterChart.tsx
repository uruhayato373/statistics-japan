import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexScatterChart from 'cards/CardsApexScatterChart'

import handleEstatAPI, { DocumentType, EstatParamsType } from 'utils/e-stat'

interface Props {
  /** カードのタイトル */
  title: string
  /** e-Stat APIのパラメータ配列
   * @remarks
   *  - 0番目のパラメータがX軸、1番目のパラメータがY軸になる
   */
  paramsArray: EstatParamsType[]
  /** 除外する地域コード
   * @description 例えば総面積では北海道が突出しているので、除外する
   */
  excludedAreaCode?: string[]
}

async function fetchData(
  paramsArray: EstatParamsType[]
): Promise<DocumentType> {
  if (!Array.isArray(paramsArray)) {
    throw new Error('paramsArrayには配列を指定してください。')
  }
  const estatAPI = handleEstatAPI(paramsArray)
  const times = await estatAPI.fetchTimes()
  const selectedTimeCode = times[0].timeCode

  // 最新のデータを取得する
  const updatedParamsArray = paramsArray.map((params) => ({
    ...params,
    cdTime: `${selectedTimeCode}100000`,
  }))
  const document = await handleEstatAPI(updatedParamsArray).fetchDocument()
  return document
}

export default async function CardsEstatScatterChart({
  title,
  paramsArray,
  excludedAreaCode,
}: Props) {
  const document = await fetchData(paramsArray)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexScatterChart
        title={title}
        document={document}
        excludedAreaCode={excludedAreaCode}
      />
    </Suspense>
  )
}
