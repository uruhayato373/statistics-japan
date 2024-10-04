import { ReactElement } from 'react'

import Stack from '@mui/material/Stack'

interface ControlsProps {
  SelectTimeComponent: () => ReactElement
  SelectChartTypeComponent: () => ReactElement
}

const Control = ({
  SelectTimeComponent,
  SelectChartTypeComponent,
}: ControlsProps) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ pl: 2 }}
  >
    <SelectTimeComponent />
    <SelectChartTypeComponent />
  </Stack>
)

export default Control
