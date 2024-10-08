import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { handlePrefecture } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '災害被害額'

const ESTAT_PARAMS = {
  statsDataId: '0000010111',
  cdCat01: [
    'K6103',
    'K610301',
    'K610302',
    'K610303',
    'K610304',
    'K610305',
    'K610306',
    'K610307',
  ],
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

  return document
}

// コンポーネントの描画
export default async function TableNumberOfPollutionComplaints({
  routerProps,
  children,
}: SectionsPropsType) {
  const { prefCode, prefName } = handlePrefecture().getPrefecture(routerProps)
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)

  return <> {children({ title, document })}</>
}
