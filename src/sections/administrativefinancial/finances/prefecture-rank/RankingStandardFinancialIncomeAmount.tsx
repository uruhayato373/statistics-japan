import { actionSavePrefectureRanking } from 'actions/savePrefectureRanking'
import { SectionsPropsType } from 'types/sections'
import handleDocument, { RankingDocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '基準財政収入額'

const ESTAT_PARAMS = {
  statsDataId: '0000010104',
  cdCat01: 'D2105',
}

const PAGE_ID = 'standard-financial-income-amount'

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filterdValues = values.filter((f) => f.areaCode !== '00000')

  return filterdValues
}

// document
async function processDocument(
  values: ValueType[]
): Promise<RankingDocumentType> {
  const { formatRankingDocument } = handleDocument(values)
  const document = formatRankingDocument()

  return document
}

// server action
async function serverAction(
  routerProps: RouterProps,
  document: RankingDocumentType
) {
  const { saveBestWorstPNG, savePrefectureRankOGP, saveRankingDB } =
    await actionSavePrefectureRanking(CARD_TITLE, routerProps, document)

  await Promise.all([
    saveBestWorstPNG(),
    savePrefectureRankOGP(),
    saveRankingDB(),
  ])
}

// コンポーネントの描画
export default async function RankingStandardFinancialIncomeAmount({
  routerProps,
  children,
}: SectionsPropsType) {
  const title = `都道府県の${CARD_TITLE}`
  const values = await processValues()
  const document = await processDocument(values)

  if (routerProps) {
    await serverAction({ ...routerProps, pageId: PAGE_ID }, document)
  }

  return <> {children({ title, document })}</>
}
