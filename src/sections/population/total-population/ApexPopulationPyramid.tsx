import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import ApexPyramidChart from 'components/apexcharts/ApexPyramidChart'
import MainCard from 'components/MainCard'

import formatApexcharts from 'utils/apexcharts'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'

const categories = [
  'A120101',
  'A120102',
  'A120201',
  'A120202',
  'A120301',
  'A120302',
  'A120401',
  'A120402',
  'A120501',
  'A120502',
  'A120601',
  'A120602',
  'A120701',
  'A120702',
  'A120801',
  'A120802',
  'A120901',
  'A120902',
  'A121001',
  'A121002',
  'A121101',
  'A121102',
  'A121201',
  'A121202',
  'A121301',
  'A121302',
  'A121401',
  'A121402',
  'A121501',
  'A121502',
  'A121601',
  'A121602',
]

const params = (routerProps: RouterProps) => {
  switch (routerProps.kindId) {
    case 'japan':
      return {
        statsDataId: '0000010101',
        cdCat01: categories,
        cdArea: '00000',
      }
    case 'prefecture':
      return {
        statsDataId: '0000010101',
        cdCat01: categories,
        cdArea: routerProps.prefCode,
      }
  }
}

interface Props {
  routerProps: RouterProps
}

export default async function ApexPopulationPyramid({ routerProps }: Props) {
  const document = await handleEstatAPI(params(routerProps)).fetchDocument()
  const contents = formatApexcharts(document).PyramidChart('2022')

  return (
    <MainCard content={false} title={'人口ピラミッド'}>
      <Stack>
        <Box sx={{ pt: 1, pr: 2 }}>
          <ApexPyramidChart contents={contents} />
        </Box>
      </Stack>
    </MainCard>
  )
}
