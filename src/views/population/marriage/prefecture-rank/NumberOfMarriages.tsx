import { Typography } from '@mui/material'

import GridItem from 'components/views/GridItem'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'
import ViewsWrapper from 'components/views/ViewsWrapper'

import CardsHighchartsScatterChart from 'cards/CardsHighchartsScatterChart'

import RankingNumberOfMarriages from 'sections/population/marriage/prefecture-rank/RankingNumberOfMarriages'
import ScatterNumberOfMarriagesNumberOfBirth from 'sections/population/marriage/scatter/ScatterNumberOfMarriagesNumberOfBirth'
import ScatterNumberOfMarriagesNumberOfDivorces from 'sections/population/marriage/scatter/ScatterNumberOfMarriagesNumberOfDivorces'
import ScatterNumberOfMarriagesTotalPopulation from 'sections/population/marriage/scatter/ScatterNumberOfMarriagesTotalPopulation'
import { ViewsPropsType } from 'types/views'

const SCATTER_CHARTS = [
  ScatterNumberOfMarriagesTotalPopulation,
  ScatterNumberOfMarriagesNumberOfDivorces,
  ScatterNumberOfMarriagesNumberOfBirth,
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
      {/* 相関関係 */}
      <GridItem xs={12}>
        <Typography variant="h4">相関関係</Typography>
      </GridItem>
      {SCATTER_CHARTS.map((ScatterChart, index) => (
        <GridItem key={`scatter-${index}`} xs={12} md={6} lg={4}>
          <ScatterChart routerProps={routerProps}>
            {(props) => <CardsHighchartsScatterChart {...props} />}
          </ScatterChart>
        </GridItem>
      ))}
      {/* 製造品出荷額（従業員1人当たり */}
      <GridItem xs={12}>
        <Typography variant="h4">総人口1万人当たり</Typography>
      </GridItem>
    </ViewsWrapper>
  )
}
