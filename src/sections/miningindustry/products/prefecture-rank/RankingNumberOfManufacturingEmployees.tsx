import { CardsHighchartsPrefectureRankingChartProps } from 'cards/CardsHighchartsPrefectureRankingChart'

import { actionSavePrefectureRanking } from 'actions/savePrefectureRanking'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造業従業者数'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: 'C3404',
}

const PAGE_ID = 'number-of-manufacturing-employees'

interface Props {
  routerProps?: RouterProps
  children: (
    props: CardsHighchartsPrefectureRankingChartProps
  ) => React.ReactNode
}

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

// server action
async function serverAction(routerProps: RouterProps, document: DocumentType) {
  const { saveBestWorstPNG, savePrefectureRankOGP, saveRankingDB } =
    await actionSavePrefectureRanking(CARD_TITLE, routerProps, document)

  await Promise.all([
    saveBestWorstPNG(),
    savePrefectureRankOGP(),
    saveRankingDB(),
  ])
}

// コンポーネントの描画
export default async function RankingChartNumberOfManufacturingEmployees({
  routerProps,
  children,
}: Props) {
  const title = `都道府県の${CARD_TITLE}`
  const values = await processValues()
  const document = await processDocument(values)

  if (routerProps) {
    await serverAction({ ...routerProps, pageId: PAGE_ID }, document)
  }

  return <> {children({ title, document })}</>
}
