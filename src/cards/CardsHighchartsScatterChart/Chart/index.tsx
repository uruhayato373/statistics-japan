import Box from '@mui/material/Box'

import { DocumentType } from 'utils/document'

import HighchartsScatterChart from './HighchartsScatterChart'

export type ScatterSeriesType = Highcharts.SeriesScatterOptions & {
  data: Array<[number, number]>
}

const Chart = ({
  categories,
  series,
  height,
}: {
  categories: DocumentType['categories']
  series: ScatterSeriesType[]
  height?: string
}) => (
  <Box
    sx={{
      p: 2,
      pt: 0,
      ...(height ? { height } : {}),
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Box sx={{ flex: 1, minHeight: 0 }}>
      <HighchartsScatterChart categories={categories} series={series} />
    </Box>
  </Box>
)

export default Chart
