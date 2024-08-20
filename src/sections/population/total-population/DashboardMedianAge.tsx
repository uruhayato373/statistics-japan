import CardsDashboardSingle from 'cards/CardsDashboard'

import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

const TITLE = '年齢中位数'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A1231',
}

interface Props {
  prefecture: PrefectureType
}

async function fetchEstatData(prefCode: string) {
  const estatParams = { ...ESTAT_PARAMS, cdArea: prefCode }
  return await handleEstatAPI(estatParams).fetchDocument()
}

export default async function DashboardMedianAge({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${TITLE}`

  const document = await fetchEstatData(prefCode)

  return <CardsDashboardSingle title={title} document={document} digit={1} />
}
