import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import { Options } from 'highcharts'

import CardsHighchartsPrefectureRankingChart from 'cards/CardsHighchartsPrefectureRankingChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '最低気温'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B4103',
}

const OPTIONS: Options = {
  colorAxis: {
    stops: [
      [0, '#0000FF'], // 青（最低値）
      [0.2, '#4169E1'], // ロイヤルブルー
      [0.4, '#6495ED'], // コーンフラワーブルー
      [0.6, '#87CEEB'], // スカイブルー
      [0.8, '#FFEFD5'], // パパイヤホイップ
      [1, '#FFFFC0'], // 薄い黄色（最高値）
    ],
    minColor: '#0000FF',
    maxColor: '#FFFFC0',
    // startOnTick: false,
    // endOnTick: false,
  },
}

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]) {
  return values.map((d) => ({
    ...d,
    categoryName: '最低気温',
  }))
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function RankingChartLowestTemperature() {
  const title = `都道府県の${CARD_TITLE}`
  const values = await processValues()
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsHighchartsPrefectureRankingChart
        title={title}
        document={document}
        options={OPTIONS}
      />
    </Suspense>
  )
}
