import { Stack, Typography } from '@mui/material'

interface HeaderProps {
  title: string
  csvButton: React.ReactNode
  linkButton?: React.ReactNode
}

const Header = ({ title, csvButton, linkButton }: HeaderProps) => (
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
