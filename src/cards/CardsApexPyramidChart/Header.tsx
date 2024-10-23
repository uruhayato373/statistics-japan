import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { CardsHeaderPropsType } from 'types/cards'

const Header = ({ title, csvButton, linkButton }: CardsHeaderPropsType) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ p: 2, pb: 0 }}
  >
    <Typography variant="h5" color="text.primary">
      {title}
    </Typography>
    <Stack direction="row" spacing={1} alignItems="center">
      {csvButton}
      {linkButton}
    </Stack>
  </Stack>
)

export default Header
