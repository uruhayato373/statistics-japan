import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingOldPopulation from 'sections/population/population/prefecture-rank/RankingOldPopulation'
import { ViewsPropsType } from 'types/views'

export default async function OldPopulation({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 老年人口 */}
      <PrefectureRankingCards
        Section={RankingOldPopulation}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
