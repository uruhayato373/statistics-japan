import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingAverageTemperature from 'sections/landweather/weather/prefecture-rank/RankingAverageTemperature'
import { ViewsPropsType } from 'types/views'

export default async function AverageTemperature({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 平均気温 */}
      <PrefectureRankingCards
        Section={RankingAverageTemperature}
        routerProps={routerProps}
      />
    </MainView>
  )
}
