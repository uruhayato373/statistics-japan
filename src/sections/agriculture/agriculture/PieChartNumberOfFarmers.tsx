import { ApexOptions } from 'apexcharts'

import CardsApexPieChart from 'cards/CardsApexPieChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import handleValue, { ValueType } from 'utils/value'

const CARD_TITLE = '農家数（規模別）'
const CARD_ID = 'PieChartNumberOfFarmers'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: [
    'C310234',
    'C310235',
    'C310236',
    'C310237',
    'C310238',
    'C310239',
    'C310240',
    'C310241',
    'C310242',
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
  if (process.env.NODE_ENV === 'development') {
    const { fetchValues } = handleEstatAPI()
    const values = await fetchValues(ESTAT_PARAMS)
    await actionSaveValues(cardProps, formatValues(values))
  }

  const { readValues } = handleValue(cardProps)
  const values = await readValues()

  return formatValues(values).filter((f) => f.areaCode === prefCode)
}

// format values
const formatValues = (values: ValueType[]) => {
  return values.map((d) => ({
    ...d,
    categoryName: d.categoryName
      .replace('県内総生産額', '')
      .replace('平成27年基準', '')
      .replace('（', '')
      .replace('）', ''),
  }))
}

// document
async function processDocument(
  cardProps: CardProps,
  values: ValueType[]
): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values, 'pie')

  return document
}

export default async function PieChartNumberOfFarmers({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const cardProps = handleProps(routerProps).cardProps(CARD_ID)
  const values = await processValues(cardProps, prefCode)
  const document = await processDocument(cardProps, values)

  return (
    <CardsApexPieChart
      title={title}
      document={document}
      options={APEX_OPTIONS}
    />
  )
}
