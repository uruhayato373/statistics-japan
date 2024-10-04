import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import LinkToPrefecture from 'components/button/LinkToPrefecture'

const Header = ({ title }: { title: string }) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ p: 2, pb: 0 }}
  >
    <Typography variant="h5" color="text.primary">
      {title}
    </Typography>
    <LinkToPrefecture />
  </Stack>
)

export default Header
