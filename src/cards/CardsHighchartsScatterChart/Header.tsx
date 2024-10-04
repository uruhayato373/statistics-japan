import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const Header = ({ title }: { title?: string }) => (
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
)

export default Header
