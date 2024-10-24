import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingHabitableArea from 'sections/landweather/area/prefecture-rank/RankingHabitableArea'

import { ViewsPropsType } from 'types/views'

export default async function HabitableArea({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 可住地面積 */}
      <PrefectureRankingCards
        Section={RankingHabitableArea}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
