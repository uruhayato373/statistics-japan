import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/system/Box'

export default async function CircularProgressViews() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress size={100} thickness={4} />
    </Box>
  )
}
