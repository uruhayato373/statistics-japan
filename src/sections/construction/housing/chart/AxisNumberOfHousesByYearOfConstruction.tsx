import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '建築年次別住宅数'

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

  return {
    ...document,
    categories: document.categories.map((d) => ({ ...d, type: 'column' })),
  }
}

// コンポーネントの描画
export default async function AxisNumberOfHousesByYearOfConstruction({
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