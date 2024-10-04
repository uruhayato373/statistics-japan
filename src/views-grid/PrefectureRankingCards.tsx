import CardsHighchartsPrefectureRankingChart from 'cards/CardsHighchartsPrefectureRankingChart'
import CardsReactPrefectureRankingTable from 'cards/CardsReactPrefectureRankingTable'

import { RankingDocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'

import GridItem from './GridItem'
interface RankingComponentProps {
  routerProps?: RouterProps
  children: (props: {
    title: string
    document: RankingDocumentType
  }) => React.ReactNode
}

type RankingComponentType = React.ComponentType<RankingComponentProps>

interface RankingChartProps {
  RankingComponent: RankingComponentType
  routerProps: RouterProps
}

const PrefectureRankingCards: React.FC<RankingChartProps> = ({
  RankingComponent,
  routerProps,
}) => (
  <>
    <GridItem xs={12} md={6}>
      <RankingComponent routerProps={routerProps}>
        {(props) => <CardsHighchartsPrefectureRankingChart {...props} />}
      </RankingComponent>
    </GridItem>
    <GridItem xs={12} md={6}>
      <RankingComponent routerProps={routerProps}>
        {(props) => <CardsReactPrefectureRankingTable {...props} />}
      </RankingComponent>
    </GridItem>
  </>
)

export default PrefectureRankingCards
