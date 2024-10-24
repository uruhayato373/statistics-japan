import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '総人口の推移'
const CARD_ID = 'pyramid-population'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: [
    'A120101',
    'A120102',
    'A120201',
    'A120202',
    'A120301',
    'A120302',
    'A120401',
    'A120402',
    'A120501',
    'A120502',
    'A120601',
    'A120602',
    'A120701',
    'A120702',
    'A120801',
    'A120802',
    'A120901',
    'A120902',
    'A121001',
    'A121002',
    'A121101',
    'A121102',
    'A121201',
    'A121202',
    'A121301',
    'A121302',
    'A121401',
    'A121402',
    'A121501',
    'A121502',
    'A121601',
    'A121602',
  ],
}

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function PyramidPopulation({
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
