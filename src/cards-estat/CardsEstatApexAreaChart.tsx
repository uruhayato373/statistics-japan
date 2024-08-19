import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import { ApexOptions } from 'apexcharts'

import CardsApexAreaChart from 'cards/CardsApexAreaChart'

import handleEstatAPI, { CategoryType, EstatParamsType } from 'utils/e-stat'

interface Props {
  title: string
  estatParams: EstatParamsType
  customCategories?: CategoryType[]
  customOptions?: ApexOptions
}

export default async function CardsEstatApexAreaChart({
  title,
  estatParams,
  customCategories,
  customOptions,
}: Props) {
  // e-Stat APIからdocumentを取得する
  const document = await handleEstatAPI(estatParams).fetchDocument()

  // カスタムカテゴリーがある場合はdocumentを上書きする
  const customDocument = customCategories
    ? { ...document, categories: customCategories }
    : document

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexAreaChart
        title={title}
        document={customDocument}
        customOptions={customOptions}
      />
    </Suspense>
  )
}
