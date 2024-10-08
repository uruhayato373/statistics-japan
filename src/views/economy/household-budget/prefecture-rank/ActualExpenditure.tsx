import RankingActualExpenditure from 'sections/economy/household-budget/prefecture-rank/RankingActualExpenditure'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
