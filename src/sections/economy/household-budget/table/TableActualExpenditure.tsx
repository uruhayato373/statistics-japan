import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { handlePrefecture } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '実支出'

const ESTAT_PARAMS = {
  statsDataId: '0000010112',
  cdCat01: [
    'L3210',
    'L3211',
    'L321101',
    'L321102',
    'L321103',
    'L321104',
    'L321105',
    'L321106',
    'L321107',
    'L321108',
    'L321109',
    'L3211091',
    'L3211092',
    'L3211093',
    'L321110',
    'L321121',
    'L321122',
    'L3212',
    'L3213',
    'L321301',
    'L321302',
    'L321303',
    'L321304',
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

  return document
}

// コンポーネントの描画
export default async function TableActualExpenditure({
  routerProps,
  children,
}: SectionsPropsType) {
  const { prefCode, prefName } = handlePrefecture().getPrefecture(routerProps)
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)

  return <> {children({ title, document })}</>
}
