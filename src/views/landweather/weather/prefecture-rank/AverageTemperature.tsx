import RankingAverageTemperature from 'sections/landweather/weather/prefecture-rank/RankingAverageTemperature'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
