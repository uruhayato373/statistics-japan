import NextLink from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import AnimateButton from 'components/@extended/AnimateButton'
import MainCard from 'components/MainCard'

import Animation from './Animation'

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
          <Animation
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
          >
            <MainCard contentSX={{ p: 3 }}>
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <Typography variant="h3" sx={{ fontWeight: 600, mt: 2 }}>
                    国土・気象
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color="secondary">
                    都道府県の総面積や可住地面積・林野面積、降水日数や降水量、最高気温や最低気温などの統計値を見ることができます。
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'inline-block' }}>
                    <AnimateButton>
                      <Button
                        variant="outlined"
                        sx={{ my: 2 }}
                        component={Link}
                        href="https://www.figma.com/file/NJGFukWMHgU0LVhS4qLP4A/Mantis?node-id=106412%3A169520"
                        target="_blank"
                      >
                        都道府県の統計
                      </Button>
                    </AnimateButton>
                    <AnimateButton>
                      <NextLink
                        href="/components-overview/buttons"
                        passHref
                        legacyBehavior
                      >
                        <Button
                          variant="contained"
                          sx={{ my: 2 }}
                          component={Link}
                          target="_blank"
                        >
                          都道府県ランキング
                        </Button>
                      </NextLink>
                    </AnimateButton>
                  </Box>
                </Grid>
              </Grid>
            </MainCard>
          </Animation>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Animation
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
          >
            <MainCard contentSX={{ p: 3, bgcolor: 'primary.lighter' }}>
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <Typography variant="h3" sx={{ fontWeight: 600, mt: 2 }}>
                    Components
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color="secondary">
                    Check the all components of Mantis in single place with
                    search feature for easing your development while working.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'inline-block' }}>
                    <AnimateButton>
                      <NextLink
                        href="/components-overview/buttons"
                        passHref
                        legacyBehavior
                      >
                        <Button
                          variant="contained"
                          sx={{ my: 2 }}
                          component={Link}
                          target="_blank"
                        >
                          View All Components
                        </Button>
                      </NextLink>
                    </AnimateButton>
                  </Box>
                </Grid>
              </Grid>
            </MainCard>
          </Animation>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Animation
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
          >
            <MainCard contentSX={{ p: 3 }}>
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <Typography variant="h3" sx={{ fontWeight: 600, mt: 2 }}>
                    Documentation
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color="secondary">
                    From Quick start to detailed installation with super easy
                    navigation for find out solution of your queries with
                    complex documentation guide.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'inline-block' }}>
                    <AnimateButton>
                      <Button
                        variant="outlined"
                        sx={{ my: 2 }}
                        component={Link}
                        href="https://codedthemes.gitbook.io/mantis/"
                        target="_blank"
                      >
                        Explore Documentation
                      </Button>
                    </AnimateButton>
                  </Box>
                </Grid>
              </Grid>
            </MainCard>
          </Animation>
        </Grid>
      </Grid>
    </Container>
  )
}
