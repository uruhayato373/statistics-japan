import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsPrefectureRankingChart from 'cards/CardsPrefectureRankingChart'

import handleEstatAPI, { CategoryType, EstatParamsType } from 'utils/e-stat'

interface Props {
  title?: string
  estatParams: EstatParamsType | EstatParamsType[]
  searchParams: { timeCode?: string }
  customCategories?: CategoryType[]
}

async function ChartComponent({
  title,
  estatParams,
  searchParams,
  customCategories,
}: Props) {
  // e-Stat APIからtimesを取得する
  const times = await handleEstatAPI(estatParams).fetchTimes()

  // URLパラメータからtimeCodeを取得する
  // URLパラメータがない場合はtimesの最初のtimeCodeを取得する
  const selectedTimeCode = searchParams?.timeCode || times[0].timeCode

  // e-Stat APIのパラメータにcdTimeを追加する
  const params = Array.isArray(estatParams)
    ? estatParams.map((p) => ({
        ...p,
        cdTime: `${selectedTimeCode}100000`,
      }))
    : {
        ...estatParams,
        cdTime: `${selectedTimeCode}100000`,
      }

  // e-Stat APIからdocumentを取得する
  const document = await handleEstatAPI(params).fetchDocument('ratio')

  // カスタムカテゴリーがある場合はdocumentを上書きする
  const customDocument = customCategories
    ? { ...document, categories: customCategories }
    : document

  return (
    <CardsPrefectureRankingChart
      title={title}
      document={customDocument}
      times={times}
    />
  )
}

export default function CardsEstatPrefectureRankingChart(props: Props) {
  return (
    <Suspense fallback={<CircularProgressCards />}>
      <ChartComponent {...props} />
    </Suspense>
  )
}
