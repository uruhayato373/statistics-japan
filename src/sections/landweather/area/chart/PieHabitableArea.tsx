import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import SectionsWrapper from 'components/sections/SectionsWrapper'

import { ApexOptions } from 'apexcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '可住地面積の割合'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: ['B1103', 'B1105'],
}

// apexChartsのオプション
const OPTIONS: ApexOptions = {
  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 0.8,
    },
  },
}

const PAGE_ID = 'habitable-area'

// values
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filteredValues = values.filter((d) => d.areaCode === prefCode)

  return filteredValues
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values, 'common')
  const document = formatDocument()

  return document
}

const linkButton = <LinkToPrefectureRank pageId={PAGE_ID} />

// コンポーネントの描画
export default async function PieHabitableArea({
  routerProps,
  children,
}: SectionsPropsType<Options>) {
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
