import Box from '@mui/material/Box'

import ApexLineChart from 'components/apexcharts/ApexLineChart'
import MainCard from 'components/MainCard'

import formatApexcharts from 'utils/apexcharts'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'

const params = (routerProps: RouterProps) => {
  switch (routerProps.kindId) {
    case 'japan':
      return {
        statsDataId: '0000010102',
        cdCat01: ['B4101', 'B4102', 'B4103'],
        cdArea: '00000',
      }
    case 'prefecture':
      return {
        statsDataId: '0000010102',
        cdCat01: ['B4101', 'B4102', 'B4103'],
        cdArea: routerProps.prefCode,
      }
  }
}

interface Props {
  routerProps: RouterProps
}

export default async function Templatures({ routerProps }: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()

  const contents = formatApexcharts(document).AxisTimeChart()

  return (
    <MainCard content={false} title={'気温の推移'}>
      <Box sx={{ pt: 1, pr: 2 }}>
        <ApexLineChart customOptions={contents} />
      </Box>
    </MainCard>
  )
}
