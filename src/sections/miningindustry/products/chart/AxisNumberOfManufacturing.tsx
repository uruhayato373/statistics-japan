import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import SectionsWrapper from 'components/sections/SectionsWrapper'

import { ApexOptions } from 'apexcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '製造業事業所数・従業者数の推移'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: ['C3403', 'C3404'],
}

const PAGE_ID = 'number-of-manufacturing-establishments'

const OPTIONS: ApexOptions = {
  yaxis: [
    {
      seriesName: '製造業事業所数',
      opposite: false,
      show: true,
      labels: {
        show: true,
        style: {
          fontSize: '10px',
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    {
      seriesName: '製造業従業者数',
      opposite: true,
      show: true,
      labels: {
        show: true,
        style: {
          fontSize: '10px',
        },
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

  document.categories[0].type = 'line'
  document.categories[1].type = 'line'

  return document
}

const linkButton = <LinkToPrefectureRank pageId={PAGE_ID} />

// コンポーネントの描画
export default async function AxisNumberOfManufacturing({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={routerProps}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
      options={OPTIONS}
      linkButton={linkButton}
    >
      {children}
    </SectionsWrapper>
  )
}