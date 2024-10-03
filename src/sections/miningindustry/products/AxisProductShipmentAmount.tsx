import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'

import { Options } from 'highcharts'

import { CardsHighchartsAxisChartProps } from 'cards/CardsHighchartsAxisChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造品出荷額等の推移'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: ['C3401', 'C3402'],
}

const PAGE_ID = 'product-shipment-amount'

interface Props {
  prefecture: PrefectureType
  children: (props: CardsHighchartsAxisChartProps) => React.ReactNode
}

const OPTIONS: Options = {
  chart: {
    height: 300,
  },
  yAxis: [
    {
      // 左軸 製造品出荷額
      title: {
        text: '',
      },
      labels: {
        format: '{value:,.0f}',
        style: {
          fontSize: '10px',
          color: '#7cb5ec',
        },
      },
    },
    {
      // 右軸 製造業付加価値額
      title: {
        text: '',
      },
      labels: {
        format: '{value:,.0f}',
        style: {
          fontSize: '10px',
          color: '#00008b',
        },
      },
      opposite: true,
    },
  ],
  tooltip: {
    shared: true,
  },
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
      value: Math.round(Number(d.value) / 100),
      unit: '億円',
    }
  })
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  // 製造品出荷額
  document.categories[0].type = 'column'
  document.categories[0].yAxis = 0
  document.categories[0].color = '#7cb5ec'

  // 製造業付加価値額
  document.categories[1].type = 'line'
  document.categories[1].yAxis = 1
  document.categories[1].color = '#00008b'

  return document
}

// コンポーネントの描画
export default async function AxisProductShipmentAmount({
  prefecture,
  children,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)
  const options = OPTIONS
  const actionButton = <LinkToPrefectureRank pageId={PAGE_ID} />

  return <> {children({ title, document, options, actionButton })}</>
}
