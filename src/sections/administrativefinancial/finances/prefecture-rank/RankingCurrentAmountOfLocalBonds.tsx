import { actionSavePrefectureRanking } from 'actions/savePrefectureRanking'
import { RankingSectionsPropsType } from 'types/sections'
import handleDocument, { RankingDocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '地方債現在高'

const ESTAT_PARAMS = {
  statsDataId: '0000010104',
  cdCat01: 'D3105',
}

const PAGE_ID = 'current-amount-of-local-bonds'

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filterdValues = values.filter((f) => f.areaCode !== '00000')

  return formatValues(filterdValues)
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values.map((d) => {
    return {
      ...d,
      categoryName: d.categoryName.replace('（都道府県財政）', ''),
    }
  })
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
export default async function RankingCurrentAmountOfLocalBonds({
  routerProps,
  children,
}: RankingSectionsPropsType) {
  const title = `都道府県の${CARD_TITLE}`
  const values = await processValues()
  const document = await processDocument(values)

  if (routerProps) {
    await serverAction({ ...routerProps, pageId: PAGE_ID }, document)
  }

  return <> {children({ title, document })}</>
}
