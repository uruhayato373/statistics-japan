import RankingMaximumTemperature from 'sections/landweather/weather/prefecture-rank/RankingMaximumTemperature'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
