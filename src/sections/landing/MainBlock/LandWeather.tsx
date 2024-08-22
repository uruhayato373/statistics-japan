import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AnimateButton from 'components/@extended/AnimateButton'
import MainCard from 'components/MainCard'

const FIELD_ID = 'landweather'
const MENU_ID = 'area'
const PAGE_ID = 'total-area'
const AREA_CODE = '28000'

export default function LandWeather() {
  return (
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
              <Link
                href={`/${FIELD_ID}/${MENU_ID}/prefecture/${AREA_CODE}`}
                passHref
              >
                <Button variant="outlined" sx={{ my: 2 }}>
                  都道府県の統計
                </Button>
              </Link>
            </AnimateButton>
            <AnimateButton>
              <Link
                href={`/${FIELD_ID}/${MENU_ID}/prefecture-rank/${PAGE_ID}/`}
                passHref
              >
                <Button variant="contained" sx={{ my: 2 }}>
                  都道府県ランキング
                </Button>
              </Link>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  )
}
