import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsAdsResponsive from 'cards/CardsAdsResponsive'

import RankingProductShipmentAmount from 'sections/miningindustry/products/prefecture-rank/RankingProductShipmentAmount'
import RankingProductShipmentAmountPerManufacturingEmployees from 'sections/miningindustry/products/prefecture-rank/RankingProductShipmentAmountPerManufacturingEmployees'
import ScatterProductShipmentAmountManufacturingEmployees from 'sections/miningindustry/scatter/ScatterProductShipmentAmountManufacturingEmployees'
import ScatterProductShipmentAmountManufacturingEstablishments from 'sections/miningindustry/scatter/ScatterProductShipmentAmountManufacturingEstablishments'
import ScatterProductShipmentAmountTotalPopulation from 'sections/miningindustry/scatter/ScatterProductShipmentAmountTotalPopulation'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'
import GridItem from 'views-grid/GridItem'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

interface Props {
  routerProps: RouterProps
}

const ScatterCharts = [
  ScatterProductShipmentAmountManufacturingEstablishments,
  ScatterProductShipmentAmountManufacturingEmployees,
  ScatterProductShipmentAmountTotalPopulation,
]

export default async function PrefectureRankView({ routerProps }: Props) {
  try {
    const breadcrumbsProps = await handleProps(routerProps).breadcrumbsProps()

    return (
      <Suspense fallback={<CircularProgressViews />}>
        <Breadcrumbs custom icon breadcrumbsProps={breadcrumbsProps} />
        <Box sx={{ mt: 2.5 }}>
          <Grid container rowSpacing={4.5} columnSpacing={3}>
            {/* 製造品出荷額 */}
            <PrefectureRankingCards
              RankingComponent={RankingProductShipmentAmount}
              routerProps={routerProps}
            />
            {/* Adsense */}
            {[0, 1].map((index) => (
              <GridItem key={`ads-${index}`} xs={12} md={6}>
                <CardsAdsResponsive />
              </GridItem>
            ))}
            {/* 相関関係 */}
            {ScatterCharts.map((Chart, index) => (
              <GridItem key={`scatter-${index}`} xs={12} md={6} lg={4}>
                <Chart />
              </GridItem>
            ))}
            {/* 製造品出荷額（従業員1人当たり */}
            <PrefectureRankingCards
              RankingComponent={
                RankingProductShipmentAmountPerManufacturingEmployees
              }
              routerProps={routerProps}
            />
          </Grid>
        </Box>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
