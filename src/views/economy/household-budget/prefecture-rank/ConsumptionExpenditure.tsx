import RankingConsumptionExpenditure from 'sections/economy/household-budget/prefecture-rank/RankingConsumptionExpenditure'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function ConsumptionExpenditure({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 消費支出 */}
      <PrefectureRankingCards
        Section={RankingConsumptionExpenditure}
        routerProps={routerProps}
      />
    </MainView>
  )
}
