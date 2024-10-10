import { Options } from 'highcharts'

import CardsHighchartsPrefectureRankingChart from 'cards/CardsHighchartsPrefectureRankingChart'
import CardsReactPrefectureRankingTable from 'cards/CardsReactPrefectureRankingTable'

import { CardsPropsType } from 'types/cards'

import GridItem from './GridItem'

const PrefectureRankingCards = ({ Section, routerProps }) => (
  <>
    <GridItem xs={12} md={6}>
      <Section routerProps={routerProps}>
        {(props: CardsPropsType<Options>) => (
          <CardsHighchartsPrefectureRankingChart {...props} />
        )}
      </Section>
    </GridItem>
    <GridItem xs={12} md={6}>
      <Section routerProps={routerProps}>
        {(props: CardsPropsType) => (
          <CardsReactPrefectureRankingTable {...props} />
        )}
      </Section>
    </GridItem>
  </>
)

export default PrefectureRankingCards
