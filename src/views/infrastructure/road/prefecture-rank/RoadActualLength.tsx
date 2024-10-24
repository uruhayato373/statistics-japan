import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingRoadActualLength from 'sections/infrastructure/road/prefecture-rank/RankingRoadActualLength'

import { ViewsPropsType } from 'types/views'

export default async function RoadActualLength({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 道路実延長 */}
      <PrefectureRankingCards
        Section={RankingRoadActualLength}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
