import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingConsumerPriceIndexChangeRate from 'sections/economy/consumer-price-index/prefecture-rank/RankingConsumerPriceIndexChangeRate'
import { ViewsPropsType } from 'types/views'

export default async function ConsumerPriceIndexChangeRate({
  routerProps,
}: ViewsPropsType) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 消費者物価指数変化率 */}
      <PrefectureRankingCards
        Section={RankingConsumerPriceIndexChangeRate}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
