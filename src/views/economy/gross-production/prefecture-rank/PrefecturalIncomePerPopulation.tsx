import RankingPrefecturalIncomePerPopulation from 'sections/economy/gross-production/prefecture-rank/RankingPrefecturalIncomePerPopulation'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
