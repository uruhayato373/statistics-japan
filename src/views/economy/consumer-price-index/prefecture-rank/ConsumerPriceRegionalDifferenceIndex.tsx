import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingConsumerPriceRegionalDifferenceIndex from 'sections/economy/consumer-price-index/prefecture-rank/RankingConsumerPriceRegionalDifferenceIndex'

import { ViewsPropsType } from 'types/views'

export default async function ConsumerPriceRegionalDifferenceIndex({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 消費者物価地域差指数 */}
      <PrefectureRankingCards
        Section={RankingConsumerPriceRegionalDifferenceIndex}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
