import Box from '@mui/material/Box'

import ApexAreaChart from 'components/apexcharts/ApexAreaChart'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import formatApexcharts from 'utils/apexcharts'
import { DocumentType } from 'utils/document'

interface Props {
  title: string
  document: DocumentType
  customOptions?: ApexOptions
}

export default async function CardsApexAreaChart({
  title,
  document,
  customOptions,
}: Props) {
  const formatOptions = formatApexcharts(document).AxisTimeChart()

  const options: ApexOptions = {
    ...formatOptions,
    ...customOptions,
  }

  return (
    <MainCard content={false} title={title}>
      <Box sx={{ pt: 1, pr: 2 }}>
        <ApexAreaChart propOptions={options} />
      </Box>
    </MainCard>
  )
}
