import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingConsumerPriceIndex from 'sections/economy/consumer-price-index/prefecture-rank/RankingConsumerPriceIndex'
import { ViewsPropsType } from 'types/views'

export default async function ConsumerPriceIndex({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 消費者物価指数 */}
      <PrefectureRankingCards
        Section={RankingConsumerPriceIndex}
        routerProps={routerProps}
      />
    </MainView>
  )
}
