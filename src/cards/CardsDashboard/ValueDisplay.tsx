import React from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import formatNumberJapanese from 'utils/value/modules/formatNumberJapanese'

import RateChip from './RateChip'

interface ValueDisplayProps {
  value: number
  unit: string
  rate: number | null | undefined
}

const ValueDisplay: React.FC<ValueDisplayProps> = ({ value, unit, rate }) => (
  <Grid container alignItems="center">
    <Grid item>
      <Typography variant="h5" color="inherit">
        {formatNumberJapanese(value)} {unit}
      </Typography>
    </Grid>
    {rate !== null && rate !== undefined && rate !== 0 && (
      <Grid item>
        <RateChip rate={rate} />
      </Grid>
    )}
  </Grid>
)

export default ValueDisplay
