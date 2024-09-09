import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexPyramidChart from 'cards/CardsApexPyramidChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '離別人口'
const CARD_ID = 'PyramidChartSeparatedPopulation'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: [
    'A1604031',
    'A1604032',
    'A1604041',
    'A1604042',
    'A1604051',
    'A1604052',
    'A1604061',
    'A1604062',
    'A1604071',
    'A1604071',
    'A1604072',
    'A1604081',
    'A1604082',
    'A1604091',
    'A1604092',
    'A1604101',
    'A1604102',
    'A1604111',
    'A1604112',
    'A1604121',
    'A1604122',
    'A1604131',
    'A1604132',
    'A1604141',
    'A1604142',
    'A1604151',
    'A1604152',
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
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function PyramidChartSeparatedPopulation({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const cardProps = handleProps(routerProps).cardProps(CARD_ID)
  const values = await processValues(cardProps, prefCode)
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexPyramidChart title={title} document={document} />
    </Suspense>
  )
}
