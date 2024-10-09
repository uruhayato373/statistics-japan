import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingResidentialAreaPrice from 'sections/construction/standard-price/prefecture-rank/RankingResidentialAreaPrice'
import { ViewsPropsType } from 'types/views'

export default async function ResidentialAreaPrice({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 住宅地価格 */}
      <PrefectureRankingCards
        Section={RankingResidentialAreaPrice}
        routerProps={routerProps}
      />
    </MainView>
  )
}
