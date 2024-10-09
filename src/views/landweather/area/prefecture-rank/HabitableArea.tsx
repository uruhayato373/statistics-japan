import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingHabitableArea from 'sections/landweather/area/prefecture-rank/RankingHabitableArea'
import { ViewsPropsType } from 'types/views'

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
