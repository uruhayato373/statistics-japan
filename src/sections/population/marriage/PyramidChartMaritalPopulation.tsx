import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexPyramidChart from 'cards/CardsApexPyramidChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import handleValue, { ValueType } from 'utils/value'

const CARD_TITLE = '有配偶人口'
const CARD_ID = 'PyramidChartMaritalPopulation'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: [
    'A1602021',
    'A1602022',
    'A1602031',
    'A1602032',
    'A1602041',
    'A1602042',
    'A1602051',
    'A1602052',
    'A1602061',
    'A1602062',
    'A1602071',
    'A1602072',
    'A1602081',
    'A1602082',
    'A1602091',
    'A1602092',
    'A1602101',
    'A1602102',
    'A1602111',
    'A1602112',
    'A1602121',
    'A1602122',
    'A1602131',
    'A1602132',
    'A1602141',
    'A1602142',
    'A1602151',
    'A1602152',
  ],
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// values
async function processValues(cardProps: CardProps, prefCode: string) {
  if (process.env.NODE_ENV === 'development') {
    const { fetchValues } = handleEstatAPI()
    const values = await fetchValues(ESTAT_PARAMS)
    await actionSaveValues(cardProps, values)
  }

  const { readValues } = handleValue(cardProps)
  const values = await readValues()

  return values.filter((f) => f.areaCode === prefCode)
}

// document
async function processDocument(
  cardProps: CardProps,
  values: ValueType[]
): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function PyramidChartMaritalPopulation({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const cardProps = handleProps(routerProps).cardProps(CARD_ID)
  const values = await processValues(cardProps, prefCode)
  const document = await processDocument(cardProps, values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexPyramidChart title={title} document={document} />
    </Suspense>
  )
}
