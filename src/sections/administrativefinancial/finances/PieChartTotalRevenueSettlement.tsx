import { ApexOptions } from 'apexcharts'

import CardsApexPieChart from 'cards/CardsApexPieChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '歳入決算総額の内訳'
const CARD_ID = 'PieChartTotalRevenueSettlement'

const ESTAT_PARAMS = {
  statsDataId: '0000010104',
  cdCat01: [
    'D3101', //歳入決算総額
    'D310101', //地方税
    'D310102', //地方譲与税
    'D310103', //地方交付税
    'D310108', //国庫支出金
    'D310115', //地方債
    'D310116', //地方特例交付金
  ],
}

// apexChartsのオプション
const APEX_OPTIONS: ApexOptions = {
  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 0.8,
    },
  },
  legend: {
    show: false,
  },
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// values
async function processValues(cardProps: CardProps, prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues({ ...ESTAT_PARAMS, cdArea: prefCode })
  await actionSaveValues(cardProps, formatValues(values))

  return formatValues(values)
}

// formatValues
function formatValues(values: ValueType[]): ValueType[] {
  // 時間コードとエリアコードでグループ化するためのマップ
  const groupedData = new Map<string, ValueType[]>()

  // データをグループ化
  values.forEach((item) => {
    const key = `${item.timeCode}-${item.areaCode}`
    if (!groupedData.has(key)) {
      groupedData.set(key, [])
    }
    groupedData.get(key)!.push(item)
  })

  // 処理済みデータを格納する配列
  const processedData: ValueType[] = []

  // 各グループを処理
  groupedData.forEach((group) => {
    const d3101Item = group.find((item) => item.categoryCode === 'D3101')
    const otherItems = group.filter((item) => item.categoryCode !== 'D3101')

    // D3101以外のアイテムをそのまま追加
    otherItems.forEach((item) => {
      processedData.push(item)
    })

    if (d3101Item) {
      const otherSum = otherItems.reduce((sum, item) => sum + item.value, 0)

      // 新しい'その他'アイテムを作成
      const newOtherItem: ValueType = {
        ...d3101Item,
        categoryCode: 'D3101',
        categoryName: 'その他',
        value: d3101Item.value - otherSum,
      }

      processedData.push(newOtherItem)
    }
  })

  // 結果を時間コードでソートし、各時間コード内で'その他'を最後に配置
  processedData.sort((a, b) => {
    if (a.timeCode !== b.timeCode) {
      return a.timeCode.localeCompare(b.timeCode)
    }
    if (a.categoryCode === 'D3101') return 1
    if (b.categoryCode === 'D3101') return -1
    return 0
  })

  return processedData.map((d) => {
    return {
      ...d,
      categoryName: d.categoryName.replace('（都道府県財政）', ''),
      // 単位を億円に変換
      value: Math.round(Number(d.value) / 100000),
      unit: '億円',
    }
  })
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values, 'pie')

  return document
}

// コンポーネントの描画
export default async function PieChartTotalRevenueSettlement({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const cardProps = handleProps(routerProps).cardProps(CARD_ID)
  const values = await processValues(cardProps, prefCode)
  const document = await processDocument(values)

  return (
    <CardsApexPieChart
      title={title}
      document={document}
      options={APEX_OPTIONS}
    />
  )
}
