import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingConsumerPriceIndex from 'sections/economy/consumer-price-index/prefecture-rank/RankingConsumerPriceIndex'
import { ViewsPropsType } from 'types/views'

export default async function ConsumerPriceIndex({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 消費者物価指数 */}
      <PrefectureRankingCards
        Section={RankingConsumerPriceIndex}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
