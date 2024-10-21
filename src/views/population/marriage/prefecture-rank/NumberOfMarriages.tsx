/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import ViewsWrapper from 'components/views//ViewsWrapper'
import GridItem from 'components/views/GridItem'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import CardsHighchartsScatterChart from 'cards/CardsHighchartsScatterChart'

import RankingNumberOfMarriages from 'sections/population/marriage/prefecture-rank/RankingNumberOfMarriages'
import ScatterNumberOfMarriagesTotalPopulation from 'sections/population/marriage/scatter/ScatterNumberOfMarriagesTotalPopulation'
import { ViewsPropsType } from 'types/views'

const ScatterCharts = [
  {
    Section: ScatterNumberOfMarriagesTotalPopulation,
    Card: CardsHighchartsScatterChart,
  },
]

export default async function NumberOfMarriages({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 婚姻件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfMarriages}
        routerProps={routerProps}
      />
      {ScatterCharts.map(({ Section, Card }, index) => (
        <GridItem key={`scatter-${index}`} xs={12} md={6} lg={4}>
          <Section routerProps={routerProps}>
            {(props) => <Card {...props} />}
          </Section>
        </GridItem>
      ))}
    </ViewsWrapper>
  )
}
