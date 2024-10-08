import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '有配偶人口'

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
export default async function PyramidMaritalPopulation({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={routerProps}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
    >
      {children}
    </SectionsWrapper>
  )
}
