import RankingHabitableArea from 'sections/landweather/area/prefecture-rank/RankingHabitableArea'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function HabitableArea({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 可住地面積 */}
      <PrefectureRankingCards
        Section={RankingHabitableArea}
        routerProps={routerProps}
      />
    </MainView>
  )
}
