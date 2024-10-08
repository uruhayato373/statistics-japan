import RankingLaborForcePopulation from 'sections/laborwage/laborforce/prefecture-rank/RankingLaborForcePopulation'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

export default async function LaborForcePopulation({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 労働力人口 */}
      <PrefectureRankingCards
        Section={RankingLaborForcePopulation}
        routerProps={routerProps}
      />
    </MainView>
  )
}
