import PrefectureRankingCards from 'components/views/PrefectureRankingCards'
import ScatterChartsSection from 'components/views/ScatterISection'
import ViewsWrapper from 'components/views/ViewsWrapper'

import RankingNumberOfMarriages from 'sections/population/marriage/prefecture-rank/RankingNumberOfMarriages'
import RankingNumberOfMarriagesPerTotalPopulation from 'sections/population/marriage/prefecture-rank/RankingNumberOfMarriagesPerTotalPopulation'
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
      <ScatterChartsSection charts={SCATTER_CHARTS} routerProps={routerProps} />
      {/* 総人口1万人当たり */}
      <PrefectureRankingCards
        title="総人口1万人当たり"
        Section={RankingNumberOfMarriagesPerTotalPopulation}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
