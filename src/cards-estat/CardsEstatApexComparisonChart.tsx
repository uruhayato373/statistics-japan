'use client'
import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApexLineChart from 'components/apexcharts/ApexLineChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectPrefectures from 'components/select/SelectPrefectures'

import { ApexOptions } from 'apexcharts'

import useEstatAPI from 'hooks/useEstatAPI'
import formatApexcharts from 'utils/apexcharts'
import { EstatParamsType } from 'utils/e-stat'

interface Props {
  title: string
  estatParams: EstatParamsType
  options?: ApexOptions
}

export default function CardsEstatApexComparisonChart({
  title,
  estatParams,
  options,
}: Props) {
  const [selectedPrefCodes, SelectComponent] = SelectPrefectures()

  const { document } = useEstatAPI({
    ...estatParams,
    cdArea: selectedPrefCodes,
  })

  const formatOptions = formatApexcharts(document).AxisTimeChart('area')
  const customOptions = { ...formatOptions, ...options }

  const unit = document.categories[0].categoryUnit
  const units = selectedPrefCodes.map(() => unit)

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box
        sx={{
          p: 2,
          pb: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Suspense fallback={<CircularProgressCards />}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1.5 }}
          >
            <Typography variant="h5" color="text.primary">
              {title}
            </Typography>
            <SelectComponent />
          </Stack>
          <Divider sx={{ mb: 1.5 }} />
          {options && <ApexLineChart options={customOptions} units={units} />}
        </Suspense>
      </Box>
    </MainCard>
  )
}
