import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import SectionsWrapper from 'components/sections/SectionsWrapper'

import { ApexOptions } from 'apexcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '将来負担比率'
const CARD_ID = 'axis-future-burden-ratio'

const PAGE_ID = 'future-burden-ratio'

const ESTAT_PARAMS = {
  statsDataId: '0000010104',
  cdCat01: 'D2112',
}

const OPTIONS: ApexOptions = {
  chart: {
    height: 250,
    type: 'line',
  },
  annotations: {
    yaxis: [
      {
        y: 400,
        borderColor: '#00E396',
        label: {
          borderColor: '#00E396',
          style: {
            color: '#fff',
            background: '#00E396',
          },
          text: '早期健全化基準',
        },
      },
    ],
  },
  yaxis: {
    min: 100,
    max: 450,
  },
}

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

const linkButton = <LinkToPrefectureRank pageId={PAGE_ID} />

// コンポーネントの描画
export default async function AxisFutureBurdenRatio({
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
      linkButton={linkButton}
    >
      {children}
    </SectionsWrapper>
  )
}
