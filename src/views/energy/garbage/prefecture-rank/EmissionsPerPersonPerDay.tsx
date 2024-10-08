import RankingEmissionsPerPersonPerDay from 'sections/energy/garbage/prefecture-rank/RankingEmissionsPerPersonPerDay'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function EmissionsPerPersonPerDay({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 一人一日当たり排出量 */}
      <PrefectureRankingCards
        Section={RankingEmissionsPerPersonPerDay}
        routerProps={routerProps}
      />
    </MainView>
  )
}
