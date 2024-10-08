import RankingDenselyPopulatedArea from 'sections/landweather/area/prefecture-rank/RankingDenselyPopulatedArea'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function DenselyPopulatedArea({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 人口集中地区面積 */}
      <PrefectureRankingCards
        Section={RankingDenselyPopulatedArea}
        routerProps={routerProps}
      />
    </MainView>
  )
}
