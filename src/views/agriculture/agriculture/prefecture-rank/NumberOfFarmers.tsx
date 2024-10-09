import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfFarmers from 'sections/agriculture/agriculture/prefecture-rank/RankingNumberOfFarmers'
import { ViewsPropsType } from 'types/views'

export default async function NumberOfFarmers({ routerProps }: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 農家数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfFarmers}
        routerProps={routerProps}
      />
    </MainView>
  )
}
