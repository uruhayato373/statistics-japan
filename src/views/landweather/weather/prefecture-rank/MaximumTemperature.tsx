import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingMaximumTemperature from 'sections/landweather/weather/prefecture-rank/RankingMaximumTemperature'
import { ViewsPropsType } from 'types/views'

export default async function MaximumTemperature({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 最高気温 */}
      <PrefectureRankingCards
        Section={RankingMaximumTemperature}
        routerProps={routerProps}
      />
    </MainView>
  )
}
