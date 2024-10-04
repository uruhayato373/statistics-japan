import { actionSavePrefectureRanking } from 'actions/savePrefectureRanking'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造品出荷額（従業者数当たり）'

const PAGE_ID = 'product-shipment-amount'

// 分子 製造品出荷額
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010103',
  cdCat01: 'C3401',
}

// 分母 製造業従業者数
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010103',
  cdCat01: 'C3404',
}

interface Props {
  routerProps?: RouterProps
  children: (props: {
    title: string
    document: DocumentType
  }) => React.ReactNode
}

// values
async function processValues() {
  const { fetchDivisionValues } = handleEstatAPI()
  const values = await fetchDivisionValues(
    ESTAT_PARAMS_MOLECULE,
    ESTAT_PARAMS_DENOMINATOR
  )

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values.map((d) => {
    return {
      ...d,
      value: Math.round(d.value * 100),
      unit: '万円/人',
    }
  })
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// server action
async function serverAction(routerProps: RouterProps, document: DocumentType) {
  const { saveBestWorstPNG, saveRankingDB } = await actionSavePrefectureRanking(
    CARD_TITLE,
    routerProps,
    document
  )

  await Promise.all([saveBestWorstPNG(), saveRankingDB()])
}

// コンポーネントの描画
export default async function RankingProductShipmentAmountPerManufacturingEmployees({
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
