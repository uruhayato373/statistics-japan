import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '悪性腫瘍による死亡者数'
const CARD_ID = 'axis-number-of-deaths-due-to-lifestyle-related-diseases'

const ESTAT_PARAMS = {
  statsDataId: '0000010109',
  cdCat01: ['I9102', 'I910201', 'I910202'],
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

  document.categories = document.categories.map((d) => ({
    ...d,
    type: 'column',
  }))

  return document
}

// コンポーネントの描画
export default async function AxisNumberOfDeathsDueToMalignantTumors({
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
