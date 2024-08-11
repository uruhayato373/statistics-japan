import { Suspense, use } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsPrefectureRankingChart from 'cards/CardsPrefectureRankingChart'

import handleEstatAPI, { CategoryType, EstatParamsType } from 'utils/e-stat'

interface Props {
  estatParams: EstatParamsType
  searchParams: { timeCode?: string }
  customCategories?: CategoryType[]
}

function DataFetcher({ estatParams, searchParams, customCategories }: Props) {
  const timesPromise = handleEstatAPI(estatParams).fetchDocument()
  const times = use(timesPromise).times

  const sortedTimes = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )

  const selectedTimeCode = searchParams?.timeCode || sortedTimes[0].timeCode

  const documentPromise = handleEstatAPI({
    ...estatParams,
    cdTime: `${selectedTimeCode}100000`,
  }).fetchDocument()
  const document = use(documentPromise)

  const customDocument = customCategories
    ? { ...document, categories: customCategories }
    : document

  return <CardsPrefectureRankingChart document={customDocument} times={times} />
}

export default function CardsEstatPrefectureRankingChart(props: Props) {
  return (
    <Suspense fallback={<CircularProgressCards />}>
      <DataFetcher {...props} />
    </Suspense>
  )
}
