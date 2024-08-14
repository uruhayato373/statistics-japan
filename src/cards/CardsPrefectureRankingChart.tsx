import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CircularProgressCards from 'components/CircularProgressCards'
// import D3MapChart from 'components/d3js/D3MapChart'
import HighchartsMapChart from 'components/highcharts/HighchartsMapChart'
import MainCard from 'components/MainCard'
import SelectTime from 'components/SelectTime'

import formatD3charts from 'utils/d3charts'
import { DocumentType, TimeType } from 'utils/e-stat'

interface Props {
  title?: string
  document: DocumentType
  times: TimeType[]
}

export default function CardsPrefectureRankingChart({
  title,
  document,
  times,
}: Props) {
  const mapChartContents = formatD3charts(document).mapChart()
  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2, pb: 0, height: '600px' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" color="text.primary">
            {title}
          </Typography>
          <SelectTime times={times} />
          {/* <ToggleMapBar
            chartType={chartType}
            handleChartChange={handleChartChange}
          /> */}
        </Stack>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Suspense fallback={<CircularProgressCards />}>
          <HighchartsMapChart contents={mapChartContents} />
        </Suspense>
        <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="text.secondary">
            地図は『歴史的行政区域データセットβ版』（CODH作成）を利用
          </Typography>
        </Box>
      </Box>
    </MainCard>
  )
}
