import RankingPrefecturalIncome from 'sections/economy/gross-production/prefecture-rank/RankingPrefecturalIncome'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function PrefecturalIncome({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 県民所得 */}
      <PrefectureRankingCards
        Section={RankingPrefecturalIncome}
        routerProps={routerProps}
      />
    </MainView>
  )
}
