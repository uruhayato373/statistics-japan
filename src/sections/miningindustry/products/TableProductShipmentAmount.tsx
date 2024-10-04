import { CardsReactTimeTableProps } from 'cards/CardsReactTimeTable'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造品出荷額'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: ['C3401', 'C3402', 'C3403', 'C3404'],
}

interface Props {
  prefecture: PrefectureType
  children: (props: CardsReactTimeTableProps) => React.ReactNode
}

// values
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues({ ...ESTAT_PARAMS, cdArea: prefCode })

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values.map((d) => {
    return {
      ...d,
      // 単位を億円に変換
      value: ['C3401', 'C3402'].includes(d.categoryCode)
        ? Math.round(Number(d.value) / 100)
        : d.value,
      unit: ['C3401', 'C3402'].includes(d.categoryCode) ? '億円' : d.unit,
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
export default async function TableProductShipmentAmount({
  prefecture,
  children,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)

  return <> {children({ title, document })}</>
}
