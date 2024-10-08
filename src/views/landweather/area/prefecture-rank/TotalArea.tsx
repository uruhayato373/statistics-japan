import RankingTotalArea from 'sections/landweather/area/prefecture-rank/RankingTotalArea'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function TotalArea({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 総面積 */}
      <PrefectureRankingCards
        Section={RankingTotalArea}
        routerProps={routerProps}
      />
    </MainView>
  )
}
