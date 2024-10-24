import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import SectionsWrapper from 'components/sections/SectionsWrapper'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

import { SectionsPropsType } from 'types/sections'

const CARD_TITLE = '発電電力量'
const CARD_ID = 'dashboard-generated-power-amount'

const ESTAT_PARAMS = {
  statsDataId: '0000010108',
  cdCat01: 'H5104',
}

const PAGE_ID = 'generated-power-amount'

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

const linkButton = <LinkToPrefectureRank pageId={PAGE_ID} />

// コンポーネントの描画
export default async function DashboardGeneratedPowerAmount({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, cardId: CARD_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
      linkButton={linkButton}
    >
      {children}
    </SectionsWrapper>
  )
}
