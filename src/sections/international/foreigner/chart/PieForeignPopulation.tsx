import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import SectionsWrapper from 'components/sections/SectionsWrapper'

import { ApexOptions } from 'apexcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '外国人人口の内訳'
const CARD_ID = 'pie-foreign-population'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: ['A1701', 'A1702', 'A1703', 'A1706', 'A1707'],
}

const PAGE_ID = 'foreign-population'

// apexChartsのオプション
const OPTIONS: ApexOptions = {
  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 0.8,
    },
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
  const { formatDocument } = handleDocument(values, 'common')
  const document = formatDocument()

  return document
}

const linkButton = <LinkToPrefectureRank pageId={PAGE_ID} />

export default async function PieForeignPopulation({
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
