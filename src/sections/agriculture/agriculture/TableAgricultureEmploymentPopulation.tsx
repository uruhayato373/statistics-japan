import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { saveDocument, SaveProps } from 'app/actions/saveDocument'
import { saveValues } from 'app/actions/saveValues'
import handleDocument, { ValueType, DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'
import handleValues from 'utils/values'

const CARD_TITLE = '農業就業人口（販売農家）'
const CARD_ID = 'TableAgricultureEmploymentPopulation'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: ['C310410', 'C310411', 'C310412'],
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
export default async function TableAgricultureEmploymentPopulation({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const saveProps = { ...routerProps, cardId: CARD_ID }
  const values = await processValues(saveProps, prefCode)
  const document = await processDocument(saveProps, values)

  return <CardsReactTimeTable title={title} document={document} />
}
