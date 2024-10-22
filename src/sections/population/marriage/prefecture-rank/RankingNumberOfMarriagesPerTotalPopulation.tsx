import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '婚姻件数（総人口一万人当たり）'
const CARD_ID = 'ranking-number-of-marriages-per-total-population'

const PAGE_ID = 'number-of-marriages-per-total-population'

// 分子 婚姻件数
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010101',
  cdCat01: 'A9101',
}

// 分母 総人口
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010101',
  cdCat01: 'A1101',
}

// values
async function processValues() {
  const { fetchDivisionValues } = handleEstatAPI()
  const values = await fetchDivisionValues(
    ESTAT_PARAMS_MOLECULE,
    ESTAT_PARAMS_DENOMINATOR
  )

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values.map((d) => {
    return {
      ...d,
      value: Math.round(d.value * 100000) / 10,
      categoryName: '婚姻件数',
      unit: '組/万人',
    }
  })
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatRankingDocument } = handleDocument(values)
  const document = formatRankingDocument()

  return document
}

// コンポーネントの描画
export default async function RankingNumberOfMarriagesPerTotalPopulation({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, pageId: PAGE_ID, cardId: CARD_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
    >
      {children}
    </SectionsWrapper>
  )
}
