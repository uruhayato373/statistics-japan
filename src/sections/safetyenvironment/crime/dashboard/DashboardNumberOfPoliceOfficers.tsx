import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '警察官数'
const CARD_ID = 'dashboard-number-of-police-officers'

const ESTAT_PARAMS = {
  statsDataId: '0000010111',
  cdCat01: 'K4102',
}

const PAGE_ID = 'number-of-police-officers'

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
export default async function DashboardNumberOfPoliceOfficers({
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
