import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '実支出'

const ESTAT_PARAMS = {
  statsDataId: '0000010112',
  cdCat01: [
    'L3210',
    'L3211',
    'L321101',
    'L321102',
    'L321103',
    'L321104',
    'L321105',
    'L321106',
    'L321107',
    'L321108',
    'L321109',
    'L3211091',
    'L3211092',
    'L3211093',
    'L321110',
    'L321121',
    'L321122',
    'L3212',
    'L3213',
    'L321301',
    'L321302',
    'L321303',
    'L321304',
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
export default async function TableActualExpenditure({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`

  const values = await processValues(prefCode)
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsReactTimeTable title={title} document={document} />
    </Suspense>
  )
}
