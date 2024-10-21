import Typography from '@mui/material/Typography'

import GridItem from 'components/views/GridItem'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'
import ViewsWrapper from 'components/views/ViewsWrapper'

import CardsHighchartsScatterChart from 'cards/CardsHighchartsScatterChart'

import RankingProductShipmentAmount from 'sections/miningindustry/products/prefecture-rank/RankingProductShipmentAmount'
import RankingProductShipmentAmountPerManufacturingEmployees from 'sections/miningindustry/products/prefecture-rank/RankingProductShipmentAmountPerManufacturingEmployees'
import ScatterProductShipmentAmountManufacturingEmployees from 'sections/miningindustry/products/scatter/ScatterProductShipmentAmountManufacturingEmployees'
import ScatterProductShipmentAmountManufacturingEstablishments from 'sections/miningindustry/products/scatter/ScatterProductShipmentAmountManufacturingEstablishments'
import ScatterProductShipmentAmountTotalPopulation from 'sections/miningindustry/products/scatter/ScatterProductShipmentAmountTotalPopulation'
import { RouterProps } from 'utils/props'

interface Props {
  routerProps: RouterProps
}

const ScatterCharts = [
  {
    Section: ScatterProductShipmentAmountManufacturingEstablishments,
    Card: CardsHighchartsScatterChart,
  },
  {
    Section: ScatterProductShipmentAmountManufacturingEmployees,
    Card: CardsHighchartsScatterChart,
  },
  {
    Section: ScatterProductShipmentAmountTotalPopulation,
    Card: CardsHighchartsScatterChart,
  },
]

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 製造品出荷額 */}
      <PrefectureRankingCards
        Section={RankingProductShipmentAmount}
        routerProps={routerProps}
      />
      {/* Adsense */}
      {/* {[0, 1].map((index) => (
              <GridItem key={`ads-${index}`} xs={12} md={6}>
                <CardsAdsResponsive />
              </GridItem>
            ))} */}
      {/* 相関関係 */}
      <GridItem xs={12}>
        <Typography variant="h4">相関係数</Typography>
      </GridItem>
      {ScatterCharts.map(({ Section, Card }, index) => (
        <GridItem key={`scatter-${index}`} xs={12} md={6} lg={4}>
          <Section routerProps={routerProps}>
            {(props) => <Card {...props} />}
          </Section>
        </GridItem>
      ))}
      {/* 製造品出荷額（従業員1人当たり */}
      <GridItem xs={12}>
        <Typography variant="h4">製造業従業者数1人当たり</Typography>
      </GridItem>
      <PrefectureRankingCards
        Section={RankingProductShipmentAmountPerManufacturingEmployees}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
