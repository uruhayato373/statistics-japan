import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingLaborForcePopulation from 'sections/laborwage/laborforce/prefecture-rank/RankingLaborForcePopulation'
import { ViewsPropsType } from 'types/views'

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
