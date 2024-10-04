import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'

import { CardsDashboardProps } from 'cards/CardsDashboard'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造品出荷額等'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: 'C3401',
}

const PAGE_ID = 'product-shipment-amount'

interface Props {
  prefecture: PrefectureType
  children: (props: CardsDashboardProps) => React.ReactNode
}

// values
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filteredValues = values.filter((d) => d.areaCode === prefCode)

  return formatValues(filteredValues)
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values.map((d) => {
    return {
      ...d,
      // 単位を億円に変換
      value: Math.round(Number(d.value) / 100),
      unit: '億円',
    }
  })
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function DashboardProductShipmentAmount({
  prefecture,
  children,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)
  const actionButton = <LinkToPrefectureRank pageId={PAGE_ID} />

  return <> {children({ title, document, actionButton })}</>
}
