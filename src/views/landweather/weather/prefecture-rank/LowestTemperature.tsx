import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingLowestTemperature from 'sections/landweather/weather/prefecture-rank/RankingLowestTemperature'
import { ViewsPropsType } from 'types/views'

export default async function LowestTemperature({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 最低気温 */}
      <PrefectureRankingCards
        Section={RankingLowestTemperature}
        routerProps={routerProps}
      />
    </MainView>
  )
}
