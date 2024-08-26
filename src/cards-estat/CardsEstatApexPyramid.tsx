'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'

import ApexPyramidChart from 'components/apexcharts/ApexPyramidChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import useEstatAPI from 'hooks/useEstatAPI'
import formatApexcharts from 'utils/apexcharts'
import { TimeType } from 'utils/document'
import { EstatParamsType } from 'utils/e-stat'

interface Props {
  title: string
  estatParams: EstatParamsType
  times: TimeType[]
  options?: ApexOptions
}

export default function CardsEstatApexPyramid({
  title,
  estatParams,
  times,
  options,
}: Props) {
  const [selectedTimeCode, setSelectedTimeCode] = useState<string>('')

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

  const { document } = useEstatAPI({
    ...estatParams,
    cdTime: selectedTimeCode ? `${selectedTimeCode}100000` : '',
  })

  const formatOptions = useMemo(
    () =>
      selectedTimeCode
        ? formatApexcharts(document).PyramidChart(selectedTimeCode)
        : null,
    [document, selectedTimeCode]
  )
  const customOptions = { ...formatOptions, ...options }

  if (!selectedTimeCode) {
    return <CircularProgressCards />
  }

  return (
    <MainCard content={false} title={title}>
      <Box sx={{ p: 2 }}>
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
        <Stack>
          <Box sx={{ pt: 1, pr: 2 }}>
            <Suspense fallback={<CircularProgressCards />}>
              {customOptions && <ApexPyramidChart options={customOptions} />}
            </Suspense>
          </Box>
        </Stack>
      </Box>
    </MainCard>
  )
}
