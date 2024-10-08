import RankingNonLaborForcePopulation from 'sections/laborwage/laborforce/prefecture-rank/RankingNonLaborForcePopulation'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function NonLaborForcePopulation({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 非労働力人口 */}
      <PrefectureRankingCards
        Section={RankingNonLaborForcePopulation}
        routerProps={routerProps}
      />
    </MainView>
  )
}
