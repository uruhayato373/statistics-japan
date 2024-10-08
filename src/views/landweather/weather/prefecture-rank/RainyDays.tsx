import RankingRainyDays from 'sections/landweather/weather/prefecture-rank/RankingRainyDays'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function RainyDays({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 降雨日数 */}
      <PrefectureRankingCards
        Section={RankingRainyDays}
        routerProps={routerProps}
      />
    </MainView>
  )
}
