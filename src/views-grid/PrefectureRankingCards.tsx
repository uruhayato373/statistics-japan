import CardsHighchartsPrefectureRankingChart from 'cards/CardsHighchartsPrefectureRankingChart'
import CardsReactPrefectureRankingTable from 'cards/CardsReactPrefectureRankingTable'

import { SectionsPropsType } from 'types/sections'
import { RouterProps } from 'utils/props'

import GridItem from './GridItem'

interface RankingChartProps {
  Section: React.ComponentType<SectionsPropsType>
  routerProps: RouterProps
}

const PrefectureRankingCards: React.FC<RankingChartProps> = ({
  Section,
  routerProps,
}) => (
  <>
    <GridItem xs={12} md={6}>
      <Section routerProps={routerProps}>
        {(props) => <CardsHighchartsPrefectureRankingChart {...props} />}
      </Section>
    </GridItem>
    <GridItem xs={12} md={6}>
      <Section routerProps={routerProps}>
        {(props) => <CardsReactPrefectureRankingTable {...props} />}
      </Section>
    </GridItem>
  </>
)

export default PrefectureRankingCards
