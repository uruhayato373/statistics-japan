import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingValueOfCompletedConstructionWorkBySubcontractors from 'sections/construction/construction/prefecture-rank/RankingValueOfCompletedConstructionWorkBySubcontractors'

import { ViewsPropsType } from 'types/views'

export default async function ValueOfCompletedConstructionWorkBySubcontractors({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 下請完成工事高 */}
      <PrefectureRankingCards
        Section={RankingValueOfCompletedConstructionWorkBySubcontractors}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
