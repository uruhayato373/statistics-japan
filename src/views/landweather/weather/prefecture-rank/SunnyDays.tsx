import RankingSunnyDays from 'sections/landweather/weather/prefecture-rank/RankingSunnyDays'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function SunnyDays({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 日 */}
      <PrefectureRankingCards
        Section={RankingSunnyDays}
        routerProps={routerProps}
      />
    </MainView>
  )
}
