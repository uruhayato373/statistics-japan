import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingPrefecturalIncomePerPopulation from 'sections/economy/gross-production/prefecture-rank/RankingPrefecturalIncomePerPopulation'
import { ViewsPropsType } from 'types/views'

export default async function PrefecturalIncomePerPopulation({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 1人当たり県民所得 */}
      <PrefectureRankingCards
        Section={RankingPrefecturalIncomePerPopulation}
        routerProps={routerProps}
      />
    </MainView>
  )
}
