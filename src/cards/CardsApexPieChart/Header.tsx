import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const Header = ({ title, linkButton }) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ p: 2, pb: 0 }}
  >
    <Typography variant="h5" color="text.primary">
      {title}
    </Typography>
    {linkButton && (
      <Stack direction="row" spacing={1}>
        {linkButton}
      </Stack>
    )}
  </Stack>
)

export default Header
