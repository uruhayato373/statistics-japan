import { ApexOptions } from 'apexcharts'

import CardsApexPieChart from 'cards/CardsApexPieChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '県内総生産の内訳'

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
  prefecture: PrefectureType
}

// values
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

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
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values, 'common')
  const document = formatDocument()

  return document
}

export default async function PieChartGrossPrefecturalProduct({
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`

  const values = await processValues(prefCode)
  const document = await processDocument(values)

  return (
    <CardsApexPieChart
      title={title}
      document={document}
      options={APEX_OPTIONS}
    />
  )
}
