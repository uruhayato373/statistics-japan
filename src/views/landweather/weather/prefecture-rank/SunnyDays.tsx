import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingSunnyDays from 'sections/landweather/weather/prefecture-rank/RankingSunnyDays'

import { ViewsPropsType } from 'types/views'

export default async function SunnyDays({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 日 */}
      <PrefectureRankingCards
        Section={RankingSunnyDays}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
