import { ApexOptions } from 'apexcharts'

import CardsApexPieChart from 'cards/CardsApexPieChart'

import { saveDocument } from 'app/actions/saveDocument'
import { saveValues } from 'app/actions/saveValues'
import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '県内総生産の内訳'
const CARD_ID = 'PieGrossPrefecturalProduct'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: [
    'C112201',
    'C112202',
    'C112203',
    'C112204',
    'C112205',
    'C112206',
    'C112207',
    'C112208',
    'C112209',
    'C112210',
    'C112211',
    'C1122121',
    'C1122122',
    'C112213',
    'C112214',
    'C112215',
    'C112216',
    'C112217',
    'C112218',
  ],
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
export default async function PieGrossPrefecturalProduct({
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
