import { ApexOptions } from 'apexcharts'

import CardsApexPieChart from 'cards/CardsApexPieChart'

import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

const TITLE = '可住地面積の割合'

// 可住地面積のtimesと森林面積のtimesの要素数が異なるため、
// 並列で取得する必要がある
const ESTAT_PARAMS = [
  {
    statsDataId: '0000010102',
    cdCat01: 'B1103',
  },
  {
    statsDataId: '0000010102',
    cdCat01: 'B1105',
  },
]

// apexChartsのオプション
const APEX_OPTIONS: ApexOptions = {
  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 0.8,
    },
  },
}

interface Props {
  prefecture: PrefectureType
}

async function fetchEstatData(prefCode: string) {
  const estatParams = ESTAT_PARAMS.map((params) => ({
    ...params,
    cdArea: prefCode,
  }))
  return await handleEstatAPI(estatParams).fetchDocument()
}

export default async function PieChartHabitableArea({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${TITLE}`

  const document = await fetchEstatData(prefCode)

  return (
    <CardsApexPieChart
      title={title}
      document={document}
      options={APEX_OPTIONS}
    />
  )
}
