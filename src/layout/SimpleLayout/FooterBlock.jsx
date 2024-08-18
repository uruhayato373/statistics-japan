'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import PropTypes from 'prop-types'

import { ThemeMode } from 'config'
import useConfig from 'hooks/useConfig'

export default function FooterBlock() {
  const { mode } = useConfig()

  return (
    <>
      <Divider sx={{ borderColor: 'grey.700' }} />
      <Box
        sx={{
          py: 1.5,
          bgcolor: mode === ThemeMode.DARK ? 'grey.50' : 'grey.800',
        }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="secondary">
                © statistics-japan.com
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

FooterBlock.propTypes = { isFull: PropTypes.bool }
