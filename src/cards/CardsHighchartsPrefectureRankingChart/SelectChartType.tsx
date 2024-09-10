'use client'

import { useState } from 'react'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

type ChartType = 'map' | 'bar'

export default function SelectChartType(): [ChartType, () => JSX.Element] {
  const [chartType, setChartType] = useState<ChartType>('map')

  const handleChartTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChartType(event.target.value as ChartType)
  }

  return [
    chartType,
    () => (
      <FormControl component="fieldset" size="small">
        <RadioGroup
          aria-label="chart-type"
          value={chartType}
          onChange={handleChartTypeChange}
          name="chart-type-group"
          row
        >
          <FormControlLabel
            value="map"
            control={<Radio />}
            label={<Typography variant="body2">Map</Typography>}
          />
          <FormControlLabel
            value="bar"
            control={<Radio />}
            label={<Typography variant="body2">Bar</Typography>}
          />
        </RadioGroup>
      </FormControl>
    ),
  ]
}
