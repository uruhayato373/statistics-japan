import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingTotalNumberOfHouses from 'sections/construction/housing/prefecture-rank/RankingTotalNumberOfHouses'

import { ViewsPropsType } from 'types/views'

export default async function TotalNumberOfHouses({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 総住宅数 */}
      <PrefectureRankingCards
        Section={RankingTotalNumberOfHouses}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
