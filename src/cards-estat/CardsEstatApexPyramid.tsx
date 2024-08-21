'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import ApexPyramidChart from 'components/apexcharts/ApexPyramidChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import TimeSelector from 'components/TimeSelector'

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
}: Props) {
  const [selectedTimeCode, setSelectedTimeCode] = useState<string>('')

  const sortedTimes = useMemo(
    () =>
      [...times].sort((a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)),
    [times]
  )

  useEffect(() => {
    setSelectedTimeCode(sortedTimes[0]?.timeCode || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { document } = useEstatAPI({
    ...estatParams,
    cdTime: selectedTimeCode ? `${selectedTimeCode}100000` : '',
  })

  const contents = useMemo(
    () =>
      selectedTimeCode
        ? formatApexcharts(document).PyramidChart(selectedTimeCode)
        : null,
    [document, selectedTimeCode]
  )

  if (!selectedTimeCode) {
    return <CircularProgressCards />
  }

  return (
    <MainCard content={false} title={title}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TimeSelector
            times={sortedTimes}
            selectedTimeCode={selectedTimeCode}
            setSelectedTimeCode={setSelectedTimeCode}
          />
        </Stack>
        <Stack>
          <Box sx={{ pt: 1, pr: 2 }}>
            <Suspense fallback={<CircularProgressCards />}>
              {contents && <ApexPyramidChart contents={contents} />}
            </Suspense>
          </Box>
        </Stack>
      </Box>
    </MainCard>
  )
}
