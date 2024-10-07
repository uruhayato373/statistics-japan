import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { handlePrefecture } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '商業事業所数'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: 'C3502',
}

const PAGE_ID = 'number-of-commercial-establishments'

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
export default async function DashboardNumberOfCommercialEstablishments({
  routerProps,
  children,
}: SectionsPropsType) {
  const { prefCode, prefName } = handlePrefecture().getPrefecture(routerProps)
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)
  const actionButton = <LinkToPrefectureRank pageId={PAGE_ID} />

  return <> {children({ title, document, actionButton })}</>
}
