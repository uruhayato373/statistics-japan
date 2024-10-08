import RankingActualIncome from 'sections/economy/household-budget/prefecture-rank/RankingActualIncome'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function ActualIncome({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 実収入 */}
      <PrefectureRankingCards
        Section={RankingActualIncome}
        routerProps={routerProps}
      />
    </MainView>
  )
}
