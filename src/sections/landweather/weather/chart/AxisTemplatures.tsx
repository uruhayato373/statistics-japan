import SectionsWrapper from 'components/sections/SectionsWrapper'

import { ApexOptions } from 'apexcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '気温の推移'
const CARD_ID = 'axis-temperatures'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: ['B4101', 'B4102', 'B4103'],
}

const OPTIONS: ApexOptions = {
  yaxis: [
    {
      seriesName: '気温',
      opposite: false,
      show: true,
      labels: {
        show: true,
      },
      tooltip: {
        enabled: false,
      },
    },
  ],
}

// values
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filteredValues = values.filter((d) => d.areaCode === prefCode)

  return formatValues(filteredValues)
}

// format values
function formatValues(values: ValueType[]) {
  return values.map((d) => ({
    ...d,
    categoryName: d.categoryName
      .replace('（日最高気温の月平均の最高値）', '')
      .replace('（日最低気温の月平均の最低値）', ''),
  }))
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function AxisTemplatures({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, cardId: CARD_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
      options={OPTIONS}
    >
      {children}
    </SectionsWrapper>
  )
}
