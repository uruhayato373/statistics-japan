import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'

import { ApexOptions } from 'apexcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { handlePrefecture } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '農家数（規模別）'

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

const PAGE_ID = 'number-of-farmers'

// apexChartsのオプション
const OPTIONS: ApexOptions = {
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

// values
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filteredValues = values.filter((d) => d.areaCode === prefCode)

  return formatValues(filteredValues)
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

export default async function PieNumberOfFarmers({
  routerProps,
  children,
}: SectionsPropsType) {
  const { prefCode, prefName } = handlePrefecture().getPrefecture(routerProps)
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)
  const options = OPTIONS
  const linkButton = <LinkToPrefectureRank pageId={PAGE_ID} />

  return <> {children({ title, document, options, linkButton })}</>
}
