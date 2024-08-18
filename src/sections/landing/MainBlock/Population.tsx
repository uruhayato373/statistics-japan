import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AnimateButton from 'components/@extended/AnimateButton'
import MainCard from 'components/MainCard'

const FIELD_ID = 'population'
const MENU_ID = 'total-population'
const PAGE_ID = 'total-population'
const AREA_CODE = '28000'

export default function Population() {
  return (
    <MainCard contentSX={{ p: 3 }}>
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ fontWeight: 600, mt: 2 }}>
            人口・世帯
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="secondary">
            都道府県の総人口や世帯数、人口密度、年齢別人口構成、世帯数別人口構成などの統計値を見ることができます。
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
                href={`/${FIELD_ID}/${MENU_ID}/prefecture-rank/${PAGE_ID}/?areaCode=${AREA_CODE}`}
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
