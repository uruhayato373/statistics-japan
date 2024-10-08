import RankingOldPopulation from 'sections/population/population/prefecture-rank/RankingOldPopulation'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function OldPopulation({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 老年人口 */}
      <PrefectureRankingCards
        Section={RankingOldPopulation}
        routerProps={routerProps}
      />
    </MainView>
  )
}
