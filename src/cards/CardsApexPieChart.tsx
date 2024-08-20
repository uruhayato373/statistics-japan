'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApexPieChart from 'components/apexcharts/ApexPieChart'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import formatApexcharts from 'utils/apexcharts'
import { DocumentType } from 'utils/document'

interface Props {
  title: string
  document: DocumentType
  options?: ApexOptions
}

export default function CardsApexPieChart({ title, document, options }: Props) {
  const [selectedTimeCode, setSelectedTimeCode] = useState<string>('')

  const { times, categories } = document
  const sortedTimes = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )
  const units = categories.map((d) => d.categoryUnit)

  useEffect(() => {
    setSelectedTimeCode(sortedTimes[0].timeCode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    const newTime = event.target.value
    setSelectedTimeCode(newTime)
  }

  const formatOptions = formatApexcharts(document).PieChart(selectedTimeCode)
  const customOptions = { ...formatOptions, ...options }

  return (
    <MainCard content={false}>
      <Box sx={{ p: 2, pb: 0, height: '400px' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" color="text.primary">
            {title}
          </Typography>
          <FormControl sx={{ minWidth: 80 }} size="small">
            <Select
              labelId="select-time-label"
              id="select-time"
              value={selectedTimeCode}
              displayEmpty
              onChange={handleTimeChange}
            >
              {sortedTimes.map((d) => (
                <MenuItem key={d.timeCode} value={d.timeCode}>
                  {d.timeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <ApexPieChart options={customOptions} units={units} />
      </Box>
    </MainCard>
  )
}
