import CardsApexLine from 'cards/CardsApexLine'

import formatApexcharts from 'utils/apexcharts'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'

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

interface Props {
  routerProps: RouterProps
}

const customOptions = {
  yaxis: [
    {
      title: {
        text: 'Website Blog',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Social Media',
      },
    },
  ],
}

export default async function Precipitation({ routerProps }: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()

  const contents = formatApexcharts(document).timeChart()

  contents.series[1].type = 'column'

  return (
    <CardsApexLine
      title={'降水量の推移'}
      contents={contents}
      customOptions={customOptions}
    />
  )
}
