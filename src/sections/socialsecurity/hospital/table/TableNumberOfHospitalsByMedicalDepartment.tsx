import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '診療科目別病院数'

const ESTAT_PARAMS = {
  statsDataId: '0000010109',
  cdCat01: [
    'I530101',
    'I530102',
    'I530103',
    'I530104',
    'I530105',
    'I530106',
    'I530107',
    'I530108',
    'I530109',
    'I530110',
    'I530111',
    'I530112',
    'I530113',
    'I530114',
    'I530115',
    'I530116',
    'I530117',
    'I530118',
    'I530119',
    'I530120',
    'I530121',
    'I530122',
    'I530123',
    'I530124',
    'I530125',
    'I530126',
    'I530127',
    'I530128',
    'I530129',
    'I530130',
    'I530131',
    'I530132',
    'I530133',
    'I530134',
    'I530135',
    'I530136',
    'I530137',
    'I530138',
    'I530139',
    'I530140',
    'I530141',
    'I530142',
    'I530143',
    'I530144',
    'I530145',
    'I530146',
    'I530147',
    'I530148',
    'I530149',
    'I530150',
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
const formatValues = (values: ValueType[]) => {
  return values.map((d) => ({
    ...d,
    categoryName: d.categoryName
      .replace('診療科目別一般病院数', '')
      .replace('（', '')
      .replace('）', ''),
  }))
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function TableNumberOfHospitalsByMedicalDepartment({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={routerProps}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
    >
      {children}
    </SectionsWrapper>
  )
}
