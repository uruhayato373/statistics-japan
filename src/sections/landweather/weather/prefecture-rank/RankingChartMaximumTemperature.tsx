import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import { Options } from 'highcharts'

import CardsHighchartsPrefectureRankingChart from 'cards/CardsHighchartsPrefectureRankingChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '最高気温'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B4102',
}

const OPTIONS: Options = {
  colorAxis: {
    stops: [
      [0, '#FFFFC0'], // 薄い黄色（低温）
      [0.2, '#FFEDA0'], // やや濃い黄色
      [0.4, '#FED976'], // 薄いオレンジ
      [0.6, '#FEB24C'], // オレンジ
      [0.8, '#FD8D3C'], // 濃いオレンジ
      [0.9, '#FC4E2A'], // 明るい赤
      [1, '#E31A1C'], // 赤（高温）
    ],
    minColor: '#FFFFC0',
    maxColor: '#E31A1C',
    startOnTick: false,
    endOnTick: false,
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
    categoryName: '最高気温',
  }))
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function RankingChartMaximumTemperature() {
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
