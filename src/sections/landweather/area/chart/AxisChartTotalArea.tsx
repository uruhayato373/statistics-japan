import SectionsWrapper from 'components/sections/SectionsWrapper'

import { ApexOptions } from 'apexcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '総面積の推移'
const CARD_ID = 'axis-total-area'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: ['B1101', 'B1103'],
}

const OPTIONS: ApexOptions = {
  yaxis: [
    {
      seriesName: '総面積',
      opposite: false,
      show: true,
      labels: {
        show: true,
      },
      tooltip: {
        enabled: false,
      },
    },
    {
      seriesName: '可住地面積',
      opposite: true,
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
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]) {
  return values.map((d) => ({
    ...d,
    categoryName: d.categoryName.replace('（北方地域及び竹島を除く）', ''),
    unit: 'ha',
  }))
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  document.categories[0].type = 'area'
  document.categories[1].type = 'area'

  return document
}

// コンポーネントの描画
export default async function AxisChartTotalArea({
  routerProps,
  children,
}: SectionsPropsType<ApexOptions>) {
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
