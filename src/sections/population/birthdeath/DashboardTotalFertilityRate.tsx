import CardsDashboardSingle from 'cards/CardsDashboard'

import { saveDocument, SaveProps } from 'app/actions/saveDocument'
import { saveValues } from 'app/actions/saveValues'
import handleDocument, { ValueType, DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'
import handleValues from 'utils/values'

const CARD_TITLE = '合計特殊出生率'
const CARD_ID = 'DashboardTotalFertilityRate'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A4103',
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

  const { readValues } = handleValues(saveProps)
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
export default async function DashboardTotalFertilityRate({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const saveProps = { ...routerProps, cardId: CARD_ID }
  const values = await processValues(saveProps, prefCode)
  const document = await processDocument(saveProps, values)

  return <CardsDashboardSingle title={title} document={document} digit={1} />
}