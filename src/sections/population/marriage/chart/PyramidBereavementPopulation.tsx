import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '死別人口'
const CARD_ID = 'pyramid-bereavement-population'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: [
    'A1603031',
    'A1603032',
    'A1603041',
    'A1603042',
    'A1603051',
    'A1603052',
    'A1603061',
    'A1603062',
    'A1603071',
    'A1603071',
    'A1603072',
    'A1603081',
    'A1603082',
    'A1603091',
    'A1603092',
    'A1603101',
    'A1603102',
    'A1603111',
    'A1603112',
    'A1603121',
    'A1603122',
    'A1603131',
    'A1603132',
    'A1603141',
    'A1603142',
    'A1603151',
    'A1603152',
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
export default async function PyramidBereavementPopulation({
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
