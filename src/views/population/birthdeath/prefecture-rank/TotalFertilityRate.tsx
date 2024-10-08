import RankingTotalFertilityRate from 'sections/population/birthdeath/prefecture-rank/RankingTotalFertilityRate'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function TotalFertilityRate({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 死亡数 */}
      <PrefectureRankingCards
        Section={RankingTotalFertilityRate}
        routerProps={routerProps}
      />
    </MainView>
  )
}
