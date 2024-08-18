import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Laborwage from './Laborwage'
import LandWeather from './LandWeather'
import Population from './Population'

export default function DemoBlock() {
  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}
      >
        <Grid item xs={12}>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            sx={{ mb: 4, textAlign: 'center' }}
          >
            <Grid item sm={10} md={6}>
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="primary">
                    statistics-japan
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    統計で見る都道府県のすがた
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    都道府県に関する様々な統計をビジュアライズ化します。あなたの街の統計を見てみましょう。
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <LandWeather />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Population />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Laborwage />
        </Grid>
      </Grid>
    </Container>
  )
}
