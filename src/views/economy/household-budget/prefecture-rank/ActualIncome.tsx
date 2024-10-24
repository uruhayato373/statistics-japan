import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingActualIncome from 'sections/economy/household-budget/prefecture-rank/RankingActualIncome'

import { ViewsPropsType } from 'types/views'

export default async function ActualIncome({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 実収入 */}
      <PrefectureRankingCards
        Section={RankingActualIncome}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
