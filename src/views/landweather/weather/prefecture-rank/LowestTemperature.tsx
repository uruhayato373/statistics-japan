import RankingLowestTemperature from 'sections/landweather/weather/prefecture-rank/RankingLowestTemperature'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
