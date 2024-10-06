import RankingAgricultureEmploymentPopulation from 'sections/agriculture/agriculture/prefecture-rank/RankingAgricultureEmploymentPopulation'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function AgricultureEmploymentPopulation({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 農業就業人口 */}
      <PrefectureRankingCards
        Section={RankingAgricultureEmploymentPopulation}
        routerProps={routerProps}
      />
    </MainView>
  )
}
