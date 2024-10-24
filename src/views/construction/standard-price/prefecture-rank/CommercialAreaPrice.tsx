import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingCommercialAreaPrice from 'sections/construction/standard-price/prefecture-rank/RankingCommercialAreaPrice'

import { ViewsPropsType } from 'types/views'

export default async function CommercialAreaPrice({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 商業地価格 */}
      <PrefectureRankingCards
        Section={RankingCommercialAreaPrice}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
