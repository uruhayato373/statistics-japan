import SectionsWrapper from 'components/sections/SectionsWrapper'

import { ApexOptions } from 'apexcharts'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

import { SectionsPropsType } from 'types/sections'

const CARD_TITLE = '出生数（母親の年齢別）'
const CARD_ID = 'pie-number-of-births-by-mothers-age'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: [
    'A410201',
    'A410202',
    'A410203',
    'A410204',
    'A410205',
    'A410206',
    'A410207',
    'A410208',
    'A410209',
  ],
}

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]) {
  return values.map((d) => ({
    ...d,
    categoryName: d.categoryName
      .replace('出生数（母親の年齢', '')
      .replace('）', ''),
  }))
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values, 'common')
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function PieNumberOfBirthsByMothersAge({
  routerProps,
  children,
}: SectionsPropsType<ApexOptions>) {
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
