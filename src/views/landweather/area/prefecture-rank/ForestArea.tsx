import RankingForestArea from 'sections/landweather/area/prefecture-rank/RankingForestArea'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function ForestArea({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 森林面積 */}
      <PrefectureRankingCards
        Section={RankingForestArea}
        routerProps={routerProps}
      />
    </MainView>
  )
}
