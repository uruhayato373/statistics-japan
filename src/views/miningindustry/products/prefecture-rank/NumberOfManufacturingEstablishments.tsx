import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import CircularProgressViews from 'components/progress/CircularProgressViews'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'
import ViewsHeader from 'components/views/ViewsHeader'

import RankingNumberOfManufacturingEstablishments from 'sections/miningindustry/products/prefecture-rank/RankingNumberOfManufacturingEstablishments'
import { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <Suspense fallback={<CircularProgressViews />}>
      <ViewsHeader routerProps={routerProps} />
      <Box sx={{ mt: 2.5 }}>
        <Grid container rowSpacing={4.5} columnSpacing={3}>
          {/* 製造業事業所数 */}
          <PrefectureRankingCards
            Section={RankingNumberOfManufacturingEstablishments}
            routerProps={routerProps}
          />
          {/* Adsense */}
          {/* {[0, 1].map((index) => (
            <GridItem key={`ads-${index}`} xs={12} md={6}>
              <CardsAdsResponsive />
            </GridItem>
          ))} */}
        </Grid>
      </Box>
    </Suspense>
  )
}
