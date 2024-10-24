import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingRainyDays from 'sections/landweather/weather/prefecture-rank/RankingRainyDays'

import { ViewsPropsType } from 'types/views'

export default async function RainyDays({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 降雨日数 */}
      <PrefectureRankingCards
        Section={RankingRainyDays}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
