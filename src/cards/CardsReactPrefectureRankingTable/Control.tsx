import Stack from '@mui/material/Stack'

const Control = ({
  SelectTimeComponent,
}: {
  SelectTimeComponent: React.ComponentType
}) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ pl: 2 }}
  >
    <SelectTimeComponent />
  </Stack>
)

export default Control
