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
        statsDataId: '0000010101',
        cdCat01: 'A1101',
        cdArea: '00000',
      }
    case 'prefecture':
      return {
        statsDataId: '0000010101',
        cdCat01: 'A1101',
        cdArea: routerProps.prefCode,
      }
    case 'city':
      return {
        statsDataId: '0000020201',
        cdCat01: 'A1101',
        cdArea: routerProps.cityCode,
      }
  }
}

interface Props {
  routerProps: RouterProps
}

export default async function ApexTotalPopulation({ routerProps }: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()

  const contents = formatApexcharts(document).timeChart()

  return (
    <MainCard content={false} title={'総人口の推移'}>
      <Box sx={{ pt: 1, pr: 2 }}>
        <ApexLineChart contents={contents} />
      </Box>
    </MainCard>
  )
}
