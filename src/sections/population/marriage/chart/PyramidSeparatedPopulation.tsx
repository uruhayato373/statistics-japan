import SectionsWrapper from 'components/sections/SectionsWrapper'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

import { SectionsPropsType } from 'types/sections'

const CARD_TITLE = '離別人口'
const CARD_ID = 'pyramid-marital-population'

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

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values.map((d) => {
    return {
      ...d,
      categoryName: d.categoryName.replace('離別人口（', '').replace('）', ''),
    }
  })
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function PyramidSeparatedPopulation({
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
