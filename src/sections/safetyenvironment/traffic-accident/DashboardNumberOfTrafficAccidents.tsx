import CardsDashboardSingle from 'cards/CardsDashboard'

import { saveDocument } from 'actions/saveDocument'
import { saveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '交通事故件数'
const CARD_ID = 'DashboardNumberOfTrafficAccidents'

const ESTAT_PARAMS = {
  statsDataId: '0000010111',
  cdCat01: 'K3101',
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// values
async function processValues(saveProps: SaveProps, prefCode: string) {
  if (process.env.NODE_ENV === 'development') {
    const { fetchValues } = handleEstatAPI()
    const values = await fetchValues(ESTAT_PARAMS)
    await saveValues(saveProps, values)
  }

  const { readValues } = handleValue(saveProps)
  const values = readValues()

  return values.filter((f) => f.areaCode === prefCode)
}

// document
async function processDocument(
  saveProps: SaveProps,
  values: ValueType[]
): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

  return document
}

// コンポーネントの描画
export default async function DashboardNumberOfTrafficAccidents({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const saveProps = { ...routerProps, cardId: CARD_ID }
  const values = await processValues(saveProps, prefCode)
  const document = await processDocument(saveProps, values)

  return <CardsDashboardSingle title={title} document={document} />
}
