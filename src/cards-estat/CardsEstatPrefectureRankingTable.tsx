import { Suspense } from 'react'
import { use } from 'react'
import CardsPrefectureRankingTable from 'cards/CardsPrefectureRankingTable'
import handleEstatAPI, { CategoryType, EstatParamsType } from 'utils/e-stat'
import CircularProgress from '@mui/material/CircularProgress'

interface Props {
  estatParams: EstatParamsType
  searchParams: { timeCode?: string }
  customCategories?: CategoryType[]
}

function DataFetcher({ estatParams, searchParams, customCategories }: Props) {
  const timesPromise = handleEstatAPI(estatParams).fetchDocument()
  const { times } = use(timesPromise)

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

  return <CardsPrefectureRankingTable document={customDocument} times={times} />
}

export default function CardsEstatPrefectureRankingTable(props: Props) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <DataFetcher {...props} />
    </Suspense>
  )
}
