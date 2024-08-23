import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

const TITLE = '総人口のデータ'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: ['A1101', 'A110101', 'A110102', 'A1301', 'A1302', 'A1303'],
}

interface Props {
  prefecture: PrefectureType
}

async function fetchEstatData(prefCode: string) {
  const estatParams = { ...ESTAT_PARAMS, cdArea: prefCode }
  return await handleEstatAPI(estatParams).fetchDocument()
}

export default async function TablePopulation({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${TITLE}`

  const document = await fetchEstatData(prefCode)

  return <CardsReactTimeTable title={title} document={document} />
}
