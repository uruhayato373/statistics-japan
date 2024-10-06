import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'

import { ApexSectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '農業就業人口の推移'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: ['C310411', 'C310412'],
}

const PAGE_ID = 'agriculture-employment-population'

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

  document.categories[0].type = 'column'
  document.categories[1].type = 'column'

  return document
}

// コンポーネントの描画
export default async function AxisAgricultureEmploymentPopulation({
  prefecture,
  children,
}: ApexSectionsPropsType) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)
  const actionButton = <LinkToPrefectureRank pageId={PAGE_ID} />

  return <> {children({ title, document, actionButton })}</>
}
