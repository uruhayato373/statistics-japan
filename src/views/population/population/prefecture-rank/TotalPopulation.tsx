import RankingTotalPopulation from 'sections/population/population/prefecture-rank/RankingTotalPopulation'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function TotalPopulation({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 総人口 */}
      <PrefectureRankingCards
        Section={RankingTotalPopulation}
        routerProps={routerProps}
      />
    </MainView>
  )
}
