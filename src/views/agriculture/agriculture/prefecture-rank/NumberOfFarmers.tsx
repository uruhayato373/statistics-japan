import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingNumberOfFarmers from 'sections/agriculture/agriculture/prefecture-rank/RankingNumberOfFarmers'

import { ViewsPropsType } from 'types/views'

export default async function NumberOfFarmers({ routerProps }: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 農家数 */}
      <PrefectureRankingCards
        Section={RankingNumberOfFarmers}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
