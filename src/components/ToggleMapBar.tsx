import { useTheme } from '@mui/material/styles'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

type Props = {
  chartType: string
  handleChartChange: (
    event: React.MouseEvent<HTMLElement>,
    newChartType: string | null
  ) => void
}

function ToggleMapBar({ chartType, handleChartChange }: Props) {
  const theme = useTheme()

  return (
    <>
      <ToggleButtonGroup
        value={chartType}
        color="primary"
        exclusive
        onChange={handleChartChange}
        aria-label="chart type"
        sx={{
          '& .MuiToggleButton-root': {
            fontSize: '0.75rem',
            padding: '4px 8px',
            '&:not(.Mui-selected)': {
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
            },
            '&:first-of-type': {
              borderLeftColor: 'transparent',
            },
            '&:last-of-type': {
              borderRightColor: 'transparent',
            },
            '&.Mui-selected': {
              borderColor: 'inherit',
              borderLeftColor: `${theme.palette.primary.main} !important`,
              '&:hover': {
                bgcolor: 'primary.lighter',
              },
            },
            '&:hover': {
              bgcolor: 'transparent',
              borderColor: 'primary.main',
              borderLeftColor: `${theme.palette.primary.main} !important`,
              zIndex: 2,
            },
          },
        }}
      >
        <ToggleButton value="map" aria-label="map">
          Map
        </ToggleButton>
        <ToggleButton value="bar" aria-label="bar">
          Bar
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}

export default ToggleMapBar
