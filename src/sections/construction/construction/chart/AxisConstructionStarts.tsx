import SectionsWrapper from 'components/sections/SectionsWrapper'

import { ApexOptions } from 'apexcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '着工建築物'
const CARD_ID = 'axis-construction-companies'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: ['C3301', 'C3302'],
}

const OPTIONS: ApexOptions = {
  yaxis: [
    {
      seriesName: '着工建築物数',
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
      seriesName: '着工建築物床面積',
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
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filteredValues = values.filter((d) => d.areaCode === prefCode)

  return filteredValues
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  document.categories[0].type = 'column'
  document.categories[1].type = 'line'

  return document
}

// コンポーネントの描画
export default async function AxisConstructionStarts({
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
