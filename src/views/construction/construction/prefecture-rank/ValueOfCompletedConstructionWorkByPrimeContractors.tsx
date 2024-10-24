import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingValueOfCompletedConstructionWorkByPrimeContractors from 'sections/construction/construction/prefecture-rank/RankingValueOfCompletedConstructionWorkByPrimeContractors'

import { ViewsPropsType } from 'types/views'

export default async function ValueOfCompletedConstructionWorkByPrimeContractors({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 元請完成工事高 */}
      <PrefectureRankingCards
        Section={RankingValueOfCompletedConstructionWorkByPrimeContractors}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
