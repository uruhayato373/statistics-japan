'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApexPyramidChart from 'components/apexcharts/ApexPyramidChart'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import { CardsPropsType } from 'types/cards'
import formatApexcharts from 'utils/apexcharts'

export default function CardsApexPyramidChart({
  title,
  document,
  options,
  height,
}: CardsPropsType<ApexOptions>) {
  const [selectedTimeCode, setSelectedTimeCode] = useState<string>('')

  const { times } = document
  const sortedTimes = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )

  useEffect(() => {
    setSelectedTimeCode(sortedTimes[0].timeCode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    const newTime = event.target.value
    setSelectedTimeCode(newTime)
  }

  const formatOptions =
    formatApexcharts(document).PyramidChart(selectedTimeCode)
  const customOptions = { ...formatOptions, ...options }

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
        <ApexPyramidChart options={customOptions} />
      </Box>
    </MainCard>
  )
}
