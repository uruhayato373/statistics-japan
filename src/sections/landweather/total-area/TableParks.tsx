import CardsTimeTable from 'cards/CardsTimeTable'

import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

const TITLE = '公園面積のデータ'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: ['B2101', 'B2104', 'B2105'],
}

interface Props {
  prefecture: PrefectureType
}

async function fetchEstatData(prefCode: string) {
  const estatParams = { ...ESTAT_PARAMS, cdArea: prefCode }
  return await handleEstatAPI(estatParams).fetchDocument()
}

export default async function TableParks({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${TITLE}`

  const document = await fetchEstatData(prefCode)

  return <CardsTimeTable title={title} document={document} />
}
