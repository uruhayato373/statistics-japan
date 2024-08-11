import { Suspense, use } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsPrefectureComparisonChart from 'cards/CardsPrefectureComparisonChart'

import handleEstatAPI, { CategoryType, EstatParamsType } from 'utils/e-stat'

interface Props {
  title?: string
  estatParams: EstatParamsType
  searchParams: { areaCode?: string | string[] }
  customCategories?: CategoryType[]
}

function DataFetcher({
  title,
  estatParams,
  searchParams,
  customCategories,
}: Props) {
  const areaCode = searchParams?.areaCode

  const documentPromise = areaCode
    ? handleEstatAPI({
        ...estatParams,
        cdArea: areaCode,
      }).fetchDocument()
    : Promise.resolve(null)

  const document = use(documentPromise)

  const customDocument = customCategories
    ? { ...document, categories: customCategories }
    : document

  return (
    <CardsPrefectureComparisonChart title={title} document={customDocument} />
  )
}

export default function CardsEstatPrefectureComparisonChart(props: Props) {
  return (
    <Suspense fallback={<CircularProgressCards />}>
      <DataFetcher {...props} />
    </Suspense>
  )
}
