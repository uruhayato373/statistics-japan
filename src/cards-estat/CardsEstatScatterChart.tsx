import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexScatterChart from 'cards/CardsApexScatterChart'

import handleEstatAPI, { DocumentType, EstatParamsType } from 'utils/e-stat'

interface Props {
  /** カードのタイトル */
  title: string
  paramsArray: EstatParamsType[]
  /** 除外する地域コード
   * @description 例えば総面積では北海道が突出しているので、除外する
   */
  excludedAreaCode?: string[]
}

async function fetchData(paramsArray: EstatParamsType[]) {
  const estatAPI = handleEstatAPI(paramsArray)
  const times = await estatAPI.fetchTimes()
  const selectedTimeCode = times[0].timeCode

  const updatedParamsArray = paramsArray.map((params) => ({
    ...params,
    cdTime: `${selectedTimeCode}100000`,
  }))

  const document = await handleEstatAPI(updatedParamsArray).fetchDocument()
  return document
}

function ChartComponent({
  title,
  document,
  excludedAreaCode,
}: Props & { document: DocumentType }) {
  return (
    <CardsApexScatterChart
      title={title}
      document={document}
      excludedAreaCode={excludedAreaCode}
    />
  )
}

export default async function CardsEstatScatterChart({
  title,
  paramsArray,
  excludedAreaCode,
}: Props) {
  const document = await fetchData(paramsArray)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <ChartComponent
        title={title}
        document={document}
        excludedAreaCode={excludedAreaCode}
        paramsArray={paramsArray}
      />
    </Suspense>
  )
}
