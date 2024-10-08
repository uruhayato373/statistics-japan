import RankingConsumerPriceIndex from 'sections/economy/consumer-price-index/prefecture-rank/RankingConsumerPriceIndex'
import { ViewsPropsType } from 'types/views'
import MainView from 'views-grid/MainView'
import PrefectureRankingCards from 'views-grid/PrefectureRankingCards'

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
