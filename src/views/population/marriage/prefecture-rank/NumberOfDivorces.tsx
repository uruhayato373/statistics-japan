import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'
import ScatterChartsSection from 'components/views/ScatterISection'

import RankingNumberOfDivorces from 'sections/population/marriage/prefecture-rank/RankingNumberOfDivorces'
import RankingNumberOfDivorcesPerTotalPopulation from 'sections/population/marriage/prefecture-rank/RankingNumberOfDivorcesPerTotalPopulation'
import ScatterNumberOfDivorcesTotalPopulation from 'sections/population/marriage/scatter/ScatterNumberOfDivorcesTotalPopulation'

import { ViewsPropsType } from 'types/views'

const SCATTER_CHARTS = [ScatterNumberOfDivorcesTotalPopulation]

export default async function NumberOfDivorces({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 離婚件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfDivorces}
        routerProps={routerProps}
      />
      {/* 相関関係 */}
      <ScatterChartsSection charts={SCATTER_CHARTS} routerProps={routerProps} />
      {/* 総人口1万人当たり */}
      <PrefectureRankingCards
        title="総人口1万人当たり"
        Section={RankingNumberOfDivorcesPerTotalPopulation}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
