import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingConsumptionExpenditure from 'sections/economy/household-budget/prefecture-rank/RankingConsumptionExpenditure'
import { ViewsPropsType } from 'types/views'

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
