import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const CorrelationCoefficient = ({ value }: { value: number }) => (
  <Stack
    direction="row"
    justifyContent="flex-end"
    alignItems="center"
    sx={{ pr: 2 }}
  >
    <Typography variant="body2" color="text.secondary">
      相関係数: {value.toFixed(4)}
    </Typography>
  </Stack>
)

export default CorrelationCoefficient
