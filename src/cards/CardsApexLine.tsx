import Box from '@mui/material/Box'

import ApexLineChart from 'components/apexcharts/ApexLineChart'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

interface Props {
  title: string

  customOptions?: ApexOptions
}

export default async function CardsApexLine({ title, customOptions }: Props) {
  return (
    <MainCard content={false} title={title}>
      <Box sx={{ pt: 1, pr: 2 }}>
        <ApexLineChart customOptions={customOptions} />
      </Box>
    </MainCard>
  )
}
