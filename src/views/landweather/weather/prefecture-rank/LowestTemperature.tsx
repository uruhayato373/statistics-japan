import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingLowestTemperature from 'sections/landweather/weather/prefecture-rank/RankingLowestTemperature'
import { ViewsPropsType } from 'types/views'

export default async function LowestTemperature({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 最低気温 */}
      <PrefectureRankingCards
        Section={RankingLowestTemperature}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
