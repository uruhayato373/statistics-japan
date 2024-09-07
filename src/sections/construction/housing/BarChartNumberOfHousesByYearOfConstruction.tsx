import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexBarChart from 'cards/CardsApexBarChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '建築年次別住宅数'
const CARD_ID = 'BarChartNumberOfHousesByYearOfConstruction'

const ESTAT_PARAMS = {
  statsDataId: '0000010108',
  cdCat01: [
    'H1604',
    'H1605',
    'H1612',
    'H1613',
    'H1619',
    'H1620',
    'H1622',
    'H1624',
  ],
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// values
async function processValues(cardProps: CardProps, prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues({ ...ESTAT_PARAMS, cdArea: prefCode })
  await actionSaveValues(cardProps, values)

  return values
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
export default async function BarChartNumberOfHousesByYearOfConstruction({
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
      <CardsApexBarChart title={title} document={document} />
    </Suspense>
  )
}
