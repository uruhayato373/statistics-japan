import RankingPrecipitation from 'sections/landweather/weather/prefecture-rank/RankingPrecipitation'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function Precipitation({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 降水量 */}
      <PrefectureRankingCards
        Section={RankingPrecipitation}
        routerProps={routerProps}
      />
    </MainView>
  )
}
