'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import HighchartsMapChart from 'components/highcharts/HighchartsMapChart'
import MainCard from 'components/MainCard'
import SelectTime from 'components/select/SelectTime'

import { DocumentType } from 'utils/document'
import formatHighcharts from 'utils/highcharts'

interface Props {
  title?: string
  document: DocumentType
  boxHeight?: string
  chartHeight?: number
}

export default function CardsHighchartsMapChart({
  title,
  document,
  boxHeight = '600px',
}: Props) {
  const { times } = document
  const [selectedTimeCode, SelectComponent] = SelectTime({ times })

  const filteredDocument = {
    ...document,
    values: document.values.filter((f) => f.timeCode === selectedTimeCode),
  }

  const series = formatHighcharts(filteredDocument).mapChart()

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2, pb: 0, height: boxHeight }}>
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1.5 }}
        >
          <SelectComponent />{' '}
        </Stack>
        <HighchartsMapChart series={series} />
        <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="text.secondary">
            地図は『歴史的行政区域データセットβ版』（CODH作成）を利用
          </Typography>
        </Box>
      </Box>
    </MainCard>
  )
}
