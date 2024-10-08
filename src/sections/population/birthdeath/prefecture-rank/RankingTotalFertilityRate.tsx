import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { RankingDocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '合計特殊出生率'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A4103',
}

const PAGE_ID = 'total-fertility-rate'

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filterdValues = values.filter((f) => f.areaCode !== '00000')

  return filterdValues
}

// document
async function processDocument(
  values: ValueType[]
): Promise<RankingDocumentType> {
  const { formatRankingDocument } = handleDocument(values)
  const document = formatRankingDocument()

  return document
}

// コンポーネントの描画
export default async function RankingTotalFertilityRate({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, pageId: PAGE_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
    >
      {children}
    </SectionsWrapper>
  )
}
