import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsPrefectureRankingChart from 'cards/CardsPrefectureRankingChart'

import handleEstatAPI, { CategoryType, EstatParamsType } from 'utils/e-stat'

interface Props {
  title?: string
  estatParams: EstatParamsType
  searchParams: { timeCode?: string }
  customCategories?: CategoryType[]
}

async function DataFetcher({
  title,
  estatParams,
  searchParams,
  customCategories,
}: Props) {
  const times = await handleEstatAPI(estatParams).fetchTimes()

  const selectedTimeCode = searchParams?.timeCode || times[0].timeCode

  const document = await handleEstatAPI({
    ...estatParams,
    cdTime: `${selectedTimeCode}100000`,
  }).fetchDocument()

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
      <DataFetcher {...props} />
    </Suspense>
  )
}
