import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsAdsResponsive from 'cards/CardsAdsResponsive'

import RankingNumberOfManufacturingEstablishments from 'sections/miningindustry/products/prefecture-rank/RankingNumberOfManufacturingEstablishments'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'
import GridItem from 'views-grid/GridItem'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

interface Props {
  routerProps: RouterProps
}

export default async function PrefectureRankView({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* 製造業事業所数 */}
            <PrefectureRankingCards
              RankingComponent={RankingNumberOfManufacturingEstablishments}
              routerProps={routerProps}
            />
            {/* Adsense */}
            {[0, 1].map((index) => (
              <GridItem key={`ads-${index}`} xs={12} md={6}>
                <CardsAdsResponsive />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
