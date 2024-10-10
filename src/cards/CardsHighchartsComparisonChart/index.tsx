'use client'
import { useMemo } from 'react'

import { Stack, Box, Divider, Typography } from '@mui/material'

import MainCard from 'components/MainCard'

import { Options } from 'highcharts'

import { CardsPropsType } from 'types/cards'
import formatHighcharts from 'utils/highcharts'

import HighchartsComparisonChart from './HighchartsComparisonChart'
import SelectPrefCodes from './SelectPrefCodes'

export default function CardsHighchartsComparisonChart({
  title,
  document,
  options,
  height,
}: CardsPropsType<Options>) {
  const [selectedPrefCodes, SelectPrefCodesComponent] = SelectPrefCodes()

  const filteredDocument = useMemo(() => {
    return {
      ...document,
      areas: document.areas.filter((area) =>
        selectedPrefCodes.includes(area.areaCode)
      ),
      values: document.values.filter((value) =>
        selectedPrefCodes.includes(value.areaCode)
      ),
    }
  }, [document, selectedPrefCodes])

  const formatOptions = formatHighcharts(filteredDocument).AxisTimeChart('area')

  const customOptions = {
    ...formatOptions,
    ...options,
  }

  const boxStyle = height ? { height } : {}

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
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
        <SelectPrefCodesComponent />
      </Stack>
      <Box sx={{ p: 2, ...boxStyle }}>
        <HighchartsComparisonChart options={customOptions} />
      </Box>
    </MainCard>
  )
}
