import CardsDashboardSingle from 'cards/CardsDashboard'

import { actionSaveDocument } from 'actions/saveDocument'
import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import handleValue, { ValueType } from 'utils/value'

const CARD_TITLE = '高等学校教員数'
const CARD_ID = 'DashboardHighSchoolTeachers'

const ESTAT_PARAMS = {
  statsDataId: '0000010105',
  cdCat01: 'E4401',
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// values
async function processValues(cardProps: CardProps, prefCode: string) {
  if (process.env.NODE_ENV === 'development') {
    const { fetchValues } = handleEstatAPI()
    const values = await fetchValues(ESTAT_PARAMS)
    await actionSaveValues(cardProps, values)
  }

  const { readValues } = handleValue(cardProps)
  const values = readValues()

  return values.filter((f) => f.areaCode === prefCode)
}

// document
async function processDocument(
  cardProps: CardProps,
  values: ValueType[]
): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  if (process.env.NODE_ENV === 'development') {
    await actionSaveDocument(cardProps, document)
  }

  return document
}

// コンポーネントの描画
export default async function DashboardHighSchoolTeachers({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const cardProps = handleProps(routerProps).cardProps(CARD_ID)
  const values = await processValues(cardProps, prefCode)
  const document = await processDocument(cardProps, values)

  return <CardsDashboardSingle title={title} document={document} />
}
