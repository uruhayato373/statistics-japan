import { ApexOptions } from 'apexcharts'

import CardsApexPieChart from 'cards/CardsApexPieChart'

import { actionSaveJson } from 'actions/saveJson'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造品出荷額（産業中分類別）'
const CARD_ID = 'PieChartProductShipmentAmountByIndustrialClassification'

const ESTAT_PARAMS = {
  statsDataId: '0004003976',
  cdCat01: ['202101170010'],
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
  const values = await fetchValues({ ...ESTAT_PARAMS }, 'cat02')
  const formattedValues = formatValues(values)
  const filteredValues = formattedValues
    .filter((d) => d.areaCode === prefCode)
    .filter((d) => d.categoryCode !== '00')
    .sort((a, b) => b.value - a.value)

  await actionSaveJson(filteredValues, 'values.json')

  return filteredValues
}

// format values
function formatValues(values: ValueType[]) {
  return values.map((d) => {
    // カテゴリ名の中に年次・地域・産業名が含まれているので分割
    const [, timeCode, areaCode, areaName, industryCode, industryName] =
      d.categoryName.split('_')

    return {
      ...d,
      timeCode,
      timeName: `${timeCode}年度`,
      areaCode: `${areaCode}000`,
      areaName: areaName,
      categoryCode: industryCode,
      categoryName: industryName,
      // 単位を億円に変換
      value: Math.round(Number(d.value) / 100),
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

export default async function PieChartProductShipmentAmountByIndustrialClassification({
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
