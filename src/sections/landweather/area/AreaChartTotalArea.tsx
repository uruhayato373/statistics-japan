import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import { ApexOptions } from 'apexcharts'

import CardsApexAreaChart from 'cards/CardsApexAreaChart'

import { saveDocument } from 'actions/saveDocument'
import { saveValues } from 'actions/saveValues'
import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '総面積の推移'
const CARD_ID = 'AreaChartTotalArea'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: ['B1101', 'B1103'],
}

const APEX_OPTIONS: ApexOptions = {
  yaxis: [
    {
      seriesName: '総面積',
      opposite: false,
      show: true,
      labels: {
        show: true,
      },
      tooltip: {
        enabled: false,
      },
    },
    {
      seriesName: '可住地面積',
      opposite: true,
      show: true,
      labels: {
        show: true,
      },
      tooltip: {
        enabled: false,
      },
    },
  ],
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
      categoryName: value.categoryName.replace(
        '（北方地域及び竹島を除く）',
        ''
      ),
      unit: 'ha',
    }
  })
  return formatValues
}

export default async function AreaChartTotalArea({
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

  const document = handleDocument().formatDocument(values)
  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexAreaChart
        title={title}
        document={document}
        options={APEX_OPTIONS}
      />
    </Suspense>
  )
}
