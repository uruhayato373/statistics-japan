import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingMaximumTemperature from 'sections/landweather/weather/prefecture-rank/RankingMaximumTemperature'
import { ViewsPropsType } from 'types/views'

export default async function MaximumTemperature({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 最高気温 */}
      <PrefectureRankingCards
        Section={RankingMaximumTemperature}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
