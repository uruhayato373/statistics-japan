/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApexColumnChart from 'components/apexcharts/ApexColumnChart'
import MainCard from 'components/MainCard'

import formatApexcharts from 'utils/apexcharts'

type Props = {
  title: string
  document: DocumentType
}

export default function CardsApexColumnLIne({ title, document }: Props) {
  const [slot, setSlot] = useState('column')
  const apexchart = formatApexcharts(document).TimeChart()

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}>
            <Button
              size="small"
              onClick={() => setSlot('line')}
              color={slot === 'line' ? 'primary' : 'secondary'}
              variant={slot === 'line' ? 'outlined' : 'text'}
            >
              Month
            </Button>
            <Button
              size="small"
              onClick={() => setSlot('column')}
              color={slot === 'column' ? 'primary' : 'secondary'}
              variant={slot === 'column' ? 'outlined' : 'text'}
            >
              Week
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <ApexColumnChart contents={apexchart} />
        </Box>
      </MainCard>
    </>
  )
}
