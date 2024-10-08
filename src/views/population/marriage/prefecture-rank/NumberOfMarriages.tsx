import RankingNumberOfMarriages from 'sections/population/marriage/prefecture-rank/RankingNumberOfMarriages'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NumberOfMarriages({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 婚姻件数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfMarriages}
        routerProps={routerProps}
      />
    </MainView>
  )
}
