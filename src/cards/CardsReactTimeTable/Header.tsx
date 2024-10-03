import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface Props {
  title: string
  csvExportComponent: React.ReactNode
}

const Header = ({ title, csvExportComponent }: Props) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ p: 2, pb: 0 }}
  >
    <Typography variant="h5" color="text.primary">
      {title}
    </Typography>
    {csvExportComponent}
  </Stack>
)

export default Header
