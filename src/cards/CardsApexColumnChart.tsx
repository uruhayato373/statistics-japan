import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApexColumnChart from 'components/apexcharts/ApexColumnChart'
import MainCard from 'components/MainCard'

import DownloadOutlined from '@ant-design/icons/DownloadOutlined'
import MenuOutlined from '@ant-design/icons/MenuOutlined'
import { ApexOptions } from 'apexcharts'

import formatApexcharts from 'utils/apexcharts'
import { DocumentType } from 'utils/document'

interface Props {
  title: string
  document: DocumentType
  options?: ApexOptions
  height?: string
}

export default async function CardsApexColumnChart({
  title,
  document,
  options,
  height,
}: Props) {
  const formatOptions = formatApexcharts(document).AxisTimeChart()
  const customOptions = {
    ...options,
    series: formatOptions.series,
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
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            sx={{
              border: '0.5px solid',
              borderColor: 'grey.400',
              '&:hover': { bgcolor: 'transparent' },
            }}
          >
            <DownloadOutlined style={{ color: 'grey.400' }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              border: '0.5px solid',
              borderColor: 'grey.400',
              '&:hover': { bgcolor: 'transparent' },
            }}
          >
            <MenuOutlined />
          </IconButton>
        </Stack>
      </Stack>
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Box sx={{ p: 2, ...boxStyle }}>
        <ApexColumnChart options={customOptions} />
      </Box>
    </MainCard>
  )
}
