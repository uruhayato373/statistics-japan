import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '死亡数'
const CARD_ID = 'pyramid-number-of-deaths'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: [
    'A420101',
    'A420102',
    'A420201',
    'A420202',
    'A420301',
    'A420302',
    'A420401',
    'A420402',
    'A420501',
    'A420502',
    'A420601',
    'A420602',
    'A420701',
    'A420702',
    'A420801',
    'A420802',
    'A420901',
    'A420902',
    'A421001',
    'A421002',
    'A421101',
    'A421102',
    'A421201',
    'A421202',
    'A421301',
    'A421302',
    'A421401',
    'A421402',
    'A421501',
    'A421502',
    'A421601',
    'A421602',
    'A421701',
    'A421702',
    'A421801',
    'A421802',
    'A421901',
    'A421902',
    'A422001',
    'A422002',
    'A422101',
    'A422102',
  ],
}

// values
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filteredValues = values.filter((d) => d.areaCode === prefCode)

  return filteredValues
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function PyramidNumberOfDeaths({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, cardId: CARD_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
    >
      {children}
    </SectionsWrapper>
  )
}
