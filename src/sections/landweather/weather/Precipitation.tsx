import CardsApexLine from 'cards/CardsApexLine'

import formatApexcharts from 'utils/apexcharts'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

/**
 * e-Stat APIのパラメータを生成する
 * @returns e-Stat APIのパラメータ
 */
const params = (routerProps: RouterProps) => {
  switch (routerProps.kindId) {
    case 'japan':
      return {
        statsDataId: '0000010102',
        cdCat01: ['B4109', 'B4106'],
        cdArea: '00000',
      }
    case 'prefecture':
      return {
        statsDataId: '0000010102',
        cdCat01: ['B4109', 'B4106'],
        cdArea: routerProps.prefCode,
      }
  }
}

/**
 * カスタムチャートオプション
 */
const customOptions = {
  yaxis: [
    {
      title: {
        text: '降水日数',
      },
    },
    {
      opposite: true,
      title: {
        text: '降水量',
      },
    },
  ],
  colors: ['#66cdaa', '#1e90ff'],
}

export default async function Precipitation({ routerProps }: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()

  const contents = formatApexcharts(document).timeChart()

  // 降水日数のグラフを棒グラフに変更
  contents.series[1].type = 'column'

  return (
    <CardsApexLine
      title={'降水量の推移'}
      contents={contents}
      customOptions={customOptions}
    />
  )
}
