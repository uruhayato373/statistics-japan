import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '１住宅当たり'

const ESTAT_PARAMS = {
  statsDataId: '0000010108',
  cdCat01: ['H2110', 'H2120', 'H2130', 'H2140'],
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
export default async function TablePerHouse({
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
