import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'
import ScatterChartsSection from 'components/views/ScatterISection'

import RankingNumberOfDeaths from 'sections/population/birthdeath/prefecture-rank/RankingNumberOfDeaths'
import RankingNumberOfDeathsPerTotalPopulation from 'sections/population/birthdeath/prefecture-rank/RankingNumberOfDeathsPerTotalPopulation'
import ScatterNumberOfDeathsTotalPopulation from 'sections/population/birthdeath/scatter/ScatterNumberOfDeathsTotalPopulation'

import { ViewsPropsType } from 'types/views'

const SCATTER_CHARTS = [ScatterNumberOfDeathsTotalPopulation]

export default async function NumberOfDeaths({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 死亡数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfDeaths}
        routerProps={routerProps}
      />
      {/* 相関関係 */}
      <ScatterChartsSection charts={SCATTER_CHARTS} routerProps={routerProps} />
      {/* 総人口1万人当たり */}
      <PrefectureRankingCards
        title="総人口1万人当たり"
        Section={RankingNumberOfDeathsPerTotalPopulation}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
