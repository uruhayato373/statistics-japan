import { ApexOptions } from 'apexcharts'

import CardsApexPieChart from 'cards/CardsApexPieChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import handleValue, { ValueType } from 'utils/value'

const CARD_TITLE = '県内総生産の内訳'
const CARD_ID = 'PieChartGrossPrefecturalProduct'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: [
    'C112201',
    'C112202',
    'C112203',
    'C112204',
    'C112205',
    'C112206',
    'C112207',
    'C112208',
    'C112209',
    'C112210',
    'C112211',
    'C1122121',
    'C1122122',
    'C112213',
    'C112214',
    'C112215',
    'C112216',
    'C112217',
    'C112218',
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

export default async function PieChartGrossPrefecturalProduct({
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