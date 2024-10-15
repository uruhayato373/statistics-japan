import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function Footer() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: '24px 16px 0px', mt: 'auto' }}
    >
      <Typography variant="caption">
        &copy; 2024 stats47.jp All rights reserved
      </Typography>
      <Stack
        spacing={1.5}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link href="/about-site" variant="caption" color="text.primary">
          About site
        </Link>
        <Link href="/about-site" variant="caption" color="text.primary">
          Privacy
        </Link>
        <Link
          href="https://github.com/uruhayato373"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          GitHub
        </Link>
      </Stack>
    </Stack>
  )
}
