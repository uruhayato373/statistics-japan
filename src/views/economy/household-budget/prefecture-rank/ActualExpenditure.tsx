import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingActualExpenditure from 'sections/economy/household-budget/prefecture-rank/RankingActualExpenditure'
import { ViewsPropsType } from 'types/views'

export default async function ActualExpenditure({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 実支出 */}
      <PrefectureRankingCards
        Section={RankingActualExpenditure}
        routerProps={routerProps}
      />
    </MainView>
  )
}
