import React, { Suspense } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { CardsPropsType } from 'types/cards'
import formatDashboard from 'utils/dashboard'

import DifferenceText from './DifferenceText'
import ValueDisplay from './ValueDisplay'

export default function CardsDashboard({
  title,
  document,
  actionButton,
}: CardsPropsType) {
  const formatValues = formatDashboard(document)
  const [latest, previous] = formatValues

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard contentSX={{ p: 2.25 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pb: 1 }}
        >
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          {actionButton && (
            <Stack direction="row" spacing={1}>
              {actionButton}
            </Stack>
          )}
        </Stack>
        <ValueDisplay
          value={latest.value}
          unit={latest.unit}
          rate={latest.rate}
        />
        <Typography variant="caption" color="text.secondary">
          {latest.timeName}
        </Typography>
        <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="text.secondary">
            {previous.timeName}から
            <DifferenceText difference={latest.difference} unit={latest.unit} />
          </Typography>
        </Box>
      </MainCard>
    </Suspense>
  )
}
