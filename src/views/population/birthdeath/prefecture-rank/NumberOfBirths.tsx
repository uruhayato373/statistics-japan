import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'
import ScatterChartsSection from 'components/views/ScatterISection'

import RankingNumberOfBirths from 'sections/population/birthdeath/prefecture-rank/RankingNumberOfBirths'
import RankingNumberOfBirthsPerTotalPopulation from 'sections/population/birthdeath/prefecture-rank/RankingNumberOfBirthsPerTotalPopulation'
import ScatterNumberOfBirthsTotalPopulation from 'sections/population/birthdeath/scatter/ScatterNumberOfBirthsTotalPopulation'

import { ViewsPropsType } from 'types/views'

const SCATTER_CHARTS = [ScatterNumberOfBirthsTotalPopulation]

export default async function NumberOfBirths({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 出生数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfBirths}
        routerProps={routerProps}
      />
      {/* 相関関係 */}
      <ScatterChartsSection charts={SCATTER_CHARTS} routerProps={routerProps} />
      {/* 総人口1万人当たり */}
      <PrefectureRankingCards
        title="総人口1万人当たり"
        Section={RankingNumberOfBirthsPerTotalPopulation}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
