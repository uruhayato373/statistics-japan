import { CardsHighchartsPrefectureRankingChartProps } from 'cards/CardsHighchartsPrefectureRankingChart'

import { actionSavePrefectureRanking } from 'actions/savePrefectureRanking'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造業事業所数'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: 'C3403',
}

const PAGE_ID = 'number-of-manufacturing-establishments'

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
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// server action
async function serverAction(routerProps: RouterProps, values: ValueType[]) {
  const { saveBestWorstPNG, savePrefectureRankOGP, saveRankingDB } =
    await actionSavePrefectureRanking(CARD_TITLE, routerProps, values)

  await Promise.all([
    saveBestWorstPNG(),
    savePrefectureRankOGP(),
    saveRankingDB(),
  ])
}

// コンポーネントの描画
export default async function RankingNumberOfManufacturingEstablishments({
  routerProps,
  children,
}: Props) {
  const title = `都道府県の${CARD_TITLE}`
  const values = await processValues()
  const document = await processDocument(values)

  if (routerProps) {
    await serverAction({ ...routerProps, pageId: PAGE_ID }, values)
  }

  return <> {children({ title, document })}</>
}
