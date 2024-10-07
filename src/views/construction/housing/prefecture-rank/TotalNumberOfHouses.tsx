import RankingTotalNumberOfHouses from 'sections/construction/housing/prefecture-rank/RankingTotalNumberOfHouses'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function TotalNumberOfHouses({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 総住宅数 */}
      <PrefectureRankingCards
        Section={RankingTotalNumberOfHouses}
        routerProps={routerProps}
      />
    </MainView>
  )
}
