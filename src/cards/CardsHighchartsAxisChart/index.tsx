import { Stack, Box, Divider, Typography } from '@mui/material'

import MainCard from 'components/MainCard'

import { Options } from 'highcharts'

import { DocumentType } from 'utils/document'
import formatHighcharts from 'utils/highcharts'

import HighchartsAxisChart from './HighchartsAxisChart'

interface Props {
  title?: string
  document: DocumentType
  options?: Options
  height?: string
}

export default function CardsHighchartsAxisChart({
  title,
  document,
  options,
  height,
}: Props) {
  const formatOptions = formatHighcharts(document).AxisTimeChart()

  const customOptions = {
    ...options,
    ...formatOptions,
  }

  const boxStyle = height ? { height } : {}

  return (
    <MainCard content={false}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, pb: 0 }}
      >
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
      </Stack>
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Box sx={{ p: 2, ...boxStyle }}>
        <HighchartsAxisChart options={customOptions} />
      </Box>
    </MainCard>
  )
}
