import { Suspense } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import CircularProgressViews from 'components/progress/CircularProgressViews'

import CardsAdsResponsive from 'cards/CardsAdsResponsive'
import CardsHighchartsPrefectureRankingChart from 'cards/CardsHighchartsPrefectureRankingChart'
import CardsReactPrefectureRankingTable from 'cards/CardsReactPrefectureRankingTable'

import RankingChartProductShipmentAmountPerManufacturingEmployees from 'sections/miningindustry/products/prefecture-rank/RankingChartProductShipmentAmountPerManufacturingEmployees'
import RankingProductShipmentAmount from 'sections/miningindustry/products/prefecture-rank/RankingProductShipmentAmount'
import RankingTableProductShipmentAmountPerManufacturingEmployees from 'sections/miningindustry/products/prefecture-rank/RankingTableProductShipmentAmountPerManufacturingEmployees'
import ScatterChartProductShipmentAmountManufacturingEmployees from 'sections/miningindustry/products/prefecture-rank/ScatterChartProductShipmentAmountManufacturingEmployees'
import ScatterChartProductShipmentAmountManufacturingEstablishments from 'sections/miningindustry/products/prefecture-rank/ScatterChartProductShipmentAmountManufacturingEstablishments'
import ScatterChartProductShipmentAmountTotalPopulation from 'sections/miningindustry/products/prefecture-rank/ScatterChartProductShipmentAmountTotalPopulation'
import handleProps, { RouterProps } from 'utils/props'
import Error500 from 'views/maintenance/500'

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
            {/* row 1 */}
            <Grid item xs={12} md={6}>
              <RankingProductShipmentAmount>
                {(props) => (
                  <CardsHighchartsPrefectureRankingChart {...props} />
                )}
              </RankingProductShipmentAmount>
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingProductShipmentAmount>
                {(props) => <CardsReactPrefectureRankingTable {...props} />}
              </RankingProductShipmentAmount>
            </Grid>
            {/* row 2 */}
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardsAdsResponsive />
            </Grid>
            {/* row 3 */}
            <Grid item xs={12} md={6} lg={4}>
              <ScatterChartProductShipmentAmountManufacturingEstablishments />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ScatterChartProductShipmentAmountManufacturingEmployees />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ScatterChartProductShipmentAmountTotalPopulation />
            </Grid>
            {/* row 4 */}
            <Grid item xs={12} md={6}>
              <RankingChartProductShipmentAmountPerManufacturingEmployees />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingTableProductShipmentAmountPerManufacturingEmployees />
            </Grid>
          </Grid>
        </Box>
      </Suspense>
    )
  } catch (error) {
    console.error('エラーが発生しました:', error)
    return <Error500 />
  }
}
