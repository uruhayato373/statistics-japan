import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexPyramidChart from 'cards/CardsApexPyramidChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '未婚人口'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: [
    'A1601011',
    'A1601012',
    'A1601021',
    'A1601022',
    'A1601031',
    'A1601032',
    'A1601041',
    'A1601042',
    'A1601051',
    'A1601052',
    'A1601061',
    'A1601062',
    'A1601071',
    'A1601072',
    'A1601081',
    'A1601082',
    'A1601091',
    'A1601092',
    'A1601101',
    'A1601102',
    'A1601111',
    'A1601112',
    'A1601121',
    'A1601122',
    'A1601131',
    'A1601132',
    'A1601141',
    'A1601142',
    'A1601151',
    'A1601152',
  ],
}

interface Props {
  prefecture: PrefectureType
}

// values
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues({ ...ESTAT_PARAMS, cdArea: prefCode })

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function PyramidChartUnmarriedPopulation({
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexPyramidChart title={title} document={document} />
    </Suspense>
  )
}
