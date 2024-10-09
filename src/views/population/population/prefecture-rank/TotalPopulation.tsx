import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingTotalPopulation from 'sections/population/population/prefecture-rank/RankingTotalPopulation'
import { ViewsPropsType } from 'types/views'

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
