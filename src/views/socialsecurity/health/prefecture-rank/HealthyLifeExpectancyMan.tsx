import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingHealthyLifeExpectancyMan from 'sections/socialsecurity/health/prefecture-rank/RankingHealthyLifeExpectancyMan'

import { ViewsPropsType } from 'types/views'

export default async function HealthyLifeExpectancyMan({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 健康寿命（男性） */}
      <PrefectureRankingCards
        Section={RankingHealthyLifeExpectancyMan}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
