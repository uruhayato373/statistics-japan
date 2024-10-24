import SectionsWrapper from 'components/sections/SectionsWrapper'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

import { SectionsPropsType } from 'types/sections'

const CARD_TITLE = '死亡数（総人口一万人当たり）'
const CARD_ID = 'ranking-number-of-deaths-per-total-population'

const PAGE_ID = 'number-of-deaths-per-total-population'

// 分子 死亡数
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010101',
  cdCat01: 'A4200',
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
      categoryName: '死亡数',
      unit: '人/万人',
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
export default async function RankingNumberOfDeathsPerTotalPopulation({
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
