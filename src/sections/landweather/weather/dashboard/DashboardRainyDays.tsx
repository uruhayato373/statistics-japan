import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '降水日数'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B4106',
}

const PAGE_ID = 'rainy-days'

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

const linkButton = <LinkToPrefectureRank pageId={PAGE_ID} />

// コンポーネントの描画
export default async function DashboardRainyDays({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={routerProps}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
      linkButton={linkButton}
    >
      {children}
    </SectionsWrapper>
  )
}