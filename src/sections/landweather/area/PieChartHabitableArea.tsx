import { ApexOptions } from 'apexcharts'

import CardsApexPieChart from 'cards/CardsApexPieChart'

import { saveDocument } from 'actions/saveDocument'
import { saveValues } from 'actions/saveValues'
import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '可住地面積の割合'
const CARD_ID = 'PieChartHabitableArea'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: ['B1103', 'B1105'],
}

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
  routerProps: RouterProps
  prefecture: PrefectureType
}

// valuesの取得と整形
async function fetchValues(prefCode: string) {
  const values = await handleEstatAPI().fetchValues({
    ...ESTAT_PARAMS,
    cdArea: prefCode,
  })

  const formatValues = values.map((value) => {
    return {
      ...value,
      unit: 'ha',
    }
  })
  return formatValues
}
export default async function PieChartHabitableArea({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${CARD_TITLE}`

  const saveProps = { ...routerProps, cardId: CARD_ID }

  const values = await fetchValues(prefCode)
  if (process.env.NODE_ENV === 'development') {
    await saveValues(saveProps, values)
  }

  const document = handleDocument().formatDocument(values, 'pie')
  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

  return (
    <CardsApexPieChart
      title={title}
      document={document}
      options={APEX_OPTIONS}
    />
  )
}
