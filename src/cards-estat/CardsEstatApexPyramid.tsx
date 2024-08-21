'use client'

import { Suspense, useMemo } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import ApexPyramidChart from 'components/apexcharts/ApexPyramidChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectTime from 'components/select/SelectTime'

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
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

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
        <SelectTimeComponent />
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
