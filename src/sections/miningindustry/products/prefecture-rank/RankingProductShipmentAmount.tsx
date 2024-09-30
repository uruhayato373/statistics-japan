import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造品出荷額等'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: 'C3401',
}

interface Props {
  children: (props: {
    title: string
    document: DocumentType
  }) => React.ReactNode
}

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const formattedValues = formatValues(values)

  return formattedValues
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
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// server action
// async function serverAction(cardProps: CardProps, values: ValueType[]) {
//   const { saveBestWorstPNG, savePrefectureRankOGP, saveRankingDB } =
//     await actionSavePrefectureRanking(CARD_TITLE, cardProps, values)

//   await Promise.all([
//     saveBestWorstPNG(),
//     savePrefectureRankOGP(),
//     saveRankingDB(),
//   ])
// }

// コンポーネントの描画
export default async function RankingProductShipmentAmount({
  children,
}: Props) {
  const title = `都道府県の${CARD_TITLE}`
  const values = await processValues()
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      {children({ title, document })}
    </Suspense>
  )
}
