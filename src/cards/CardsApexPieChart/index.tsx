'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApexPieChart from 'components/apexcharts/ApexPieChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import formatApexcharts from 'utils/apexcharts'
import { DocumentType } from 'utils/document'

import SelectTime from './SelectTime'

interface Props {
  title: string
  document: DocumentType
  options?: ApexOptions
  height?: string
}

export default function CardsApexPieChart({
  title,
  document,
  options,
  height,
}: Props) {
  const { times } = document
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

  if (!selectedTimeCode) return <CircularProgressCards />

  const filteredDocument = {
    ...document,
    values: document.values.filter((f) => f.timeCode === selectedTimeCode),
  }

  const formatOptions = formatApexcharts(filteredDocument).PieChart()

  const customOptions = { ...options, ...formatOptions }

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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pl: 2 }}
      >
        <SelectTimeComponent />
      </Stack>
      <Box sx={{ p: 2, ...boxStyle }}>
        <ApexPieChart options={customOptions} />
      </Box>
    </MainCard>
  )
}
